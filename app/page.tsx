import ExerciseCard from "@/components/ExerciseCard";
import { ExerciseData } from "./types/types";
import { getExerciseData } from "./utils/utils";
import "./globals.css";

export default async function Home() {
  const exercises: ExerciseData[] = await getExerciseData();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="mb-12 mt-8 text-2xl">Top Exercises</h1>
      <div className="flex flex-row flex-wrap ExerciseCard-section">
        {exercises.length &&
          (exercises as ExerciseData[]).map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
      </div>
    </main>
  );
}
