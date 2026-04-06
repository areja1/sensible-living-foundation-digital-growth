"use client";

import { useState } from "react";

const SAMPLE_NEWSLETTERS = [
  {
    month: "April 2026",
    subject: "Spring into Action: Growing Together This April",
    preview: "This month we launched our spring vertical garden initiative and expanded financial literacy workshops across three Phoenix neighborhoods.",
  },
];

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [expanded, setExpanded] = useState<string | null>(null);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>

      {/* ─── HERO ─── */}
      <div className="pt-28 pb-10 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl px-8 py-14 md:px-14 md:py-16" style={{ background: "#EDF7EF" }}>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
              style={{ background: "#C8E6C9", color: "#1B4332" }}>
              Community Updates
            </span>
            <h1 className="font-serif font-bold leading-tight mb-5 text-gray-900"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}>
              Newsletter Archive
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mb-10">
              Monthly updates from Mekonnen and the Sensible Living Foundation team covering programs, community impact, and resources.
            </p>

            {/* Subscribe form */}
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg">
              {status === "success" ? (
                <p className="text-green-700 font-semibold">You are subscribed. Welcome to the SLF community!</p>
              ) : (
                <>
                  <input type="email" placeholder="Your email address" value={email}
                    onChange={(e) => setEmail(e.target.value)} required
                    className="flex-1 px-5 py-3 rounded-full text-sm outline-none border border-gray-300 focus:border-green-600 transition-all"
                    style={{ background: "white", color: "#1a1a1a" }} />
                  <button type="submit" disabled={status === "loading"}
                    className="px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all hover:opacity-90"
                    style={{ background: "#1B4332", color: "white" }}>
                    {status === "loading" ? "..." : "Subscribe"}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* ─── ARCHIVE LIST ─── */}
      <div className="px-4 md:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-8" style={{ color: "#4B5563" }}>
            Past Newsletters
          </p>

          <div className="flex flex-col gap-4">
            {SAMPLE_NEWSLETTERS.map((newsletter) => (
              <div key={newsletter.month}
                className="rounded-2xl overflow-hidden"
                style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.07)" }}>
                <button
                  onClick={() => setExpanded(expanded === newsletter.month ? null : newsletter.month)}
                  className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-white/5"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#52B788" }}>
                      {newsletter.month}
                    </p>
                    <h3 className="font-serif text-lg font-bold text-white">
                      {newsletter.subject}
                    </h3>
                    <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
                      {newsletter.preview}
                    </p>
                  </div>
                  <span className="text-2xl ml-6 flex-shrink-0" style={{ color: "#52B788" }}>
                    {expanded === newsletter.month ? "−" : "+"}
                  </span>
                </button>

                {expanded === newsletter.month && (
                  <div className="px-6 pb-6">
                    <hr className="mb-6" style={{ borderColor: "rgba(255,255,255,0.08)" }} />
                    <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
                      Full newsletter content will appear here once the newsletter archive database is connected.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {SAMPLE_NEWSLETTERS.length === 0 && (
            <div className="text-center py-20 rounded-2xl"
              style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-3xl mb-4">📬</p>
              <p className="font-serif text-xl font-bold text-white mb-2">No newsletters yet.</p>
              <p className="text-sm" style={{ color: "#6B7280" }}>Subscribe above to be the first to receive our monthly updates.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
