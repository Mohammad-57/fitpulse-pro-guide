import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/PageHeader";
import { Target, Award, Layers, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About FitPulse — Project Overview" },
      { name: "description", content: "FitPulse project overview: objectives, benefits, and the modern web technologies powering it." },
      { property: "og:title", content: "About FitPulse — Project Overview" },
      { property: "og:description", content: "Objectives, benefits, and tech stack." },
    ],
  }),
  component: About,
});

const OBJECTIVES = [
  "Provide instant, calculator-driven fitness insights in one place.",
  "Design a modern, glassmorphic UI that works flawlessly on any device.",
  "Demonstrate clean component architecture with type-safe routing.",
  "Ship without a backend — everything runs client-side.",
];

const BENEFITS = [
  "No accounts, no downloads, no ads.",
  "Fast, accessible, and mobile-friendly.",
  "Dark & light modes for any environment.",
  "Printable / PDF-ready fitness reports.",
];

const TECH = [
  { name: "React 19", desc: "Modern UI library" },
  { name: "TanStack Router", desc: "Type-safe file-based routing" },
  { name: "Tailwind CSS v4", desc: "Design-token driven styling" },
  { name: "TypeScript", desc: "Type-safe development" },
  { name: "Vite", desc: "Fast dev & build tooling" },
  { name: "Lucide Icons", desc: "Consistent iconography" },
];

function About() {
  return (
    <>
      <PageHeader eyebrow="About" title={<>The <span className="gradient-text">FitPulse</span> project</>} description="A premium in-browser fitness dashboard built as a university software engineering assignment." />
      <div className="mx-auto max-w-6xl px-4 pb-16 space-y-8">
        <div className="glass rounded-3xl p-6 sm:p-10">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-elegant"><Layers className="h-5 w-5" /></div>
            <h2 className="text-2xl font-bold">Project Overview</h2>
          </div>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            FitPulse is a personal fitness dashboard that brings together the essential tools people actually use: BMI, calorie, and water calculators, a workout planner, nutrition guide, fitness tips, and a progress tracker. It's designed with a premium glassmorphism aesthetic and a warm red-and-white palette to feel motivating without being loud. Every interaction happens in the browser — no accounts, no databases, no dependencies on external services.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-elegant"><Target className="h-5 w-5" /></div>
              <h2 className="text-xl font-bold">Objectives</h2>
            </div>
            <ul className="mt-4 space-y-3">
              {OBJECTIVES.map((o) => (
                <li key={o} className="flex gap-3 text-sm"><CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />{o}</li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-elegant"><Award className="h-5 w-5" /></div>
              <h2 className="text-xl font-bold">Benefits</h2>
            </div>
            <ul className="mt-4 space-y-3">
              {BENEFITS.map((o) => (
                <li key={o} className="flex gap-3 text-sm"><CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />{o}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 sm:p-10">
          <h2 className="text-2xl font-bold">Technologies Used</h2>
          <p className="mt-1 text-sm text-muted-foreground">A modern, production-grade stack.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TECH.map((t) => (
              <div key={t.name} className="rounded-2xl border border-border/60 bg-card/60 p-5">
                <p className="text-sm font-semibold gradient-text">{t.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
