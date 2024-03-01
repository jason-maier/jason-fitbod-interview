import { ExerciseData, Set } from "../types/types";

export const calculateBrzycki = (weight: number, reps: number) => {
  return Math.round(weight * (36 / (37 - reps)));
};

export const getExerciseData = async (): Promise<ExerciseData[]> => {
  const res = await fetch(
    "https://storage.googleapis.com/fitbod-web-internal/exercises.json"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
};

export const groupSetsByDate = (sets: Set[]) => {
  return sets.reduce((acc: any, set: Set) => {
    const date = new Date(set.date).toLocaleDateString("en-US", {
      timeZone: "UTC",
    });
    if (acc[date]) {
      acc[date].push(set);
    } else {
      acc[date] = [set];
    }
    return acc;
  }, {});
};
