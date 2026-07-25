import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { BarChart3, CheckCircle2, Lightbulb, Scale, TrendingUp } from "lucide-react";
import { generateAiHealthSummary } from "../../lib/ai.functions";
import type { AiHealthRequest, AiHealthSummary } from "../../lib/ai-types";
import { AiButton, AiCard, AiError, AiField, AiLoading, AiResultActions, Bullets } from "./AiKit";

function summaryToText(s: AiHealthSummary) {
  return [
    `FitPulse AI Health Summary — score ${s.healthScore}/100 (${s.scoreLabel})`,
    `BMI analysis: ${s.bmiAnalysis}`,
    "",
    "Strengths:",
    ...(s.strengths ?? []).map((x) => `- ${x}`),
    "",
    "Areas for improvement:",
    ...(s.improvements ?? []).map((x) => `- ${x}`),
    "",
    "Recommendations:",
    ...(s.recommendations ?? []).map((x) => `- ${x}`),
  ].join("\n");
}

export function AiHealthSummaryCard() {
  const call = useServerFn(generateAiHealthSummary);
  const [req, setReq] = useState<AiHealthRequest>({
    bmi: "23.5",
    calories: "2200",
    water: "2.5",
    workoutsPerWeek: "3",
    sleep: "7",
    notes: "",
  });
  const [summary, setSummary] = useState<AiHealthSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = (k: keyof AiHealthRequest) => (v: string) => setReq((p) => ({ ...p, [k]: v }));

  const generate = async () => {
    setLoading(true);
    setError(null);
    try {
      setSummary(await call({ data: req }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not reach the AI health analyst.");
    } finally {
      setLoading(false);
    }
  };

  const score = Math.max(0, Math.min(100, Number(summary?.healthScore ?? 0)));

  return (
    <section id="health-summary" className="scroll-mt-24">
      <div className="glass rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-elegant">
            <BarChart3 className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-xl font-bold">AI Health Summary</h2>
            <p className="text-sm text-muted-foreground">Paste your calculator results for an AI health readout.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AiField label="BMI" value={req.bmi} onChange={set("bmi")} placeholder="23.5" />
          <AiField label="Daily calorie target" value={req.calories} onChange={set("calories")} placeholder="2200" />
          <AiField label="Water intake (L)" value={req.water} onChange={set("water")} placeholder="2.5" />
          <AiField label="Workouts per week" value={req.workoutsPerWeek} onChange={set("workoutsPerWeek")} placeholder="3" />
          <AiField label="Average sleep (h)" value={req.sleep} onChange={set("sleep")} placeholder="7" />
          <AiField label="Notes (optional)" value={req.notes} onChange={set("notes")} placeholder="Desk job, knee pain…" />
        </div>

        <div className="mt-6">
          <AiButton loading={loading} onClick={generate}>
            {loading ? "Analyzing" : "Generate Health Summary"}
          </AiButton>
        </div>
      </div>

      {loading && (
        <div className="mt-6">
          <AiLoading label="Analyzing your numbers" />
        </div>
      )}
      {error && !loading && (
        <div className="mt-6">
          <AiError message={error} onRetry={generate} />
        </div>
      )}

      {summary && !loading && !error && (
        <div className="mt-6 space-y-6">
          <AiResultActions text={summaryToText(summary)} onRegenerate={generate} loading={loading} />
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <AiCard title="Overall health score" icon={<TrendingUp className="h-4 w-4" />}>
              <div className="flex flex-col items-center">
                <div
                  className="grid h-40 w-40 place-items-center rounded-full"
                  style={{
                    background: `conic-gradient(oklch(0.58 0.22 25) ${score * 3.6}deg, color-mix(in oklab, currentColor 12%, transparent) 0deg)`,
                  }}
                >
                  <div className="grid h-32 w-32 place-items-center rounded-full bg-background">
                    <div className="text-center">
                      <p className="text-4xl font-bold gradient-text">{score}</p>
                      <p className="text-xs text-muted-foreground">/ 100</p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 font-semibold">{summary.scoreLabel}</p>
              </div>
            </AiCard>
            <AiCard title="BMI analysis" icon={<Scale className="h-4 w-4" />}>
              <p className="text-muted-foreground">{summary.bmiAnalysis}</p>
            </AiCard>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <AiCard title="Strengths" icon={<CheckCircle2 className="h-4 w-4" />}>
              <Bullets items={summary.strengths ?? []} />
            </AiCard>
            <AiCard title="Areas for improvement" icon={<TrendingUp className="h-4 w-4" />}>
              <Bullets items={summary.improvements ?? []} />
            </AiCard>
            <AiCard title="Personalized recommendations" icon={<Lightbulb className="h-4 w-4" />}>
              <Bullets items={summary.recommendations ?? []} />
            </AiCard>
          </div>
        </div>
      )}
    </section>
  );
}
