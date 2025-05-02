import React from "react";
import Popover from "../global/Popover";
import { Ellipsis } from "../icons";
import { budgetInterface } from "../../types/global";
import Modal from "../global/Modal";

interface CardHeaderProps {
  progressColor: string;
  title: string;
  popOpen: boolean;
  setPopOpen: (newState: boolean) => void;
  onEdit: (budget: budgetInterface) => void;
  onDelete: () => void;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  progressColor,
  title,
  popOpen,
  setPopOpen,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex justify-between items-center my-1">
      <div className="flex items-center gap-x-2">
        <div className={`w-5 h-5 rounded-full bg-${progressColor}`}></div>
        <h1 className="font-bold text-lg capitalize">{title}</h1>
      </div>
      <Popover trigger={<Ellipsis />} isOpen={popOpen} setIsOpen={setPopOpen}>
        <ul className="py-3.5">
          <li
            onClick={() => onEdit}
            className="border-b border-ch-lighter-grey text-sm font-normal text-black cursor-pointer pb-2.5"
          >
            Edit Budget
          </li>
          <li
            onClick={onDelete}
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
