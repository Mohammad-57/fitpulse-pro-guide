import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Apple, Coffee, Cookie, Droplets, Salad, UtensilsCrossed } from "lucide-react";
import { generateAiMealPlan } from "../../lib/ai.functions";
import type { AiMealPlan, AiProfile } from "../../lib/ai-types";
import { AiButton, AiCard, AiError, AiField, AiLoading, AiResultActions } from "./AiKit";

const GOALS = ["Weight Loss", "Maintain", "Muscle Gain"];
const ACTIVITY = ["Sedentary", "Lightly Active", "Moderately Active", "Very Active"];
const GENDERS = ["Male", "Female", "Other"];

function mealToText(m: AiMealPlan) {
  const meal = (label: string, x?: { name: string; items: string[]; calories: string }) =>
    `${label}: ${x?.name ?? ""} (${x?.calories ?? ""})\n${(x?.items ?? []).map((i) => `  - ${i}`).join("\n")}`;
  return [
    `FitPulse AI Meal Plan — goal: ${m.goal}`,
    meal("Breakfast", m.breakfast),
    meal("Lunch", m.lunch),
    meal("Dinner", m.dinner),
    `Snacks:\n${(m.snacks ?? []).map((s) => `  - ${s.name} (${s.calories})`).join("\n")}`,
    `Protein: ${m.macros?.protein} · Carbs: ${m.macros?.carbs} · Fats: ${m.macros?.fats} · Total: ${m.macros?.calories}`,
    `Hydration: ${m.hydration}`,
  ].join("\n\n");
}

function MealBlock({
  label,
  icon,
  meal,
}: {
  label: string;
  icon: React.ReactNode;
  meal?: { name: string; items: string[]; calories: string };
}) {
  return (
    <AiCard title={label} icon={icon}>
      <p className="font-bold">{meal?.name}</p>
      <p className="mt-0.5 text-xs font-semibold text-primary">{meal?.calories}</p>
      <ul className="mt-3 space-y-1.5">
        {(meal?.items ?? []).map((item, i) => (
          <li key={i} className="flex gap-2 text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    </AiCard>
  );
}

export function AiMealPlanner() {
  const call = useServerFn(generateAiMealPlan);
  const [profile, setProfile] = useState<AiProfile>({
    age: "25",
    gender: "Male",
    height: "175",
    weight: "72",
    goal: "Weight Loss",
    activity: "Moderately Active",
    experience: "Beginner",
    time: "45",
  });
  const [meal, setMeal] = useState<AiMealPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = (k: keyof AiProfile) => (v: string) => setProfile((p) => ({ ...p, [k]: v }));

  const generate = async () => {
    setLoading(true);
    setError(null);
    try {
      setMeal(await call({ data: profile }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not reach the AI meal planner.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="meals" className="scroll-mt-24">
      <div className="glass rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-elegant">
            <UtensilsCrossed className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-xl font-bold">AI Meal Planner</h2>
            <p className="text-sm text-muted-foreground">A full day of meals and macros tuned to your goal.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AiField label="Age" type="number" value={profile.age} onChange={set("age")} />
          <AiField label="Gender" value={profile.gender} onChange={set("gender")} options={GENDERS} />
          <AiField label="Weight (kg)" type="number" value={profile.weight} onChange={set("weight")} />
          <AiField label="Height (cm)" type="number" value={profile.height} onChange={set("height")} />
          <AiField label="Fitness goal" value={profile.goal} onChange={set("goal")} options={GOALS} />
          <AiField label="Activity level" value={profile.activity} onChange={set("activity")} options={ACTIVITY} />
        </div>

        <div className="mt-6">
          <AiButton loading={loading} onClick={generate}>
            {loading ? "Generating meal plan" : "Generate Meal Plan"}
          </AiButton>
        </div>
      </div>

      {loading && (
        <div className="mt-6">
          <AiLoading label="Planning your meals" />
        </div>
      )}
      {error && !loading && (
        <div className="mt-6">
          <AiError message={error} onRetry={generate} />
        </div>
      )}

      {meal && !loading && !error && (
        <div className="mt-6 space-y-6">
          <AiResultActions text={mealToText(meal)} onRegenerate={generate} loading={loading} />
          <p className="text-sm text-muted-foreground">
            Adapted for goal: <span className="font-semibold text-foreground">{meal.goal}</span>
          </p>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <MealBlock label="Breakfast" icon={<Coffee className="h-4 w-4" />} meal={meal.breakfast} />
            <MealBlock label="Lunch" icon={<Salad className="h-4 w-4" />} meal={meal.lunch} />
            <MealBlock label="Dinner" icon={<UtensilsCrossed className="h-4 w-4" />} meal={meal.dinner} />
            <AiCard title="Healthy snacks" icon={<Cookie className="h-4 w-4" />}>
              <ul className="space-y-2">
                {(meal.snacks ?? []).map((s, i) => (
                  <li key={i} className="flex items-center justify-between gap-2 rounded-2xl border border-border/60 px-3 py-2">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-xs text-muted-foreground">{s.calories}</span>
                  </li>
                ))}
              </ul>
            </AiCard>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <AiCard title="Daily protein target" icon={<Apple className="h-4 w-4" />}>
              <p className="text-3xl font-bold gradient-text">{meal.macros?.protein}</p>
            </AiCard>
            <AiCard title="Carbohydrates" icon={<Apple className="h-4 w-4" />}>
              <p className="text-3xl font-bold gradient-text">{meal.macros?.carbs}</p>
            </AiCard>
            <AiCard title="Healthy fats" icon={<Apple className="h-4 w-4" />}>
              <p className="text-3xl font-bold gradient-text">{meal.macros?.fats}</p>
            </AiCard>
            <AiCard title="Hydration" icon={<Droplets className="h-4 w-4" />}>
              <p className="text-muted-foreground">{meal.hydration}</p>
            </AiCard>
          </div>
        </div>
      )}
    </section>
  );
}
