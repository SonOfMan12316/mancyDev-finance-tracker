import React, { useState } from "react";
import { RightIcon } from "../icons";
import { transactions } from "../../data/transaction";
import { toDMYString } from "../../utils/date";
import { CardHeader } from "../layout";
import useUIStore from "../../store/ui-store";
import { budgetInterface } from "../../types/global";
import { ProgressBar } from "../global";
// import Progress

interface BudgetCardProps {
  title: string;
  maximum: number;
  amountSpent: number;
  progressBarValue: number;
  progressColor: string;
  onClick?: () => void;
  budget: budgetInterface | null;
}

const BudgetCard: React.FC<BudgetCardProps> = ({
  title,
  progressColor,
  maximum,
  amountSpent,
  budget,
}) => {
  const { setOpenModal, setSelectedBudget } = useUIStore();

  const [popOpen, setPopOpen] = useState<boolean>(false);
  return (
    <div className="bg-white px-6 rounded-xl lg:my-0 shadow-sm">
      <CardHeader
        progressColor={progressColor}
        title={title}
        popOpen={popOpen}
        setPopOpen={setPopOpen}
        type="budget"
        onEdit={() => {
          setOpenModal({ type: "edit", data: title });
          setSelectedBudget(budget);
        }}
        onDelete={() => {
          setOpenModal({ type: "delete", data: title });
        }}
      />
      <>
        <div className="mb-2.5">
          <h2 className="text-ch-grey text-sm font-normal">
            Maximum of {"$" + maximum?.toFixed(2)}
          </h2>
        </div>
        <div>
          <ProgressBar
            value={Math.ceil((amountSpent / maximum) * 100)}
            progressColor={progressColor}
            height="h-8"
            innerHeight="h-6"
            backgroundColor="bg-ch-beige"
          />
        </div>
        <div className="flex justify-between w-9/12 md:w-3/5 lg:w-9/12 my-3">
          <div className="flex items-center gap-2">
            <div className={`bg-${progressColor} h-11 w-1 rounded-md`}></div>
            <div className="flex flex-col space-y-2">
              <h1 className="text-ch-grey text-xs font-normal">Spent</h1>
              <h1 className="text-black text-sm font-bold">
                {"$" + amountSpent.toFixed(2)}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`bg-ch-beige h-11 w-1 rounded-md`}></div>
            <div className="flex flex-col space-y-2">
              <h1 className="text-ch-grey text-xs font-normal">Remaining</h1>
              <h1 className="text-black text-sm font-bold">
                {"$" +
                  Math.ceil(
                    maximum - amountSpent < 0 ? 0 : maximum - (amountSpent ?? 0)
                  )?.toFixed(2)}
              </h1>
            </div>
          </div>
        </div>
      </>
      <div className="bg-ch-beige px-5 py-5 lg:pt-4 lg:py-0 my-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-base font-bold">Latest spending</h1>
          </div>
          <div className="flex text-ch-grey items-center space-x-2">
            <h1 className="text-xs font-normal">See all</h1>
            <RightIcon />
          </div>
        </div>
        {transactions
          .filter((transaction) => transaction.category === title)
          .slice(0, 3)
          .map((txn, index) => (
            <div
              key={index}
              className={`flex justify-between my-2  ${
                index !== 2 ? "border-b border-ch-grey/0.15" : ""
              } py-2 lg:py-2.5`}
            >
              <div className="flex items-center md:space-x-4">
                <div className="hidden md:block">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={txn.avatar}
                    alt={txn.name}
                  />
                </div>
                <h1 className="text-black text-xs font-bold">{txn.name}</h1>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <p className="text-black text-xs font-bold">
                  {"$" + txn.amount?.toFixed(2)}{" "}
                </p>
                <span className="text-ch-grey text-xs font-normal">
                  {toDMYString(txn.date)}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BudgetCard;
