type Exercise = {
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
  const exercises = await getExerciseData();

  console.log(exercises, "<<<< EXERCISES");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {exercises &&
        (exercises as Exercise[]).map((exercise) => (
          <div key={exercise.id}>{exercise.name}</div>
        ))}
    </main>
  );
}
