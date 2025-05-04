import React from "react";
import Popover from "../global/Popover";
import { Ellipsis } from "../icons";
import useUIStore from "../../store/ui-store";
import { budgetInterface } from "../../types/global";

interface CardHeaderProps {
  progressColor: string;
  title: string;
  popOpen: boolean;
  setPopOpen: (newState: boolean) => void;
  budget?: budgetInterface[];
}

const CardHeader: React.FC<CardHeaderProps> = ({
  progressColor,
  title,
  popOpen,
  setPopOpen,
  budget,
}) => {
  const { setOpenModal, setSelectedBudget } = useUIStore();

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-x-2">
        <div className={`w-5 h-5 rounded-full bg-${progressColor}`}></div>
        <h1 className="font-bold text-lg capitalize">{title}</h1>
      </div>
      <Popover trigger={<Ellipsis />} isOpen={popOpen} setIsOpen={setPopOpen}>
        <ul className="py-3.5">
          <li
            onClick={() => {
              const budgetToEdit =
                budget?.find((item) => item.category === title) || null;
              setOpenModal({ type: "edit", data: title });
              setSelectedBudget(budgetToEdit);
            }}
            className="border-b border-ch-light-grey text-sm font-normal text-black cursor-pointer pb-2.5"
          >
            Edit Budget
          </li>
          <li
            onClick={() => setOpenModal({ type: "delete", data: title })}
            className="text-sm font-normal text-ch-red cursor-pointer pt-2.5"
          >
            Delete Budget
          </li>
        </ul>
      </Popover>
    </div>
  );
};

export default CardHeader;
