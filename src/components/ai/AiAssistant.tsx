import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Activity, CalendarDays, Dumbbell, Droplets, Flame, HeartPulse, Quote, Sparkles } from "lucide-react";
import { generateAiPlan } from "../../lib/ai.functions";
import type { AiPlan, AiProfile } from "../../lib/ai-types";
import { AiButton, AiCard, AiError, AiField, AiLoading, AiResultActions, Bullets, ExerciseTable } from "./AiKit";

const GOALS = ["Weight Loss", "Maintain", "Muscle Gain", "General Fitness"];
const ACTIVITY = ["Sedentary", "Lightly Active", "Moderately Active", "Very Active"];
const EXPERIENCE = ["Beginner", "Intermediate", "Advanced"];
const TIMES = ["20", "30", "45", "60", "90"];
const GENDERS = ["Male", "Female", "Other"];

function planToText(p: AiPlan) {
  return [
    `FitPulse AI Plan — ${p.workoutPlan?.title ?? ""}`,
    `Focus: ${p.workoutPlan?.focus ?? ""}`,
    p.workoutPlan?.summary ?? "",
    "",
    "Daily exercises:",
    ...(p.dailyExercises ?? []).map((e) => `- ${e.name}: ${e.sets} x ${e.reps}, rest ${e.rest} (~${e.calories} kcal)`),
    "",
    "Weekly schedule:",
    ...(p.weeklySchedule ?? []).map((d) => `- ${d.day}: ${d.focus} (${d.duration})`),
    "",
    `Calories to burn: ${p.caloriesToBurn}`,
    `Water intake: ${p.waterIntake}`,
    "",
    "Recovery:",
    ...(p.recovery ?? []).map((r) => `- ${r}`),
    "",
    `Motivation: ${p.motivation}`,
    "",
    "Weekly tips:",
    ...(p.weeklyTips ?? []).map((t) => `- ${t}`),
  ].join("\n");
}

export function AiAssistant() {
  const call = useServerFn(generateAiPlan);
  const [profile, setProfile] = useState<AiProfile>({
    age: "25",
    gender: "Male",
    height: "175",
    weight: "72",
    goal: "Muscle Gain",
    activity: "Moderately Active",
    experience: "Beginner",
    time: "45",
  });
  const [plan, setPlan] = useState<AiPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof AiProfile) => (v: string) => setProfile((p) => ({ ...p, [k]: v }));

  const generate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await call({ data: profile });
      setPlan(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong while contacting the AI coach.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="assistant" className="scroll-mt-24">
      <div className="glass rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-elegant">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-xl font-bold">AI Fitness Assistant</h2>
            <p className="text-sm text-muted-foreground">Tell the AI about you — get a complete personalized plan.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AiField label="Age" type="number" value={profile.age} onChange={set("age")} placeholder="25" />
          <AiField label="Gender" value={profile.gender} onChange={set("gender")} options={GENDERS} />
          <AiField label="Height (cm)" type="number" value={profile.height} onChange={set("height")} placeholder="175" />
          <AiField label="Weight (kg)" type="number" value={profile.weight} onChange={set("weight")} placeholder="72" />
          <AiField label="Fitness goal" value={profile.goal} onChange={set("goal")} options={GOALS} />
          <AiField label="Activity level" value={profile.activity} onChange={set("activity")} options={ACTIVITY} />
          <AiField label="Workout experience" value={profile.experience} onChange={set("experience")} options={EXPERIENCE} />
          <AiField label="Time per session (min)" value={profile.time} onChange={set("time")} options={TIMES} />
        </div>

        <div className="mt-6">
          <AiButton loading={loading} onClick={generate}>
            {loading ? "Generating AI plan" : "Generate AI Plan"}
          </AiButton>
        </div>
      </div>

      {loading && (
        <div className="mt-6">
          <AiLoading label="Building your personalized plan" />
        </div>
      )}
      {error && !loading && (
        <div className="mt-6">
          <AiError message={error} onRetry={generate} />
        </div>
      )}

      {plan && !loading && !error && (
        <div className="mt-6 space-y-6">
          <AiResultActions text={planToText(plan)} onRegenerate={generate} loading={loading} />

          <AiCard title="Personalized workout plan" icon={<Dumbbell className="h-4 w-4" />}>
            <p className="text-lg font-bold">{plan.workoutPlan?.title}</p>
            <p className="mt-1 text-primary font-medium">{plan.workoutPlan?.focus}</p>
            <p className="mt-2 text-muted-foreground">{plan.workoutPlan?.summary}</p>
          </AiCard>

          <div className="grid gap-6 lg:grid-cols-2">
            <AiCard title="Daily exercise recommendations" icon={<Activity className="h-4 w-4" />}>
              <ExerciseTable rows={plan.dailyExercises ?? []} />
            </AiCard>
            <AiCard title="Weekly workout schedule" icon={<CalendarDays className="h-4 w-4" />}>
              <ul className="space-y-2">
                {(plan.weeklySchedule ?? []).map((d, i) => (
                  <li key={i} className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 px-4 py-2.5">
                    <span className="font-semibold">{d.day}</span>
                    <span className="text-right text-muted-foreground">
                      {d.focus} <span className="text-xs">· {d.duration}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </AiCard>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <AiCard title="Estimated calories to burn" icon={<Flame className="h-4 w-4" />}>
              <p className="text-3xl font-bold gradient-text">{plan.caloriesToBurn}</p>
            </AiCard>
            <AiCard title="Daily water intake" icon={<Droplets className="h-4 w-4" />}>
              <p className="text-3xl font-bold gradient-text">{plan.waterIntake}</p>
            </AiCard>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <AiCard title="Recovery recommendations" icon={<HeartPulse className="h-4 w-4" />}>
              <Bullets items={plan.recovery ?? []} />
            </AiCard>
            <AiCard title="Weekly improvement tips" icon={<Sparkles className="h-4 w-4" />}>
              <Bullets items={plan.weeklyTips ?? []} />
            </AiCard>
          </div>

          <AiCard title="Motivation message" icon={<Quote className="h-4 w-4" />}>
            <p className="text-lg font-semibold leading-relaxed">{plan.motivation}</p>
          </AiCard>
        </div>
      )}
    </section>
  );
}
