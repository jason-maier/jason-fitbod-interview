import { Set } from "../types/types";

export const calculateBrzycki = (weight: number, reps: number) => {
  return Math.round(weight * (36 / (37 - reps)));
};

export const groupSetsByDate = (sets: Set[]) => {
  return sets.reduce((acc: any, set: Set) => {
    const date = new Date(set.date).toDateString();
    if (acc[date]) {
      acc[date].push(set);
    } else {
      acc[date] = [set];
    }
    return acc;
  }, {});
};
