import React, { useState } from "react";
import { RightIcon } from "../icons";
import { transactions } from "../../data/transaction";
import { toDMYString } from "../../utils/date";
import budgets from "../../data/data";
import { CardHeader } from "../layout";

interface BudgetCardProps {
  title: string;
  maximum?: number;
  progressBarValue: number;
  progressColor: string;
  onClick?: () => void;
}

const BudgetCard: React.FC<BudgetCardProps> = ({ title, progressColor }) => {
  const budget = budgets.find((budget) => budget.category === title);

  const [popOpen, setPopOpen] = useState<boolean>(false);
  return (
    <div className="bg-white px-6 rounded-xl lg:my-0 shadow-sm">
      <CardHeader
        progressColor={progressColor}
        title={title}
        popOpen={popOpen}
        setPopOpen={setPopOpen}
        budget={budget ? [budget] : []}
      />
      {budget && (
        <>
          <div className="mb-2.5">
            <h2 className="text-ch-grey text-sm font-normal">
              Maximum of {"$" + budget.maximum?.toFixed(2)}
            </h2>
          </div>
          <div>
            <ProgressBar
              value={Math.ceil(
                ((budget.amount_spent ?? 0) / budget.maximum) * 100
              )}
              progressColor={progressColor}
              height="h-8"
              backgroundColor="bg-ch-beige"
            />
          </div>
          <div className="flex justify-between w-9/12 md:w-3/5 lg:w-9/12 my-3">
            <div className="flex items-center gap-2">
              <div className={`bg-${progressColor} h-11 w-1 rounded-md`}></div>
              <div className="flex flex-col space-y-2">
                <h1 className="text-ch-grey text-xs font-normal">Spent</h1>
                <h1 className="text-black text-sm font-bold">
                  {"$" + budget.amount_spent?.toFixed(2)}
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
                      budget.maximum - (budget.amount_spent ?? 0) < 0
                        ? 0
                        : budget.maximum - (budget.amount_spent ?? 0)
                    )?.toFixed(2)}
                </h1>
              </div>
            </div>
          </div>
        </>
      )}
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
                index !== 2 ? "border-b border-ch-lighter-grey" : ""
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

interface ProgressBarProps {
  value: number;
  height?: string;
  backgroundColor?: string;
  progressColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  height = "",
  backgroundColor = "bg-ch-yellow",
  progressColor = "ch-green",
}) => {
  return (
    <div
      className={`w-full ${height} ${backgroundColor} py-1 rounded-lg overflow-hidden px-1`}
    >
      <div
        className={`bg-${progressColor} h-6 rounded-lg transition-all duration-300`}
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      ></div>
    </div>
  );
};

export default BudgetCard;
