import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Droplets, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/water")({
  head: () => ({
    meta: [
      { title: "Water Intake Calculator — FitPulse" },
      { name: "description", content: "Discover your recommended daily water intake based on body weight and activity level." },
      { property: "og:title", content: "Water Intake Calculator — FitPulse" },
      { property: "og:description", content: "Know exactly how much water your body needs each day." },
    ],
  }),
  component: Water,
});

function Water() {
  const [weight, setWeight] = useState("");
  const [active, setActive] = useState(false);

  const result = useMemo(() => {
    const w = parseFloat(weight);
    if (!w) return null;
    const liters = (w * 0.033) + (active ? 0.5 : 0);
    return {
      liters: liters.toFixed(2),
      ml: Math.round(liters * 1000),
      glasses: Math.round((liters * 1000) / 250),
    };
  }, [weight, active]);

  return (
    <>
      <PageHeader eyebrow="Hydration" title={<>Your daily <span className="gradient-text">water intake</span></>} description="Hydration keeps energy up, joints healthy, and workouts strong." />
      <div className="mx-auto max-w-4xl px-4 pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass rounded-3xl p-6 sm:p-8 space-y-5">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Body weight (kg)</span>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 70"
                className="w-full rounded-2xl border border-input bg-card/70 px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/20" />
            </label>
            <label className="flex items-start gap-3 rounded-2xl border border-border p-4 cursor-pointer hover:bg-accent">
              <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="mt-1 h-4 w-4 accent-[oklch(0.58_0.22_25)]" />
              <div>
                <p className="font-semibold text-sm">I exercise 30+ min today</p>
                <p className="text-xs text-muted-foreground">Adds ~500 ml for sweat loss.</p>
              </div>
            </label>
            <button onClick={() => { setWeight(""); setActive(false); toast.success("Reset complete"); }}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold hover:bg-accent">
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>

          <div className="glass rounded-3xl p-6 sm:p-8 text-center">
            <div className="relative mx-auto h-40 w-32">
              <div className="absolute inset-0 rounded-3xl border-2 border-primary/30" />
              <div className="absolute bottom-0 left-0 right-0 rounded-b-3xl bg-gradient-to-t from-primary to-primary-glow transition-all"
                style={{ height: result ? `${Math.min(100, (parseFloat(result.liters) / 4) * 100)}%` : "0%" }} />
              <Droplets className="absolute inset-0 m-auto h-10 w-10 text-primary-foreground mix-blend-difference" />
            </div>
            <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">Recommended</p>
            <p className="mt-1 text-5xl font-bold gradient-text">{result ? result.liters : "—"}<span className="text-2xl"> L</span></p>
            {result && (
              <p className="mt-1 text-sm text-muted-foreground">≈ {result.ml.toLocaleString()} ml · about {result.glasses} glasses (250 ml)</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
