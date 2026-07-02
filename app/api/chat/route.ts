// ===========================================================================
// Server-side Anthropic proxy. The API key NEVER leaves the server.
// The client posts { messages, buildContext } and gets back clean text.
// ===========================================================================

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Keep only the fields relevant to an acquisition route. Anything the planner
// doesn't need (fantasy text, ratings, tier, softcap notes, playstyle prose) is
// dropped to reduce input tokens.
const ROUTE_FIELDS = [
  "name",
  "archetype",
  "startingClass",
  "startingClassWhy",
  "targetLevel",
  "stats",
  "levelingOrder",
  "milestones",
  "weapons",
  "ashesOfWar",
  "spells",
  "talismans",
  "dlcNotes",
  "scadutreePriority",
] as const;

function trimBuildContext(build: unknown): Record<string, unknown> {
  if (!build || typeof build !== "object") return {};
  const src = build as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const key of ROUTE_FIELDS) {
    if (src[key] !== undefined) out[key] = src[key];
  }
  return out;
}

const SYSTEM_PROMPT = `You are a master Elden Ring guide and theorycrafter. You are advising on the LATEST patch (Calibration 1.16, the Shadow of the Erdtree era).

Given a specific build's items, stats, and acquisition data, produce a concrete, ORDERED acquisition route assuming the player is starting a fresh character. Be specific about map regions, the sequence of areas and bosses to clear, where to farm runes to reach the target level, and the exact pickup order for every weapon, talisman, spell, and Ash of War in the build.

Rules:
- Answer specifically about THIS build using the provided build context. Do not invent items not in the build.
- BE CONCISE. Aim for ~250 words. No intro, no preamble, no summary paragraph — lead straight into the route.
- Structure it in 2-4 short phases (e.g. Early / Mid / Late-DLC), each a few terse ordered steps. One line per step.
- Prioritize the pickup ORDER of the build's actual items and one good rune-farm spot. Skip general tips.
- For DLC items, add a one-line Scadutree Blessing note only if relevant.
- Use clean Markdown: bold item names, short bullet/numbered lists, minimal prose. Every line must earn its place.
- Do not reproduce copyrighted in-game flavor text; describe locations in your own words.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Server is missing ANTHROPIC_API_KEY. Add it in your Vercel project settings (Environment Variables) and redeploy.",
      },
      { status: 500 }
    );
  }

  let body: { messages?: ChatMessage[]; buildContext?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }

  // Inject the build as context on the first user turn — but only the fields
  // a route planner actually needs (item locations, stats, leveling, DLC).
  // Dropping rating/tier/flavor fields and pretty-print whitespace trims input
  // tokens, which lowers latency and cost with no loss of answer quality.
  const contextBlock = body.buildContext
    ? `Here is the build the player is asking about (JSON). Use it as ground truth:\n\n${JSON.stringify(
        trimBuildContext(body.buildContext)
      )}`
    : "";

  const anthropicMessages = messages.map((m, i) => {
    if (i === 0 && m.role === "user" && contextBlock) {
      return { role: m.role, content: `${contextBlock}\n\n---\n\nPlayer question: ${m.content}` };
    }
    return { role: m.role, content: m.content };
  });

  let upstream: Response;
  try {
    upstream = await fetch(ANTHROPIC_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 800,
        stream: true,
        system: SYSTEM_PROMPT,
        messages: anthropicMessages,
      }),
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to reach the Anthropic API: ${(err as Error).message}` },
      { status: 502 }
    );
  }

  // Errors (bad key, rate limit, etc.) surface before any streaming starts,
  // so the client still receives a clean JSON error it can display.
  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    return NextResponse.json(
      { error: `Anthropic API error (${upstream.status}). ${detail.slice(0, 400)}` },
      { status: 502 }
    );
  }

  // Parse Anthropic's Server-Sent Events and re-emit only the text deltas as a
  // plain UTF-8 text stream. The frontend just reads and appends chunks.
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          // SSE frames are separated by blank lines; process complete lines.
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;

            try {
              const evt = JSON.parse(payload);
              if (
                evt.type === "content_block_delta" &&
                evt.delta?.type === "text_delta" &&
                typeof evt.delta.text === "string"
              ) {
                controller.enqueue(encoder.encode(evt.delta.text));
              } else if (evt.type === "error") {
                const msg = evt.error?.message || "The Forge fell silent mid-answer.";
                controller.enqueue(encoder.encode(`\n\n_[Error: ${msg}]_`));
              }
            } catch {
              // Ignore keep-alive pings and non-JSON frames.
            }
          }
        }
      } catch (err) {
        controller.enqueue(
          encoder.encode(`\n\n_[Stream interrupted: ${(err as Error).message}]_`)
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      "x-accel-buffering": "no",
    },
  });
}
