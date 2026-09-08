"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; text: string };

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi! Ask me about destinations, experiences, homestays, or heritage in Sylhet's CBT pilot.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const question = input.trim();
    if (!question || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const body = await res.json();

      if (!res.ok) {
        setErrorMsg(body.error ?? "Something went wrong.");
      } else {
        setMessages((prev) => [...prev, { role: "assistant", text: body.answer }]);
      }
    } catch {
      setErrorMsg("Couldn't reach the assistant. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 flex h-96 w-80 flex-col rounded-sm border border-forest/15 bg-sand shadow-lg">
          <div className="flex items-center justify-between border-b border-forest/10 px-4 py-3">
            <span className="font-display text-sm text-forest">OpenCBT Assistant</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="text-ink/50 hover:text-forest"
            >
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <p
                  className={`inline-block max-w-[85%] rounded-sm px-3 py-2 text-sm ${
                    m.role === "user" ? "bg-forest text-sand" : "bg-forest/10 text-ink"
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ))}
            {loading && <p className="text-sm text-ink/50">Thinking…</p>}
            {errorMsg && <p className="text-sm text-red-700">{errorMsg}</p>}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-forest/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a homestay, trail, or festival..."
              className="flex-1 border border-forest/20 bg-transparent px-3 py-2 text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-sm bg-forest px-4 py-2 text-sm text-sand disabled:opacity-60"
            >
              Ask
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full bg-forest px-5 py-3 text-sm text-sand shadow-lg hover:opacity-90"
      >
        {open ? "Close" : "Ask OpenCBT"}
      </button>
    </div>
  );
}
