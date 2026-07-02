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

const SYSTEM_PROMPT = `You are a master Elden Ring guide and theorycrafter. You are advising on the LATEST patch (Calibration 1.16, the Shadow of the Erdtree era).

Given a specific build's items, stats, and acquisition data, produce a concrete, ORDERED acquisition route assuming the player is starting a fresh character. Be specific about map regions, the sequence of areas and bosses to clear, where to farm runes to reach the target level, and the exact pickup order for every weapon, talisman, spell, and Ash of War in the build.

Rules:
- Answer specifically about THIS build using the provided build context. Do not invent items not in the build.
- Structure the route in clear phases (e.g. Early Game, Mid Game, Late Game / DLC) with ordered steps.
- Call out rune-farming spots appropriate to the player's progress.
- For DLC items, note the Scadutree Blessing priority.
- Use clean Markdown: short headers, ordered/unordered lists, bold for item names. Keep it tight and actionable.
- Do not reproduce copyrighted in-game flavor text; describe locations and mechanics in your own words.`;

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

  // Inject the full build object as context on the first user turn.
  const contextBlock = body.buildContext
    ? `Here is the FULL build the player is asking about (JSON). Use it as ground truth:\n\n${JSON.stringify(
        body.buildContext,
        null,
        2
      )}`
    : "";

  const anthropicMessages = messages.map((m, i) => {
    if (i === 0 && m.role === "user" && contextBlock) {
      return { role: m.role, content: `${contextBlock}\n\n---\n\nPlayer question: ${m.content}` };
    }
    return { role: m.role, content: m.content };
  });

  try {
    const res = await fetch(ANTHROPIC_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1500,
        system: SYSTEM_PROMPT,
        messages: anthropicMessages,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json(
        { error: `Anthropic API error (${res.status}). ${detail.slice(0, 400)}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    const text =
      Array.isArray(data?.content)
        ? data.content
            .filter((c: { type: string }) => c.type === "text")
            .map((c: { text: string }) => c.text)
            .join("\n")
        : "";

    return NextResponse.json({ text: text || "The Forge fell silent. Try asking again." });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to reach the Anthropic API: ${(err as Error).message}` },
      { status: 502 }
    );
  }
}
