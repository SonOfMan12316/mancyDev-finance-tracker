import React from "react";
import Popover from "../global/Popover";
import { Ellipsis } from "../icons";

interface CardHeaderProps {
  progressColor: string;
  title: string;
  popOpen: boolean;
  setPopOpen: (newState: boolean) => void;
  type: "budget" | "pot";
  onEdit: () => void;
  onDelete: () => void;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  progressColor,
  title,
  popOpen,
  setPopOpen,
  type,
  onEdit,
  onDelete,
}: CardHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-x-2">
        <div className={`w-5 h-5 rounded-full bg-ch-${progressColor}`}></div>
        <h1 className="font-bold text-lg capitalize">{title}</h1>
      </div>
      <Popover trigger={<Ellipsis />} isOpen={popOpen} setIsOpen={setPopOpen}>
        <ul className="py-3.5">
          <li
            onClick={() => {
              onEdit();
            }}
            className="border-b border-ch-light-grey text-sm font-normal text-black cursor-pointer pb-2.5"
          >
            {type === "budget"
              ? "Edit Budget"
              : type === "pot"
                ? "Edit Pots"
                : ""}
          </li>
          <li
            onClick={() => onDelete()}
            className="text-sm font-normal text-ch-red cursor-pointer pt-2.5"
          >
            {type === "budget"
              ? "Delete Budget"
              : type === "pot"
                ? "Delete Pots"
                : ""}
          </li>
        </ul>
      </Popover>
    </div>
  );
};

export default CardHeader;
