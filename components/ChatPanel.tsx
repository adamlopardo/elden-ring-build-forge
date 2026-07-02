"use client";

import { useRef, useState } from "react";
import type { Build } from "@/lib/builds";
import Markdown from "./Markdown";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "How do I get to this build from the very start?",
  "What's the fastest pickup order for the weapons and talismans?",
  "Where should I farm runes to hit the target level?",
  "What's the early-game path before I can get the main weapon?",
];

export default function ChatPanel({ build }: { build: Build }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError(null);
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    const scrollToBottom = () =>
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, buildContext: build }),
      });

      // Errors come back as JSON; a successful answer streams as plain text.
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `Request failed (${res.status}).`);
      }
      if (!res.body) throw new Error("No response stream from the Forge.");

      // Append an empty assistant message, then fill it as chunks arrive.
      setMessages([...nextMessages, { role: "assistant", content: "" }]);
      setLoading(false);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...nextMessages, { role: "assistant", content: acc }]);
        scrollToBottom();
      }

      if (!acc.trim()) {
        setMessages([
          ...nextMessages,
          { role: "assistant", content: "The Forge fell silent. Try asking again." },
        ]);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  }

  return (
    <div className="forge-card flex flex-col p-5">
      <div className="mb-1 flex items-center gap-2">
        <span className="text-xl text-ember animate-emberPulse" aria-hidden>
          ✦
        </span>
        <h2 className="font-display text-xl font-600 text-ember-light">Ask the Forge</h2>
      </div>
      <p className="mb-4 text-sm text-stone-400">
        The AI route planner knows this exact build. Ask how to acquire it from a fresh start.
      </p>

      <div
        ref={scrollRef}
        className="mb-4 max-h-[28rem] min-h-[8rem] space-y-4 overflow-y-auto pr-1"
      >
        {messages.length === 0 && !loading && (
          <div className="grid gap-2 sm:grid-cols-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-md border border-obsidian-600 bg-obsidian-700/50 px-3 py-2 text-left text-sm text-stone-300 transition-colors hover:border-ember-deep hover:text-ember-light"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                m.role === "user"
                  ? "max-w-[85%] rounded-lg rounded-br-sm border border-ember-deep/50 bg-ember/10 px-4 py-2.5 text-sm text-stone-100"
                  : "max-w-full rounded-lg rounded-bl-sm border border-obsidian-600 bg-obsidian-700/60 px-4 py-3"
              }
            >
              {m.role === "user" ? m.content : <Markdown>{m.content}</Markdown>}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-sm text-ember-deep">
            <span className="flex gap-1">
              <span className="h-2 w-2 animate-emberPulse rounded-full bg-ember" />
              <span className="h-2 w-2 animate-emberPulse rounded-full bg-ember [animation-delay:0.2s]" />
              <span className="h-2 w-2 animate-emberPulse rounded-full bg-ember [animation-delay:0.4s]" />
            </span>
            The Forge is charting your route…
          </div>
        )}

        {error && (
          <div className="rounded-md border border-blood/60 bg-blood/10 px-4 py-3 text-sm text-red-300">
            <strong>The Forge could not answer.</strong> {error}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask how to get this build…"
          className="flex-1 rounded-md border border-obsidian-600 bg-obsidian-800 px-3 py-2 text-sm text-stone-100 placeholder:text-stone-500 focus:border-ember-deep focus:outline-none"
          disabled={loading}
        />
        <button type="submit" className="btn-ember" disabled={loading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
