import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity, Apple, Droplets, Dumbbell, Flame, HeartPulse, LineChart, Sparkles, Timer, Trophy, Users, Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FitPulse — Your Premium Fitness Companion" },
      { name: "description", content: "Calculate BMI, calories, water intake. Plan workouts, track progress, and get expert nutrition tips — all in one beautifully simple dashboard." },
      { property: "og:title", content: "FitPulse — Your Premium Fitness Companion" },
      { property: "og:description", content: "Calculate BMI, calories, water intake. Plan workouts, track progress, and get expert nutrition tips — all in one beautifully simple dashboard." },
    ],
  }),
  component: Home,
});

const FEATURES = [
  { icon: HeartPulse, title: "Smart BMI Analysis", desc: "Instant body-mass insights with actionable health guidance." },
  { icon: Flame, title: "Calorie Intelligence", desc: "Personalized daily calories based on goals & activity." },
  { icon: Droplets, title: "Hydration Coach", desc: "Know exactly how much water your body needs." },
  { icon: Dumbbell, title: "Workout Planner", desc: "Beginner to advanced — home or gym, curated for you." },
  { icon: Apple, title: "Nutrition Guide", desc: "Whole-food meal ideas with macros that make sense." },
  { icon: LineChart, title: "Progress Tracker", desc: "Visualize weight, sleep, water & workouts weekly." },
];

const WHY = [
  { icon: Zap, title: "Zero Setup", desc: "No accounts, no downloads. Open and use instantly." },
  { icon: Sparkles, title: "Premium Feel", desc: "Glassmorphism UI with delightful micro-interactions." },
  { icon: Timer, title: "Blazing Fast", desc: "Optimized for mobile, tablet, and desktop." },
  { icon: Trophy, title: "Goal Focused", desc: "Every tool is designed to move you forward." },
];

const STATS = [
  { value: "9", label: "Focused Tools" },
  { value: "40+", label: "Workouts" },
  { value: "100%", label: "In-Browser" },
  { value: "0", label: "Ads or Tracking" },
];

const TIPS = [
  { title: "Sleep 7–9 hours", desc: "Recovery is where progress actually happens." },
  { title: "Walk 8k steps", desc: "The most underrated fat-loss lever, daily." },
  { title: "Protein at every meal", desc: "0.8–1g per lb bodyweight keeps muscle intact." },
];

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 pt-8 pb-16 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Activity className="h-3.5 w-3.5" /> Personal Fitness Dashboard
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl">
              Train smarter.<br />
              <span className="gradient-text">Live stronger.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              FitPulse puts every essential fitness tool in one elegant place — from calculators to workout plans, nutrition, and progress tracking. No fluff, just results.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/progress" className="inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:scale-[1.02]">
                Start tracking <Trophy className="h-4 w-4" />
              </Link>
              <Link to="/workouts" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold hover:bg-accent transition">
                Explore workouts <Dumbbell className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[0,1,2,3].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full gradient-primary ring-2 ring-background" style={{ opacity: 1 - i * 0.15 }} />
                ))}
              </div>
              <span><Users className="mr-1 inline h-4 w-4" /> Built for real people, not fitness models.</span>
            </div>
          </div>
          <div className="relative animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <div className="absolute -inset-8 -z-10 rounded-[3rem] gradient-primary opacity-20 blur-3xl" />
            <div className="glass-strong rounded-3xl p-6 shadow-elegant">
              <div className="grid grid-cols-2 gap-4">
                <StatCard icon={HeartPulse} label="Resting HR" value="62 bpm" trend="Healthy" />
                <StatCard icon={Flame} label="Today" value="1,842 kcal" trend="On target" />
                <StatCard icon={Droplets} label="Water" value="2.4 / 3.0 L" trend="80%" />
                <StatCard icon={LineChart} label="Weekly" value="+4 workouts" trend="Streak 3w" />
              </div>
              <div className="mt-4 rounded-2xl bg-gradient-to-br from-primary to-primary-glow p-5 text-primary-foreground">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider opacity-80">Goal completion</p>
                    <p className="mt-1 text-3xl font-bold">78%</p>
                  </div>
                  <div className="relative h-16 w-16">
                    <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
                      <circle cx="18" cy="18" r="16" fill="none" stroke="white" strokeWidth="3" strokeDasharray={`${(78/100)*100.5} 100.5`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 grid place-items-center text-xs font-bold">78%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="glass grid grid-cols-2 gap-6 rounded-3xl p-6 sm:p-8 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold gradient-text sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 pt-24">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Features</span>
          <h2 className="mt-2 text-4xl font-bold sm:text-5xl">Everything you need, <span className="gradient-text">nothing you don't</span></h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Nine focused tools, one clean dashboard.</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div key={f.title} className="glass group rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-elegant" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-elegant transition group-hover:scale-110">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-4 pt-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Why FitPulse</span>
            <h2 className="mt-2 text-4xl font-bold sm:text-5xl">Designed for <span className="gradient-text">consistent action</span></h2>
            <p className="mt-4 text-muted-foreground">Most fitness apps are noisy. FitPulse is the opposite: a calm, focused surface that removes friction between you and your habits.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {WHY.map((w) => (
              <div key={w.title} className="glass rounded-2xl p-5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <w.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-semibold">{w.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips preview */}
      <section className="mx-auto max-w-7xl px-4 pt-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Fitness Tips</span>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Quick wins you can start today</h2>
          </div>
          <Link to="/tips" className="text-sm font-semibold text-primary hover:underline">All tips →</Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {TIPS.map((t) => (
            <div key={t.title} className="glass rounded-3xl p-6 hover:shadow-elegant transition">
              <Sparkles className="h-6 w-6 text-primary" />
              <h3 className="mt-3 text-lg font-semibold">{t.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-24 max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-[2rem] gradient-primary p-10 text-center text-primary-foreground shadow-elegant sm:p-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <h2 className="relative text-3xl font-bold sm:text-5xl">Your best shape is one click away.</h2>
          <p className="relative mx-auto mt-3 max-w-xl opacity-90">Open a calculator, plan a workout, log your day. FitPulse makes it effortless.</p>
          <Link to="/bmi" className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-primary shadow-lg transition hover:scale-[1.03]">
            Try the BMI Calculator <HeartPulse className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, trend }: { icon: any; label: string; value: string; trend: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/70 p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground"><Icon className="h-3.5 w-3.5 text-primary" />{label}</div>
      <p className="mt-2 text-lg font-bold">{value}</p>
      <p className="text-xs text-primary">{trend}</p>
    </div>
  );
}
