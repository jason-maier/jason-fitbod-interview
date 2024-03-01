export type ExerciseData = {
  id: string;
  name: string;
  muscle: string;
  image: string;
};

export type Set = {
  reps: number;
  weight: number;
  date: Date | number;
};
