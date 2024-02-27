"use client";

type Set = {
  reps: number;
  weight: number;
};

interface ExerciseFormProps {
  exerciseSlug: string;
  sets: Set[];
  setSets: (sets: Set[]) => void;
}

const ExerciseForm = ({ exerciseSlug, sets, setSets }: ExerciseFormProps) => {
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
