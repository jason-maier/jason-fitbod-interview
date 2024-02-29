"use client";

import { useState } from "react";

type Set = {
  reps: number;
  weight: number;
};

interface ExerciseFormProps {
  exerciseSlug: string;
}

const ExerciseForm = ({ exerciseSlug }: ExerciseFormProps) => {
  const setsFromLocalStorage = localStorage.getItem(exerciseSlug);
  const [sets, setSets] = useState(
    setsFromLocalStorage ? JSON.parse(setsFromLocalStorage) : []
  );

  const onClick = () => {
    const reps = (document.getElementById("reps") as HTMLInputElement).value;
    const weight = (document.getElementById("weight") as HTMLInputElement)
      .value;

    if (!reps || !weight) {
      return;
    }

    const newSet = {
      reps: Number(reps),
      weight: Number(weight),
    };

    setSets([...sets, newSet]);

    (document.getElementById("reps") as HTMLInputElement).value = "";
    (document.getElementById("weight") as HTMLInputElement).value = "";

    localStorage.setItem(exerciseSlug, JSON.stringify(sets));
  };

  return (
    <div>
      <p className="font-bold mb-6">Add set:</p>
      <label>
        Reps
        <input
          type="number"
          id="reps"
          name="reps"
          className="ml-2 mr-4 exercise-input"
        />
      </label>
      <label>
        Weight
        <input
          type="number"
          id="weight"
          name="weight"
          className="ml-2 mr-4 exercise-input"
        />
      </label>
      <button className="exercise-button" onClick={onClick}>
        +
      </button>
    </div>
  );
};

export default ExerciseForm;
