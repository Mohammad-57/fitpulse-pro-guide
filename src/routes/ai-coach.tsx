import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/PageHeader";
import { AiAssistant } from "../components/ai/AiAssistant";
import { AiMealPlanner } from "../components/ai/AiMealPlanner";
import { AiWorkoutGenerator } from "../components/ai/AiWorkoutGenerator";
import { AiHealthSummaryCard } from "../components/ai/AiHealthSummary";
import { AiMotivation } from "../components/ai/AiMotivation";

export const Route = createFileRoute("/ai-coach")({
  head: () => ({
    meta: [
      { title: "AI Fitness Coach — FitPulse" },
      {
        name: "description",
        content:
          "Generate AI workout plans, meal plans, health summaries and daily motivation tailored to your body and goals with FitPulse AI.",
      },
      { property: "og:title", content: "AI Fitness Coach — FitPulse" },
      {
        property: "og:description",
        content: "Personalized AI workout plans, meal plans, health summaries and motivation.",
      },
    ],
  }),
  component: AiCoach,
});

function AiCoach() {
  return (
    <>
      <PageHeader
        eyebrow="Powered by AI"
        title={
          <>
            Your personal <span className="gradient-text">AI fitness coach</span>
          </>
        }
        description="Plans, meals, workouts, health insights and motivation — generated for your body, goal and schedule."
      />
      <div className="mx-auto max-w-7xl space-y-14 px-4 pb-20">
        <AiAssistant />
        <AiMealPlanner />
        <AiWorkoutGenerator />
        <AiHealthSummaryCard />
        <AiMotivation />
        <p className="text-center text-xs text-muted-foreground">
          AI guidance is for general fitness education only and is not medical advice.
        </p>
      </div>
    </>
  );
}
