import { ProgressBar } from "../global";

interface potManagementProps {
  title: string;
  total: number;
  target: number;
  percentage: number;
  progressColor: string;
}

const PotManagement: React.FC<potManagementProps> = ({
  title,
  total,
  target,
  percentage,
  progressColor,
}) => {
  return (
    <>
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
    </>
  );
};

export default PotManagement;
