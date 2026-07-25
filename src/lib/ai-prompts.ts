import type {
  AiHealthRequest,
  AiProfile,
  AiWorkoutRequest,
} from "./ai-types";

export const SYSTEM_PROMPT =
  "You are FitPulse AI, an expert certified fitness coach and nutritionist. " +
  "Give safe, practical, evidence-based guidance for healthy adults. " +
  "Always reply with ONLY a single valid JSON object matching the requested shape — no prose, no code fences. " +
  "Keep every string short and readable (max ~140 characters). Never give medical diagnoses.";

export function planPrompt(p: AiProfile) {
  return `Create a personalized fitness plan.

Profile:
- Age: ${p.age}
- Gender: ${p.gender}
- Height: ${p.height} cm
- Weight: ${p.weight} kg
- Fitness goal: ${p.goal}
- Activity level: ${p.activity}
- Workout experience: ${p.experience}
- Available workout time: ${p.time} minutes per session

Return JSON:
{
  "workoutPlan": { "title": string, "focus": string, "summary": string },
  "dailyExercises": [{ "name": string, "sets": string, "reps": string, "rest": string, "calories": string }],
  "weeklySchedule": [{ "day": string, "focus": string, "duration": string }],
  "caloriesToBurn": string,
  "waterIntake": string,
  "recovery": [string],
  "motivation": string,
  "weeklyTips": [string]
}
Use 5-7 daily exercises, exactly 7 weekly schedule days (Monday to Sunday), 3-4 recovery points, 4-5 weekly tips.`;
}

export function mealPrompt(p: AiProfile) {
  return `Create a one-day meal plan adapted to the fitness goal "${p.goal}".

Profile: age ${p.age}, gender ${p.gender}, height ${p.height} cm, weight ${p.weight} kg, activity ${p.activity}, goal ${p.goal}.

Return JSON:
{
  "goal": string,
  "breakfast": { "name": string, "items": [string], "calories": string },
  "lunch": { "name": string, "items": [string], "calories": string },
  "dinner": { "name": string, "items": [string], "calories": string },
  "snacks": [{ "name": string, "calories": string }],
  "macros": { "protein": string, "carbs": string, "fats": string, "calories": string },
  "hydration": string
}
Use 3-4 items per meal and 2-3 snacks. Macros must be daily targets in grams with the total daily calories.`;
}

export function workoutPrompt(r: AiWorkoutRequest) {
  return `Generate a single workout routine.

Level: ${r.level}
Goal: ${r.goal}
Location: ${r.place}
Training focus: ${r.focus}
Session length: ${r.minutes} minutes

Return JSON:
{
  "title": string,
  "level": string,
  "type": string,
  "goal": string,
  "warmup": string,
  "exercises": [{ "name": string, "sets": string, "reps": string, "rest": string, "calories": string }],
  "totalCalories": string,
  "cooldown": string,
  "notes": [string]
}
Include 6-8 exercises suitable for the location and level, and 3 notes.`;
}

export function healthPrompt(r: AiHealthRequest) {
  return `Analyze these fitness tracker results and write a health summary.

- BMI: ${r.bmi}
- Daily calorie target: ${r.calories}
- Daily water intake (litres): ${r.water}
- Workouts per week: ${r.workoutsPerWeek}
- Average sleep (hours): ${r.sleep}
- Extra notes: ${r.notes || "none"}

Return JSON:
{
  "healthScore": number (0-100),
  "scoreLabel": string,
  "bmiAnalysis": string,
  "strengths": [string],
  "improvements": [string],
  "recommendations": [string]
}
Use 2-4 strengths, 2-4 improvements, 3-5 recommendations.`;
}

export function motivationPrompt(seed: string) {
  return `Write one fresh, energetic motivational fitness message (2 sentences max, under 220 characters) plus a 2-5 word punchy title. Variation seed: ${seed}.

Return JSON: { "title": string, "message": string }`;
}
