import Image from "next/image";
import Link from "next/link";
import { ExerciseData } from "@/app/types/types";
import "./ExerciseCard.css";

interface ExerciseCardProps {
  exercise: ExerciseData;
}

const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  return (
    <div className="ExerciseCard-container flex flex-row">
      <div className="ExerciseCard-main-content flex">
        <Image
          src={exercise.image}
          alt={exercise.name}
          width={60}
          height={60}
          className="ExerciseCard-image mr-6"
        />
        <div className="flex flex-col justify-between">
          <h2 className="font-bold">{exercise.name}</h2>
          <p>{exercise.muscle}</p>
        </div>
      </div>
      <Link href={`/exercise/${exercise.id}`} className="self-center">
        <Image
          src="/arrow.svg"
          alt={`Navigate to ${exercise.name}`}
          width={20}
          height={40}
        />
      </Link>
    </div>
  );
};

export default ExerciseCard;
