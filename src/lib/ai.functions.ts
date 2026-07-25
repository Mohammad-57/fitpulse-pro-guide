import { createServerFn } from "@tanstack/react-start";
import { callAiText, extractJson } from "./ai.server";
import {
  SYSTEM_PROMPT,
  healthPrompt,
  mealPrompt,
  motivationPrompt,
  planPrompt,
  workoutPrompt,
} from "./ai-prompts";
import type {
  AiHealthRequest,
  AiHealthSummary,
  AiMealPlan,
  AiPlan,
  AiProfile,
  AiWorkout,
  AiWorkoutRequest,
} from "./ai-types";

function readKey() {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("AI service is not configured. Missing API key.");
  return key;
}

async function run<T>(prompt: string): Promise<T> {
  const { text } = await callAiText(readKey(), SYSTEM_PROMPT, prompt);
  const parsed = extractJson<T>(text);
  if (!parsed) throw new Error("The AI returned an unreadable response. Please try regenerating.");
  return parsed;
}

export const generateAiPlan = createServerFn({ method: "POST" })
  .inputValidator((data: AiProfile) => data)
  .handler(async ({ data }) => run<AiPlan>(planPrompt(data)));

export const generateAiMealPlan = createServerFn({ method: "POST" })
  .inputValidator((data: AiProfile) => data)
  .handler(async ({ data }) => run<AiMealPlan>(mealPrompt(data)));

export const generateAiWorkout = createServerFn({ method: "POST" })
  .inputValidator((data: AiWorkoutRequest) => data)
  .handler(async ({ data }) => run<AiWorkout>(workoutPrompt(data)));

export const generateAiHealthSummary = createServerFn({ method: "POST" })
  .inputValidator((data: AiHealthRequest) => data)
  .handler(async ({ data }) => run<AiHealthSummary>(healthPrompt(data)));

export const generateAiMotivation = createServerFn({ method: "POST" })
  .inputValidator((data: { seed: string }) => data)
  .handler(async ({ data }) =>
    run<{ title: string; message: string }>(motivationPrompt(data.seed)),
  );
