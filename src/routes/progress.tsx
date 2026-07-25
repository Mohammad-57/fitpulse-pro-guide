import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Printer, RotateCcw, Scale, Target, Dumbbell, Droplets, Moon, Trophy } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress Tracker — FitPulse" },
      { name: "description", content: "Track weight, workout frequency, water, and sleep against your goals with weekly summaries." },
      { property: "og:title", content: "Progress Tracker — FitPulse" },
      { property: "og:description", content: "Track weight, workouts, water, and sleep." },
    ],
  }),
  component: Progress,
});

function Progress() {
  const [current, setCurrent] = useState("");
  const [target, setTarget] = useState("");
  const [start, setStart] = useState("");
  const [days, setDays] = useState("");
  const [water, setWater] = useState("");
  const [sleep, setSleep] = useState("");

  const weightProgress = useMemo(() => {
    const c = parseFloat(current), t = parseFloat(target), s = parseFloat(start);
    if (!c || !t || !s || s === t) return 0;
    const pct = ((s - c) / (s - t)) * 100;
    return Math.max(0, Math.min(100, pct));
  }, [current, target, start]);

  const daysPct = Math.min(100, ((parseFloat(days) || 0) / 5) * 100);
  const waterPct = Math.min(100, ((parseFloat(water) || 0) / 3) * 100);
  const sleepPct = Math.min(100, ((parseFloat(sleep) || 0) / 8) * 100);

  const overall = Math.round((weightProgress + daysPct + waterPct + sleepPct) / 4);

  const reset = () => {
    setCurrent(""); setTarget(""); setStart(""); setDays(""); setWater(""); setSleep("");
    toast.success("All fields reset");
  };

  return (
    <>
      <PageHeader eyebrow="Dashboard" title={<>Your <span className="gradient-text">weekly progress</span></>} description="Log this week's numbers and see completion at a glance." />
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="glass rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-semibold">Log your week</h2>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Start weight (kg)" value={start} setValue={setStart} />
              <Field label="Current weight (kg)" value={current} setValue={setCurrent} />
            </div>
            <Field label="Target weight (kg)" value={target} setValue={setTarget} />
            <Field label="Workout days this week" value={days} setValue={setDays} />
            <Field label="Water today (L)" value={water} setValue={setWater} />
            <Field label="Sleep last night (hrs)" value={sleep} setValue={setSleep} />
            <div className="flex gap-3 pt-2">
              <button onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold hover:bg-accent"><RotateCcw className="h-4 w-4" /> Reset</button>
              <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant"><Printer className="h-4 w-4" /> Download / Print report</button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass rounded-3xl p-6 sm:p-8 text-center">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Goal completion</p>
              <div className="mt-4 flex items-center justify-center gap-6">
                <Ring pct={overall} size={140} />
                <div className="text-left">
                  <p className="text-5xl font-bold gradient-text">{overall}%</p>
                  <p className="mt-1 text-sm text-muted-foreground max-w-[16ch]">Weekly average across all metrics</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard icon={Scale} label="Weight goal" pct={weightProgress} value={current ? `${current} kg` : "—"} sub={target ? `Target ${target} kg` : "Set your target"} />
              <MetricCard icon={Dumbbell} label="Workouts" pct={daysPct} value={days ? `${days} / 5` : "—"} sub="Weekly target: 5 days" />
              <MetricCard icon={Droplets} label="Hydration" pct={waterPct} value={water ? `${water} L` : "—"} sub="Daily target: 3 L" />
              <MetricCard icon={Moon} label="Sleep" pct={sleepPct} value={sleep ? `${sleep} h` : "—"} sub="Target: 8 hours" />
            </div>

            <div className="glass rounded-3xl p-6">
              <div className="flex items-center gap-3">
                <Trophy className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Weekly summary</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {overall === 0
                  ? "Log your metrics above to generate your weekly summary."
                  : overall >= 80 ? "Outstanding week — you're crushing every metric."
                  : overall >= 60 ? "Solid progress. Small nudges get you to 80%+."
                  : overall >= 40 ? "You're moving. Pick one metric to improve next week."
                  : "A tough week. Focus on one habit at a time — start with sleep."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Field({ label, value, setValue }: any) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="0"
        className="w-full rounded-2xl border border-input bg-card/70 px-4 py-2.5 outline-none focus:border-primary focus:ring-4 focus:ring-primary/20" />
    </label>
  );
}

function MetricCard({ icon: Icon, label, pct, value, sub }: any) {
  return (
    <div className="glass rounded-3xl p-5">
      <div className="flex items-center justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary text-primary-foreground"><Icon className="h-5 w-5" /></div>
        <Ring pct={pct} size={56} thin />
      </div>
      <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

function Ring({ pct, size, thin }: { pct: number; size: number; thin?: boolean }) {
  const stroke = thin ? 4 : 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="oklch(0.92 0.01 20)" strokeWidth={stroke} />
        <defs>
          <linearGradient id={`g-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.58 0.22 25)" />
            <stop offset="100%" stopColor="oklch(0.68 0.24 20)" />
          </linearGradient>
        </defs>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={`url(#g-${size})`} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={`${(pct/100)*c} ${c}`} className="transition-all duration-700" />
      </svg>
      {!thin && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <Target className="mx-auto h-4 w-4 text-primary" />
          </div>
        </div>
      )}
      {thin && (
        <div className="absolute inset-0 grid place-items-center text-[11px] font-bold">{Math.round(pct)}%</div>
      )}
    </div>
  );
}
