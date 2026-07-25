import { useState, type ReactNode } from "react";
import { Copy, Check, RefreshCw, Loader2, Sparkles, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export function AiCard({
  title,
  icon,
  children,
  className = "",
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass rounded-3xl p-5 sm:p-6 animate-fade-up ${className}`}>
      <div className="flex items-center gap-2">
        {icon && (
          <span className="grid h-8 w-8 place-items-center rounded-xl gradient-primary text-primary-foreground">
            {icon}
          </span>
        )}
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      </div>
      <div className="mt-4 text-sm">{children}</div>
    </div>
  );
}

export function AiField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  options?: string[];
}) {
  const base =
    "w-full rounded-2xl border border-input bg-card/70 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/20";
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {options ? (
        <select value={value} onChange={(e) => onChange(e.target.value)} className={base}>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={base}
        />
      )}
    </label>
  );
}

export function AiButton({
  loading,
  onClick,
  children,
  variant = "primary",
}: {
  loading?: boolean;
  onClick: () => void;
  children: ReactNode;
  variant?: "primary" | "ghost";
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={
        variant === "primary"
          ? "inline-flex items-center justify-center gap-2 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
          : "inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition hover:bg-accent disabled:opacity-60"
      }
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
      {children}
    </button>
  );
}

export function AiLoading({ label = "FitPulse AI is thinking" }: { label?: string }) {
  return (
    <div className="glass rounded-3xl p-8 text-center animate-fade-up">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl gradient-primary shadow-elegant">
        <Loader2 className="h-7 w-7 animate-spin text-primary-foreground" />
      </div>
      <p className="mt-4 font-semibold">{label}…</p>
      <p className="mt-1 text-sm text-muted-foreground">Crafting a personalized, science-backed answer.</p>
      <div className="mx-auto mt-6 max-w-md space-y-2.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-3 animate-pulse rounded-full bg-primary/15"
            style={{ width: `${100 - i * 14}%`, animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export function AiError({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="glass rounded-3xl border border-destructive/30 p-6 animate-fade-up">
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-destructive/10 text-destructive">
          <AlertTriangle className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-semibold">AI service unavailable</h3>
          <p className="mt-1 text-sm text-muted-foreground">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-accent"
            >
              <RefreshCw className="h-4 w-4" /> Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function AiResultActions({
  text,
  onRegenerate,
  loading,
}: {
  text: string;
  onRegenerate: () => void;
  loading?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Copy failed — please select the text manually");
    }
  };
  return (
    <div className="no-print flex flex-wrap items-center gap-2">
      <button
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-accent"
      >
        {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied" : "Copy result"}
      </button>
      <button
        onClick={onRegenerate}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-accent disabled:opacity-60"
      >
        <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Regenerate
      </button>
    </div>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {(items ?? []).map((item, i) => (
        <li key={i} className="flex gap-2.5">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ExerciseTable({
  rows,
}: {
  rows: { name: string; sets: string; reps: string; rest: string; calories: string }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wider text-muted-foreground">
            <th className="pb-2 pr-3 font-semibold">Exercise</th>
            <th className="pb-2 pr-3 font-semibold">Sets</th>
            <th className="pb-2 pr-3 font-semibold">Reps</th>
            <th className="pb-2 pr-3 font-semibold">Rest</th>
            <th className="pb-2 font-semibold">Est. kcal</th>
          </tr>
        </thead>
        <tbody>
          {(rows ?? []).map((r, i) => (
            <tr key={i} className="border-t border-border/60">
              <td className="py-2.5 pr-3 font-medium">{r.name}</td>
              <td className="py-2.5 pr-3 text-muted-foreground">{r.sets}</td>
              <td className="py-2.5 pr-3 text-muted-foreground">{r.reps}</td>
              <td className="py-2.5 pr-3 text-muted-foreground">{r.rest}</td>
              <td className="py-2.5 text-muted-foreground">{r.calories}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
