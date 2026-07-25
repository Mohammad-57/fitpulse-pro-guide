import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Check, Copy, Loader2, Quote, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { generateAiMotivation } from "../../lib/ai.functions";

export function AiMotivation() {
  const call = useServerFn(generateAiMotivation);
  const [quote, setQuote] = useState<{ title: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    setLoading(true);
    setError(null);
    try {
      setQuote(await call({ data: { seed: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` } }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not reach the AI right now.");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    if (!quote) return;
    try {
      await navigator.clipboard.writeText(`${quote.title} — ${quote.message}`);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <section id="motivation" className="scroll-mt-24">
      <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full gradient-primary opacity-20 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-elegant">
              <Quote className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold">AI Daily Motivation</h2>
              <p className="text-sm text-muted-foreground">One fresh push, generated on demand.</p>
            </div>
          </div>

          <div className="mt-6 min-h-[104px] rounded-2xl border border-border/60 bg-card/50 p-5">
            {loading ? (
              <div className="flex items-center gap-3 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span className="text-sm">Finding the right words…</span>
              </div>
            ) : error ? (
              <p className="text-sm text-destructive">{error}</p>
            ) : quote ? (
              <div className="animate-fade-up">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">{quote.title}</p>
                <p className="mt-2 text-lg font-semibold leading-relaxed">{quote.message}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Tap the button for an AI-written boost tailored to today's training mindset.
              </p>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={generate}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:scale-[1.02] disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {quote ? "New motivation" : "Inspire me"}
            </button>
            {quote && (
              <button
                onClick={copy}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-accent"
              >
                {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
