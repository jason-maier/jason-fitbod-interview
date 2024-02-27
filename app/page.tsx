import ExerciseCard from "@/Components/ExerciseCard";
import "./globals.css";

export type Exercise = {
  id: string;
  name: string;
  muscle: string;
  image: string;
};

const getExerciseData = async (): Promise<Exercise[]> => {
  const res = await fetch(
    "https://storage.googleapis.com/fitbod-web-internal/exercises.json"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
};

export default async function Home() {
  const exercises: Exercise[] = await getExerciseData();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1>Top Exercises</h1>
      <div className="flex flex-row flex-wrap exerciseCard-section">
        {exercises.length &&
          (exercises as Exercise[]).map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
      </div>
    </main>
  );
}
