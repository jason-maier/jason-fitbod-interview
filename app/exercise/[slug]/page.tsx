import { getExerciseData } from "@/app/page";
import Image from "next/image";
import "./Exercise.css";
import ExerciseForm from "@/Components/ExerciseForm";
import { ExerciseData } from "@/app/page";

type Set = {
  reps: number;
  weight: number;
};

const Exercise = async ({ params }: { params: { slug: string } }) => {
  const exercises: ExerciseData[] = await getExerciseData();
  const exercise = exercises.find((exercise) => exercise.id === params.slug);

  if (!exercise) {
    return <p>Exercise not found</p>;
  }

  return (
    <main className="min-h-screen">
      <div className="flex flex-col items-center">
        <h1 className="mb-12 mt-8 text-2xl">{exercise.name}</h1>
        <Image
          src={exercise.image}
          alt={exercise.name}
          width={150}
          height={150}
          className="exercise-image mb-8"
        />
      </div>
      <ExerciseForm exerciseSlug={exercise.name} />
    </main>
  );
};

export default Exercise;
