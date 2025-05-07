import { useState } from "react";
import { CardHeader } from "../layout";
import { ProgressBar } from "../global";
import { Button } from "../ui/Button/Button";

interface PotCardProps {
  title: string;
  progressColor: string;
  target: number;
  total: number;
}

const PotCard: React.FC<PotCardProps> = ({
  title,
  progressColor,
  target,
  total,
}) => {
  const [popOpen, setPopOpen] = useState<boolean>(false);
  const percentage = (total / target) * 100;
  return (
    <div className="bg-white px-6 rounded-xl my-2 lg:my-0 pb-1 lg:pb-0 md:py-8 lg:py-4 shadow-sm">
      <CardHeader
        progressColor={progressColor}
        title={title}
        popOpen={popOpen}
        setPopOpen={setPopOpen}
        type="pot"
        onEdit={() => {}}
        onDelete={() => {}}
      />
      <div className="mt-3">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="text-sm text-ch-grey font-normal">Total Saved</h1>
          </div>
          <div>
            <h2 className="text-3xl font-bold">{"$" + total.toFixed(2)}</h2>
          </div>
        </div>
        <ProgressBar
          value={percentage}
          innerHeight="h-2"
          height="h-2"
          progressColor={progressColor}
          backgroundColor="bg-ch-beige"
        />
        <div className="flex justify-between items-center my-3">
          <div>
            <h3 className="text-xs font-bold text-ch-grey">
              {title === "Savings"
                ? percentage.toFixed(2)
                : percentage.toFixed(1) + "%"}
            </h3>
          </div>
          <div>
            <h4 className="text-xs font-normal text-ch-grey">
              Target of {"$" + target}
            </h4>
          </div>
        </div>
        <div className="flex justify-between items-center space-x-3 my-10">
          <Button className="font-bold" size="sm" variant='secondary'>+ Add Money</Button>
          <Button className="font-bold" size="sm" variant='secondary'>Withdraw</Button>
        </div>
      </div>
    </div>
  );
};

export default PotCard;
