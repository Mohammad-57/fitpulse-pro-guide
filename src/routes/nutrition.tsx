import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/PageHeader";
import { Apple, Coffee, Utensils, Moon, Cookie, Beef, Wheat, Nut, Leaf, Droplets } from "lucide-react";

export const Route = createFileRoute("/nutrition")({
  head: () => ({
    meta: [
      { title: "Nutrition Guide — FitPulse" },
      { name: "description", content: "Balanced meal ideas, macro guidance, and hydration tips — breakfast to dinner." },
      { property: "og:title", content: "Nutrition Guide — FitPulse" },
      { property: "og:description", content: "Balanced meal ideas and macro guidance." },
    ],
  }),
  component: Nutrition,
});

const SECTIONS = [
  { icon: Coffee, title: "Healthy Breakfast", items: ["Oats with berries & Greek yogurt", "Veggie omelette with whole-grain toast", "Overnight chia with banana", "Smoothie: spinach, banana, whey"] },
  { icon: Utensils, title: "Lunch", items: ["Grilled chicken, rice & vegetables", "Chickpea salad bowl", "Salmon with quinoa & greens", "Turkey wrap with hummus"] },
  { icon: Moon, title: "Dinner", items: ["Baked fish, sweet potato, broccoli", "Stir-fried tofu with brown rice", "Lean beef with roasted veggies", "Lentil soup with whole-grain bread"] },
  { icon: Cookie, title: "Smart Snacks", items: ["Apple + peanut butter", "Greek yogurt + honey", "Handful of almonds", "Cottage cheese & fruit"] },
  { icon: Beef, title: "Protein Sources", items: ["Chicken, turkey, lean beef", "Fish, eggs, dairy", "Tofu, tempeh, lentils, beans", "Whey / plant protein shakes"] },
  { icon: Wheat, title: "Smart Carbohydrates", items: ["Oats, quinoa, brown rice", "Sweet potatoes, potatoes", "Whole-grain bread & pasta", "Fresh fruits"] },
  { icon: Nut, title: "Healthy Fats", items: ["Avocado, olive oil", "Nuts & seeds", "Fatty fish (salmon, sardines)", "Nut butters"] },
  { icon: Leaf, title: "Vitamins & Minerals", items: ["Leafy greens: iron & folate", "Citrus: vitamin C", "Eggs & dairy: B12 & calcium", "Nuts & seeds: magnesium & zinc"] },
];

function Nutrition() {
  return (
    <>
      <PageHeader eyebrow="Guide" title={<>Eat to <span className="gradient-text">perform & recover</span></>} description="Simple, whole-food ideas that make consistency easy." />
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s) => (
            <div key={s.title} className="glass rounded-3xl p-6 hover:shadow-elegant transition">
              <div className="grid h-11 w-11 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-elegant">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {s.items.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 glass rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-elegant">
              <Droplets className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold">Hydration Tips</h3>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["Start the day with a glass of water", "Keep a bottle within reach", "Add lemon or mint for variety", "Drink more during workouts"].map((t) => (
              <div key={t} className="rounded-2xl border border-border/60 bg-card/50 p-4 text-sm">
                <Apple className="mb-2 h-4 w-4 text-primary" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
