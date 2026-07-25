import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Dumbbell, Search, Timer, Flame } from "lucide-react";

export const Route = createFileRoute("/workouts")({
  head: () => ({
    meta: [
      { title: "Workout Planner — FitPulse" },
      { name: "description", content: "Curated workouts for beginner, intermediate and advanced levels — home or gym, cardio, strength, and stretching." },
      { property: "og:title", content: "Workout Planner — FitPulse" },
      { property: "og:description", content: "Curated workouts for every level and setting." },
    ],
  }),
  component: Workouts,
});

type Level = "Beginner" | "Intermediate" | "Advanced";
type Place = "Home" | "Gym";
type Type = "Cardio" | "Strength" | "Stretching";

interface W {
  name: string; level: Level; place: Place; type: Type; duration: number; calories: number; desc: string;
}

const DATA: W[] = [
  { name: "Full-Body Bodyweight Starter", level: "Beginner", place: "Home", type: "Strength", duration: 25, calories: 180, desc: "Squats, push-ups, glute bridges, plank." },
  { name: "Brisk Walk", level: "Beginner", place: "Home", type: "Cardio", duration: 30, calories: 150, desc: "Steady 5–6 km/h pace." },
  { name: "Morning Mobility Flow", level: "Beginner", place: "Home", type: "Stretching", duration: 15, calories: 60, desc: "Cat-cow, hip openers, thoracic rotations." },
  { name: "Dumbbell Push Day", level: "Intermediate", place: "Gym", type: "Strength", duration: 45, calories: 340, desc: "Bench, overhead press, dips, triceps." },
  { name: "Dumbbell Pull Day", level: "Intermediate", place: "Gym", type: "Strength", duration: 45, calories: 330, desc: "Rows, pulldowns, face pulls, curls." },
  { name: "Leg Day Fundamentals", level: "Intermediate", place: "Gym", type: "Strength", duration: 50, calories: 400, desc: "Squats, RDLs, lunges, calves." },
  { name: "HIIT Intervals", level: "Intermediate", place: "Home", type: "Cardio", duration: 20, calories: 260, desc: "30s work, 30s rest × 20 rounds." },
  { name: "Running Tempo Run", level: "Intermediate", place: "Home", type: "Cardio", duration: 35, calories: 380, desc: "Comfortably hard pace." },
  { name: "Yoga Recovery", level: "Beginner", place: "Home", type: "Stretching", duration: 30, calories: 100, desc: "Slow flow with deep breathing." },
  { name: "Advanced Push/Pull Superset", level: "Advanced", place: "Gym", type: "Strength", duration: 60, calories: 520, desc: "Antagonist pairings, minimal rest." },
  { name: "Heavy Compound Lifts", level: "Advanced", place: "Gym", type: "Strength", duration: 75, calories: 600, desc: "Squat, bench, deadlift, OHP." },
  { name: "Sprint Intervals", level: "Advanced", place: "Home", type: "Cardio", duration: 25, calories: 340, desc: "8× 200m sprints." },
  { name: "Kettlebell Complex", level: "Advanced", place: "Gym", type: "Strength", duration: 30, calories: 380, desc: "Swings, cleans, snatches." },
  { name: "Deep Stretch & Foam Roll", level: "Intermediate", place: "Home", type: "Stretching", duration: 25, calories: 90, desc: "Focus on hips, hamstrings, thoracic." },
  { name: "Core Blast", level: "Intermediate", place: "Home", type: "Strength", duration: 15, calories: 130, desc: "Planks, hollow holds, leg raises." },
  { name: "Zone-2 Cycling", level: "Intermediate", place: "Gym", type: "Cardio", duration: 45, calories: 380, desc: "Conversational pace on the bike." },
];

const LEVELS: (Level | "All")[] = ["All", "Beginner", "Intermediate", "Advanced"];
const PLACES: (Place | "All")[] = ["All", "Home", "Gym"];
const TYPES: (Type | "All")[] = ["All", "Cardio", "Strength", "Stretching"];

function Workouts() {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState<Level | "All">("All");
  const [place, setPlace] = useState<Place | "All">("All");
  const [type, setType] = useState<Type | "All">("All");

  const filtered = useMemo(() => DATA.filter((w) =>
    (level === "All" || w.level === level) &&
    (place === "All" || w.place === place) &&
    (type === "All" || w.type === type) &&
    (q === "" || w.name.toLowerCase().includes(q.toLowerCase()) || w.desc.toLowerCase().includes(q.toLowerCase()))
  ), [q, level, place, type]);

  return (
    <>
      <PageHeader eyebrow="Planner" title={<>Find your <span className="gradient-text">next workout</span></>} description="Search, filter, and pick something that fits today." />
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <div className="glass rounded-3xl p-5 sm:p-6">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search workouts..."
              className="w-full rounded-2xl border border-input bg-card/70 py-3 pl-11 pr-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/20" />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <FilterGroup label="Level" value={level} setValue={setLevel} options={LEVELS} />
            <FilterGroup label="Where" value={place} setValue={setPlace} options={PLACES} />
            <FilterGroup label="Type" value={type} setValue={setType} options={TYPES} />
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">{filtered.length} workouts</p>
        <div className="mt-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((w) => (
            <article key={w.name} className="glass group rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-elegant">
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-elegant">
                  <Dumbbell className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">{w.level}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{w.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{w.desc}</p>
              <div className="mt-4 flex items-center gap-4 border-t border-border/60 pt-4 text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground"><Timer className="h-4 w-4 text-primary" />{w.duration} min</span>
                <span className="flex items-center gap-1.5 text-muted-foreground"><Flame className="h-4 w-4 text-primary" />~{w.calories} kcal</span>
                <span className="ml-auto rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase text-muted-foreground">{w.place} · {w.type}</span>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full glass rounded-3xl p-10 text-center text-muted-foreground">No workouts match your filters.</div>
          )}
        </div>
      </div>
    </>
  );
}

function FilterGroup<T extends string>({ label, value, setValue, options }: { label: string; value: T; setValue: (v: T) => void; options: readonly T[] }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button key={o} onClick={() => setValue(o)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${value === o ? "gradient-primary text-primary-foreground" : "border border-border hover:bg-accent"}`}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
