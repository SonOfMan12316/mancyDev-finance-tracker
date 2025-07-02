import { useState } from "react";
import { CardHeader } from "../layout";
import { Button } from "../ui/Button/Button";
import useUIStore from "../../store/ui-store";
import { potInfo } from "../../types/global";
import PotManagement from "./potManagement";

interface PotCardProps {
  title: string;
  progressColor: string;
  target: number;
  total: number;
  pot: potInfo | null;
}

const PotCard: React.FC<PotCardProps> = ({
  title,
  progressColor,
  target,
  total,
  pot,
}) => {
  const [popOpen, setPopOpen] = useState<boolean>(false);
  const percentage = (total / target) * 100;

  const { setOpenModal, setSelectedPot } = useUIStore();
  return (
    <div className="bg-white px-6 rounded-xl my-2 lg:my-0 pb-1 md:py-8 lg:pt-0 shadow-sm">
      <CardHeader
        progressColor={progressColor}
        title={title}
        popOpen={popOpen}
        setPopOpen={setPopOpen}
        type="pot"
        onEdit={() => {
          setOpenModal({ type: "edit", data: { id: pot?.id, title: title } });
          setSelectedPot(pot);
        }}
        onDelete={() => setOpenModal({
          type: "delete",
          data: { id: pot?.id, title: title },
        })}
      />
      <div className="mt-3">
        <PotManagement
          title={title}
          total={total}
          target={target}
          progressColor={progressColor}
          targetReachedPercentage={percentage}
        />
        <div className="flex justify-between items-center space-x-3 mt-8 md:mb-0 mb-8">
          <Button
            onClick={() => {
              setOpenModal({ type: "addMoney", data: {title: title} });
              setSelectedPot(pot);
            }}
            className="font-bold"
            size="sm"
            variant="secondary"
          >
            + Add Money
          </Button>
          <Button
            onClick={() => {
              setOpenModal({ type: "withdraw", data: {title: title} });
              setSelectedPot(pot);
            }}
            className="font-bold"
            size="sm"
            variant="secondary"
          >
            Withdraw
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PotCard;
