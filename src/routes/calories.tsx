import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Flame, RotateCcw, Printer } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/calories")({
  head: () => ({
    meta: [
      { title: "Daily Calorie Calculator — FitPulse" },
      { name: "description", content: "Get your personalized daily calorie needs based on age, gender, activity, and goal — Mifflin-St Jeor formula." },
      { property: "og:title", content: "Daily Calorie Calculator — FitPulse" },
      { property: "og:description", content: "Personalized daily calorie targets." },
    ],
  }),
  component: Calories,
});

const ACTIVITY = [
  { key: "sedentary", label: "Sedentary", desc: "Little to no exercise", mult: 1.2 },
  { key: "light", label: "Light", desc: "1–3 days / week", mult: 1.375 },
  { key: "moderate", label: "Moderate", desc: "3–5 days / week", mult: 1.55 },
  { key: "active", label: "Active", desc: "6–7 days / week", mult: 1.725 },
  { key: "athlete", label: "Athlete", desc: "Twice daily / physical job", mult: 1.9 },
] as const;

const GOALS = [
  { key: "loss", label: "Weight Loss", delta: -500 },
  { key: "maintain", label: "Maintain", delta: 0 },
  { key: "gain", label: "Muscle Gain", delta: 300 },
] as const;

function Calories() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState<typeof ACTIVITY[number]["key"]>("moderate");
  const [goal, setGoal] = useState<typeof GOALS[number]["key"]>("maintain");

  const result = useMemo(() => {
    const a = parseFloat(age), h = parseFloat(height), w = parseFloat(weight);
    if (!a || !h || !w) return null;
    const bmr = gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;
    const mult = ACTIVITY.find((x) => x.key === activity)!.mult;
    const tdee = bmr * mult;
    const delta = GOALS.find((x) => x.key === goal)!.delta;
    const target = tdee + delta;
    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      target: Math.round(target),
      protein: Math.round(w * 1.8),
      carbs: Math.round((target * 0.45) / 4),
      fats: Math.round((target * 0.25) / 9),
    };
  }, [age, gender, height, weight, activity, goal]);

  const reset = () => {
    setAge(""); setHeight(""); setWeight(""); setGender("male");
    setActivity("moderate"); setGoal("maintain");
    toast.success("Reset complete");
  };

  return (
    <>
      <PageHeader eyebrow="Calculator" title={<>Your daily <span className="gradient-text">calorie target</span></>} description="Personalized targets using the Mifflin-St Jeor formula with macro suggestions." />
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="glass rounded-3xl p-6 sm:p-8 space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <Num label="Age" value={age} setValue={setAge} placeholder="25" />
              <div>
                <span className="mb-1.5 block text-sm font-medium">Gender</span>
                <div className="grid grid-cols-2 gap-2 rounded-2xl border border-input bg-card/70 p-1">
                  {(["male","female"] as const).map((g) => (
                    <button key={g} onClick={() => setGender(g)}
                      className={`rounded-xl py-2 text-sm font-semibold capitalize transition ${gender === g ? "gradient-primary text-primary-foreground" : "text-muted-foreground"}`}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <Num label="Height (cm)" value={height} setValue={setHeight} placeholder="175" />
              <Num label="Weight (kg)" value={weight} setValue={setWeight} placeholder="70" />
            </div>

            <div>
              <span className="mb-2 block text-sm font-medium">Activity Level</span>
              <div className="grid gap-2 sm:grid-cols-2">
                {ACTIVITY.map((a) => (
                  <button key={a.key} onClick={() => setActivity(a.key)}
                    className={`rounded-2xl border p-3 text-left text-sm transition ${activity === a.key ? "border-primary bg-primary/10" : "border-border hover:bg-accent"}`}>
                    <div className="font-semibold">{a.label}</div>
                    <div className="text-xs text-muted-foreground">{a.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="mb-2 block text-sm font-medium">Goal</span>
              <div className="grid grid-cols-3 gap-2">
                {GOALS.map((g) => (
                  <button key={g.key} onClick={() => setGoal(g.key)}
                    className={`rounded-2xl border py-3 text-sm font-semibold transition ${goal === g.key ? "gradient-primary text-primary-foreground border-transparent" : "border-border hover:bg-accent"}`}>
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold hover:bg-accent"><RotateCcw className="h-4 w-4" /> Reset</button>
              <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant"><Printer className="h-4 w-4" /> Print report</button>
            </div>
          </div>

          <div className="glass rounded-3xl p-6 sm:p-8 text-center">
            <Flame className="mx-auto h-8 w-8 text-primary" />
            <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">Daily calorie target</p>
            <p className="mt-2 text-6xl font-bold gradient-text">{result ? result.target.toLocaleString() : "—"}</p>
            <p className="text-sm text-muted-foreground">kcal / day</p>

            {result && (
              <>
                <div className="mt-6 grid grid-cols-2 gap-3 text-left">
                  <Info label="BMR" value={`${result.bmr} kcal`} />
                  <Info label="TDEE" value={`${result.tdee} kcal`} />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <Macro label="Protein" value={`${result.protein} g`} />
                  <Macro label="Carbs" value={`${result.carbs} g`} />
                  <Macro label="Fats" value={`${result.fats} g`} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Num({ label, value, setValue, placeholder }: any) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder}
        className="w-full rounded-2xl border border-input bg-card/70 px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/20" />
    </label>
  );
}
function Info({ label, value }: any) {
  return <div className="rounded-2xl border border-border/60 bg-card/50 p-3"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 font-semibold">{value}</p></div>;
}
function Macro({ label, value }: any) {
  return <div className="rounded-2xl gradient-primary p-3 text-primary-foreground"><p className="text-[10px] uppercase opacity-80">{label}</p><p className="mt-0.5 font-bold">{value}</p></div>;
}
