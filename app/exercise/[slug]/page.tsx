"use client";

import { getExerciseData } from "@/app/page";
import Image from "next/image";
import "./Exercise.css";
import ExerciseForm from "@/Components/ExerciseForm";
import { useState } from "react";

type Set = {
  reps: number;
  weight: number;
};

const Exercise = ({ params }: { params: { slug: string } }) => {
  const setsFromLocalStorage = localStorage.getItem(params.slug);
  const [sets, setSets] = useState(
    setsFromLocalStorage ? JSON.parse(setsFromLocalStorage) : []
  );

  // GET EXERCISE DATA FROM ELSEWHERE NOW THAT THIS IS A DYNAMIC ROUTE

  const exercise = exercises.find((exercise) => exercise.id === params.slug);

  if (!exercise) {
    return <p>Exercise not found</p>;
  }

  console.log(sets, "<<<< SETS");

  return (
    <main className="min-h-screen">
      <div className="flex flex-col items-center">
        <h1 className="mb-12 mt-8 text-2xl">{exercise.name}</h1>
        <Image
          src={exercise.image}
          alt={exercise.name}
          width={150}
          height={150}
          className="exercise-image"
        />
      </div>
      <div>
        <ExerciseForm
          handleClick={handleClick}
          sets={sets}
          setSets={setSets}
          exerciseSlug={exercise.name}
        />
        <p className="font-bold mb-8 mt-8">Performances:</p>
      </div>
    </main>
  );
};

export default Exercise;
