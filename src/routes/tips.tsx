import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Sparkles, Search } from "lucide-react";

export const Route = createFileRoute("/tips")({
  head: () => ({
    meta: [
      { title: "Fitness Tips — FitPulse" },
      { name: "description", content: "Daily, weight loss, muscle gain, lifestyle and recovery tips — all in one searchable feed." },
      { property: "og:title", content: "Fitness Tips — FitPulse" },
      { property: "og:description", content: "Actionable fitness tips for every goal." },
    ],
  }),
  component: Tips,
});

type Cat = "Daily" | "Weight Loss" | "Muscle Gain" | "Lifestyle" | "Recovery";

const TIPS: { cat: Cat; title: string; desc: string }[] = [
  { cat: "Daily", title: "Move every hour", desc: "A 3–5 minute walk breaks up sitting and lifts energy." },
  { cat: "Daily", title: "Get sunlight in the morning", desc: "Anchors your circadian rhythm for better sleep tonight." },
  { cat: "Daily", title: "Protein at every meal", desc: "Preserves muscle and keeps you full longer." },
  { cat: "Weight Loss", title: "Small consistent deficit", desc: "300–500 kcal below maintenance beats crash diets." },
  { cat: "Weight Loss", title: "Prioritize whole foods", desc: "Higher satiety per calorie — you naturally eat less." },
  { cat: "Weight Loss", title: "Walk after meals", desc: "10-minute walks help blood sugar and step totals." },
  { cat: "Muscle Gain", title: "Progressive overload", desc: "Add reps, weight, or sets weekly." },
  { cat: "Muscle Gain", title: "Eat in a small surplus", desc: "200–300 kcal over maintenance minimizes fat gain." },
  { cat: "Muscle Gain", title: "Sleep is anabolic", desc: "Growth happens overnight — protect 7–9 hours." },
  { cat: "Lifestyle", title: "Habit stacking", desc: "Attach new habits to existing ones (coffee → stretch)." },
  { cat: "Lifestyle", title: "Two-minute rule", desc: "Shrink habits until starting is trivial." },
  { cat: "Lifestyle", title: "Design your environment", desc: "Fruit on the counter, chips out of sight." },
  { cat: "Recovery", title: "Deload every 4–6 weeks", desc: "Back off intensity to let your body rebuild." },
  { cat: "Recovery", title: "Hydrate and electrolytes", desc: "Sodium, potassium, magnesium fix midday fatigue." },
  { cat: "Recovery", title: "Warm-up isn't optional", desc: "5 minutes of prep prevents most injuries." },
];

const CATS: (Cat | "All")[] = ["All", "Daily", "Weight Loss", "Muscle Gain", "Lifestyle", "Recovery"];

function Tips() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Cat | "All">("All");
  const filtered = useMemo(() => TIPS.filter((t) =>
    (cat === "All" || t.cat === cat) &&
    (q === "" || t.title.toLowerCase().includes(q.toLowerCase()) || t.desc.toLowerCase().includes(q.toLowerCase()))
  ), [q, cat]);

  return (
    <>
      <PageHeader eyebrow="Knowledge" title={<>Tips that <span className="gradient-text">actually work</span></>} description="Small, science-backed habits compound into massive results." />
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <div className="glass rounded-3xl p-5 sm:p-6">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tips..."
              className="w-full rounded-2xl border border-input bg-card/70 py-3 pl-11 pr-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/20" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${cat === c ? "gradient-primary text-primary-foreground" : "border border-border hover:bg-accent"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <div key={t.title} className="glass rounded-3xl p-6 hover:-translate-y-1 hover:shadow-elegant transition">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="h-3.5 w-3.5" /> {t.cat}
              </div>
              <h3 className="mt-3 text-lg font-semibold">{t.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{t.desc}</p>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full glass rounded-3xl p-10 text-center text-muted-foreground">No tips match your search.</div>
          )}
        </div>
      </div>
    </>
  );
}
