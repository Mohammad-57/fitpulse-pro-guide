export type AiProfile = {
  age: string;
  gender: string;
  height: string;
  weight: string;
  goal: string;
  activity: string;
  experience: string;
  time: string;
};

export type AiPlan = {
  workoutPlan: { title: string; focus: string; summary: string };
  dailyExercises: { name: string; sets: string; reps: string; rest: string; calories: string }[];
  weeklySchedule: { day: string; focus: string; duration: string }[];
  caloriesToBurn: string;
  waterIntake: string;
  recovery: string[];
  motivation: string;
  weeklyTips: string[];
};

export type AiMealPlan = {
  goal: string;
  breakfast: { name: string; items: string[]; calories: string };
  lunch: { name: string; items: string[]; calories: string };
  dinner: { name: string; items: string[]; calories: string };
  snacks: { name: string; calories: string }[];
  macros: { protein: string; carbs: string; fats: string; calories: string };
  hydration: string;
};

export type AiWorkout = {
  title: string;
  level: string;
  type: string;
  goal: string;
  warmup: string;
  exercises: { name: string; sets: string; reps: string; rest: string; calories: string }[];
  totalCalories: string;
  cooldown: string;
  notes: string[];
};

export type AiHealthSummary = {
  healthScore: number;
  scoreLabel: string;
  bmiAnalysis: string;
  strengths: string[];
  improvements: string[];
  recommendations: string[];
};

export type AiWorkoutRequest = {
  level: string;
  goal: string;
  place: string;
  focus: string;
  minutes: string;
};

export type AiHealthRequest = {
  bmi: string;
  calories: string;
  water: string;
  workoutsPerWeek: string;
  sleep: string;
  notes: string;
};
