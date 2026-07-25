import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { HeartPulse, RotateCcw, Printer } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/bmi")({
  head: () => ({
    meta: [
      { title: "BMI Calculator — FitPulse" },
      { name: "description", content: "Calculate your Body Mass Index instantly with clear category, health recommendations, and reset — all in your browser." },
      { property: "og:title", content: "BMI Calculator — FitPulse" },
      { property: "og:description", content: "Instant BMI with health guidance." },
    ],
  }),
  component: BMI,
});

type Unit = "metric" | "imperial";

function categorize(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", color: "oklch(0.72 0.14 240)", tip: "Aim to add nutrient-dense calories and strength training to build lean mass." };
  if (bmi < 25) return { label: "Healthy weight", color: "oklch(0.65 0.19 150)", tip: "You're in a healthy range. Maintain with balanced meals and consistent activity." };
  if (bmi < 30) return { label: "Overweight", color: "oklch(0.75 0.17 70)", tip: "A modest calorie deficit plus 3–5 workouts weekly will move the needle." };
  return { label: "Obese", color: "oklch(0.6 0.24 25)", tip: "Consider a structured plan and speak with a healthcare professional for guidance." };
}

function BMI() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");

  const bmi = useMemo(() => {
    if (unit === "metric") {
      const h = parseFloat(height) / 100;
      const w = parseFloat(weight);
      if (!h || !w || h <= 0) return null;
      return w / (h * h);
    }
    const ft = parseFloat(heightFt) || 0;
    const inch = parseFloat(heightIn) || 0;
    const totalIn = ft * 12 + inch;
    const w = parseFloat(weight);
    if (!totalIn || !w) return null;
    return (w / (totalIn * totalIn)) * 703;
  }, [unit, height, weight, heightFt, heightIn]);

  const cat = bmi ? categorize(bmi) : null;

  const reset = () => {
    setHeight(""); setWeight(""); setHeightFt(""); setHeightIn("");
    toast.success("Reset complete");
  };

  return (
    <>
      <PageHeader eyebrow="Calculator" title={<>Know your <span className="gradient-text">BMI</span></>} description="A quick body-composition snapshot with practical guidance." />
      <div className="mx-auto max-w-5xl px-4 pb-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-3xl p-6 sm:p-8">
            <div className="mb-5 inline-flex rounded-full border border-border p-1">
              {(["metric","imperial"] as Unit[]).map((u) => (
                <button key={u} onClick={() => setUnit(u)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${unit === u ? "gradient-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {u}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              {unit === "metric" ? (
                <Field label="Height (cm)" value={height} onChange={setHeight} placeholder="e.g. 175" min={50} max={260} />
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Height (ft)" value={heightFt} onChange={setHeightFt} placeholder="5" min={1} max={8} />
                  <Field label="Height (in)" value={heightIn} onChange={setHeightIn} placeholder="9" min={0} max={11} />
                </div>
              )}
              <Field label={unit === "metric" ? "Weight (kg)" : "Weight (lb)"} value={weight} onChange={setWeight} placeholder={unit === "metric" ? "e.g. 70" : "e.g. 154"} min={20} max={500} />
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold hover:bg-accent"><RotateCcw className="h-4 w-4" /> Reset</button>
              <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant"><Printer className="h-4 w-4" /> Print report</button>
            </div>
          </div>

          <div className="glass rounded-3xl p-6 sm:p-8 text-center">
            <HeartPulse className="mx-auto h-8 w-8 text-primary" />
            <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">Your BMI</p>
            <p className="mt-2 text-6xl font-bold gradient-text">{bmi ? bmi.toFixed(1) : "—"}</p>
            {cat ? (
              <>
                <span className="mt-4 inline-block rounded-full px-4 py-1.5 text-sm font-semibold text-white" style={{ backgroundColor: cat.color }}>{cat.label}</span>
                <p className="mx-auto mt-5 max-w-sm text-sm text-muted-foreground">{cat.tip}</p>
                <div className="mt-6">
                  <BMIScale bmi={bmi!} />
                </div>
              </>
            ) : (
              <p className="mt-6 text-sm text-muted-foreground">Enter your height and weight to see your result.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Field({ label, value, onChange, placeholder, min, max }: any) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input
        type="number" inputMode="decimal" value={value} min={min} max={max}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-input bg-card/70 px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/20"
      />
    </label>
  );
}

function BMIScale({ bmi }: { bmi: number }) {
  const clamped = Math.max(14, Math.min(40, bmi));
  const pct = ((clamped - 14) / (40 - 14)) * 100;
  return (
    <div className="relative">
      <div className="h-3 w-full rounded-full bg-gradient-to-r from-sky-400 via-emerald-400 via-40% to-red-500" />
      <div className="absolute -top-1.5 -translate-x-1/2 transition-all" style={{ left: `${pct}%` }}>
        <div className="h-6 w-1 rounded-full bg-foreground shadow" />
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
        <span>14</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
      </div>
    </div>
  );
}
