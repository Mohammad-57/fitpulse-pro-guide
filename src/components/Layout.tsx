import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Moon, Sun, Menu, X, Flame, ArrowUp, Github } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/bmi", label: "BMI" },
  { to: "/calories", label: "Calories" },
  { to: "/water", label: "Water" },
  { to: "/workouts", label: "Workouts" },
  { to: "/nutrition", label: "Nutrition" },
  { to: "/tips", label: "Tips" },
  { to: "/progress", label: "Progress" },
  { to: "/about", label: "About" },
] as const;

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("fp-theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefers;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("fp-theme", next ? "dark" : "light");
  };
  return { dark, toggle };
}

function Nav() {
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className={`no-print sticky top-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className={`glass flex items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all ${scrolled ? "shadow-elegant" : ""}`}>
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary shadow-elegant">
              <Flame className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">Fit<span className="gradient-text">Pulse</span></span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => {
              const active = pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                    active ? "gradient-primary text-primary-foreground shadow-elegant" : "text-foreground/70 hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/50 hover:bg-accent transition"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="lg:hidden grid h-9 w-9 place-items-center rounded-full border border-border bg-card/50"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden mt-2 glass rounded-2xl p-3 animate-fade-up">
            <div className="grid grid-cols-2 gap-1.5">
              {NAV.map((n) => {
                const active = pathname === n.to;
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    className={`rounded-xl px-3 py-2 text-sm font-medium ${active ? "gradient-primary text-primary-foreground" : "hover:bg-accent"}`}
                  >
                    {n.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="no-print mt-24 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary">
                <Flame className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">Fit<span className="gradient-text">Pulse</span></span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              A premium fitness companion built for clarity, consistency, and real progress. Everything you need — right in your browser.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Tools</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/bmi" className="hover:text-foreground">BMI Calculator</Link></li>
              <li><Link to="/calories" className="hover:text-foreground">Calorie Calculator</Link></li>
              <li><Link to="/water" className="hover:text-foreground">Water Intake</Link></li>
              <li><Link to="/progress" className="hover:text-foreground">Progress Tracker</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Learn</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/workouts" className="hover:text-foreground">Workout Planner</Link></li>
              <li><Link to="/nutrition" className="hover:text-foreground">Nutrition Guide</Link></li>
              <li><Link to="/tips" className="hover:text-foreground">Fitness Tips</Link></li>
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} FitPulse. Built as an academic project.</p>
          <div className="flex items-center gap-3">
            <Github className="h-4 w-4" />
            <span>Made with intent · Not medical advice</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="no-print fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full gradient-primary text-primary-foreground shadow-elegant transition hover:scale-110"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10 hero-bg" />
      <Nav />
      <main>{children}</main>
      <Footer />
      <ScrollTop />
    </div>
  );
}
