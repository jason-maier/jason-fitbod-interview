"use client";

import { useEffect, useState } from "react";
import "./ExerciseForm.css";

type Set = {
  reps: number;
  weight: number;
  date: Date;
};

interface ExerciseFormProps {
  exerciseSlug: string;
}

const ExerciseForm = ({ exerciseSlug }: ExerciseFormProps) => {
  const setsFromLocalStorage = localStorage.getItem(exerciseSlug);
  // Purposeful design deviation here to improve accessibility and maintain a controlled component
  const [reps, setReps] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [sets, setSets] = useState(
    setsFromLocalStorage ? JSON.parse(setsFromLocalStorage) : []
  );

  const calculateBrzycki = (weight: number, reps: number) => {
    return Math.round(weight * (36 / (37 - reps)));
  };

  useEffect(() => {
    if (sets.length) {
      localStorage.setItem(exerciseSlug, JSON.stringify(sets));
    }
  }, [sets, exerciseSlug]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "reps") {
      setReps(Number(e.target.value));
    } else {
      setWeight(Number(e.target.value));
    }
  };

  const onClick = () => {
    if (!reps || !weight) {
      return;
    }

    const newSet = {
      reps,
      weight,
      date: new Date().setHours(0, 0, 0, 0),
    };

    setSets([...sets, newSet]);
    setReps(0);
    setWeight(0);
  };

  // group the sets by date property and make an object where each property is a date that has a value of an array of sets
  const setsGroupedByDate = sets.reduce((acc: any, set: Set) => {
    const date = new Date(set.date).toDateString();
    if (acc[date]) {
      acc[date].push(set);
    } else {
      acc[date] = [set];
    }
    return acc;
  }, {});

  return (
    <div className="ExerciseForm-container">
      <p className="font-bold mb-6">Add set:</p>
      <div className="flex mb-8">
        <label>
          Reps
          <input
            type="number"
            id="reps"
            name="reps"
            className="ml-2 mr-4 ExerciseForm-input"
            onChange={handleInputChange}
            value={reps}
          />
        </label>
        <label>
          Weight
          <input
            type="number"
            id="weight"
            name="weight"
            className="ml-2 mr-8 ExerciseForm-input"
            onChange={handleInputChange}
            value={weight}
          />
        </label>
        <button className="ExerciseForm-button" onClick={onClick}>
          +
        </button>
      </div>
      <p className="font-bold mb-8">Performances:</p>
      {sets.length > 0 && (
        <div className="ExerciseForm-performance-section flex flex-row flex-wrap">
          {setsGroupedByDate && (
            <div className="ExerciseForm-date-information mb-6">
              {Object.keys(setsGroupedByDate).map(
                (date: string, index: number) => (
                  <div key={index}>
                    <p className="font-bold mb-6">{date}</p>
                    <div className="flex flex-row flex-wrap">
                      {setsGroupedByDate[date].map(
                        (set: Set, index: number) => (
                          <div
                            className="ExerciseForm-set-information mb-6"
                            key={index}
                          >
                            <span>
                              {set.reps} x {set.weight} lb{" "}
                            </span>
                            <span>
                              <span className="font-bold">Estimated 1RM: </span>
                              {calculateBrzycki(set.weight, set.reps)} lb
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExerciseForm;
