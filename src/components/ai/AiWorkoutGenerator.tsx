import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Dumbbell, Flame, Snowflake, Sun } from "lucide-react";
import { generateAiWorkout } from "../../lib/ai.functions";
import type { AiWorkout, AiWorkoutRequest } from "../../lib/ai-types";
import { AiButton, AiCard, AiError, AiField, AiLoading, AiResultActions, Bullets, ExerciseTable } from "./AiKit";

const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const GOALS = ["Weight Loss", "Muscle Gain", "General Fitness"];
const PLACES = ["Home Workout", "Gym Workout"];
const FOCUS = ["Cardio", "Strength Training", "Full Body", "HIIT"];
const MINUTES = ["20", "30", "45", "60"];

function workoutToText(w: AiWorkout) {
  return [
    `FitPulse AI Workout — ${w.title}`,
    `${w.level} · ${w.type} · ${w.goal}`,
    `Warm-up: ${w.warmup}`,
    "",
    ...(w.exercises ?? []).map((e) => `- ${e.name}: ${e.sets} x ${e.reps}, rest ${e.rest} (~${e.calories} kcal)`),
    "",
    `Total estimated calories: ${w.totalCalories}`,
    `Cool-down: ${w.cooldown}`,
    "",
    ...(w.notes ?? []).map((n) => `Note: ${n}`),
  ].join("\n");
}

export function AiWorkoutGenerator() {
  const call = useServerFn(generateAiWorkout);
  const [req, setReq] = useState<AiWorkoutRequest>({
    level: "Beginner",
    goal: "Weight Loss",
    place: "Home Workout",
    focus: "Full Body",
    minutes: "30",
  });
  const [workout, setWorkout] = useState<AiWorkout | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = (k: keyof AiWorkoutRequest) => (v: string) => setReq((p) => ({ ...p, [k]: v }));

  const generate = async () => {
    setLoading(true);
    setError(null);
    try {
      setWorkout(await call({ data: req }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not reach the AI workout generator.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="workout-generator" className="scroll-mt-24">
      <div className="glass rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-elegant">
            <Dumbbell className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-xl font-bold">AI Workout Generator</h2>
            <p className="text-sm text-muted-foreground">Routines with sets, reps, rest and calorie estimates.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <AiField label="Level" value={req.level} onChange={set("level")} options={LEVELS} />
          <AiField label="Goal" value={req.goal} onChange={set("goal")} options={GOALS} />
          <AiField label="Location" value={req.place} onChange={set("place")} options={PLACES} />
          <AiField label="Training focus" value={req.focus} onChange={set("focus")} options={FOCUS} />
          <AiField label="Duration (min)" value={req.minutes} onChange={set("minutes")} options={MINUTES} />
        </div>

        <div className="mt-6">
          <AiButton loading={loading} onClick={generate}>
            {loading ? "Generating workout" : "Generate Workout"}
          </AiButton>
        </div>
      </div>

      {loading && (
        <div className="mt-6">
          <AiLoading label="Designing your routine" />
        </div>
      )}
      {error && !loading && (
        <div className="mt-6">
          <AiError message={error} onRetry={generate} />
        </div>
      )}

      {workout && !loading && !error && (
        <div className="mt-6 space-y-6">
          <AiResultActions text={workoutToText(workout)} onRegenerate={generate} loading={loading} />
          <AiCard title="Routine" icon={<Dumbbell className="h-4 w-4" />}>
            <p className="text-lg font-bold">{workout.title}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
              {[workout.level, workout.type, workout.goal].filter(Boolean).map((t, i) => (
                <span key={i} className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4">
              <ExerciseTable rows={workout.exercises ?? []} />
            </div>
          </AiCard>

          <div className="grid gap-6 md:grid-cols-3">
            <AiCard title="Warm-up" icon={<Sun className="h-4 w-4" />}>
              <p className="text-muted-foreground">{workout.warmup}</p>
            </AiCard>
            <AiCard title="Estimated calories burned" icon={<Flame className="h-4 w-4" />}>
              <p className="text-3xl font-bold gradient-text">{workout.totalCalories}</p>
            </AiCard>
            <AiCard title="Cool-down" icon={<Snowflake className="h-4 w-4" />}>
              <p className="text-muted-foreground">{workout.cooldown}</p>
            </AiCard>
          </div>

          <AiCard title="Coach notes" icon={<Dumbbell className="h-4 w-4" />}>
            <Bullets items={workout.notes ?? []} />
          </AiCard>
        </div>
      )}
    </section>
  );
}
