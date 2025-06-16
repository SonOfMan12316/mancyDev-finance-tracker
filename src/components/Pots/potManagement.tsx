import { ProgressBar } from "../global";
import { useMemo } from "react";

interface potManagementProps {
  title: string;
  total: number;
  target: number;
  targetReachedPercentage: number;
  percentageChange?: number;
  amountToAdd?: number;
  amountToWithdraw?: number;
  progressColor: string;
  calculatedProgressColor?: string;
  modalCardHeader?: string;
}

const PotManagement: React.FC<potManagementProps> = ({
  title,
  total,
  target,
  targetReachedPercentage,
  percentageChange,
  amountToAdd,
  amountToWithdraw,
  progressColor,
  calculatedProgressColor,
  modalCardHeader,
}) => {
  const totalPercentage = useMemo(() => {
    if (amountToAdd && percentageChange) {
      return targetReachedPercentage + percentageChange;
    } else if (amountToWithdraw && percentageChange) {
      return targetReachedPercentage - percentageChange;
    }
    return targetReachedPercentage;
  }, [targetReachedPercentage, percentageChange]);
  return (
    <>
      <div className="flex justify-between items-center mt-6 mb-3">
        <div>
          <h1 className="text-sm text-ch-grey font-medium">
            {modalCardHeader ? modalCardHeader : "Total Saved"}
          </h1>
        </div>
        <div>
          <h2 className="text-3xl font-bold">{"$" + total.toFixed(2)}</h2>
        </div>
      </div>
      <ProgressBar
        value={
          amountToAdd
            ? targetReachedPercentage
            : targetReachedPercentage - (percentageChange ?? 0)
        }
        secondValue={percentageChange || 0}
        innerHeight="h-2"
        height="h-2"
        progressColor={progressColor}
        calculatedProgressColor={calculatedProgressColor}
        backgroundColor="bg-ch-beige"
      />
      <div className="flex justify-between items-center my-3">
        <div>
          <h3
            className={`text-xs font-bold ${
              amountToWithdraw && "text-ch-red"
            } text-ch-grey`}
          >
            {title === "Savings"
              ? totalPercentage?.toFixed(2) + "%"
              : totalPercentage?.toFixed(1) + "%"}
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
