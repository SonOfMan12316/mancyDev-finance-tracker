import React from "react";
import { RightIcon } from "../icons";
import { transactions } from "../../data/transaction";
import { toDMYString } from "../../utils/date";
import budgets from "../../data/data";

interface BudgetCardProps {
  title: string;
  maximum?: number;
  progressBarValue: number;
  progressColor: string;
}

const BudgetCard: React.FC<BudgetCardProps> = ({ title, progressColor }) => {
  const budget = budgets.find((budget) => budget.category === title);
  return (
    <div className="bg-white p-6 rounded-xl lg:my-0 pb-1 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded-full bg-${progressColor}`}></div>
          <h1 className="font-bold text-lg capitalize">{title}</h1>
        </div>
        <div>
          <svg
            width="14"
            height="4"
            viewBox="0 0 14 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.75 2C8.75 2.34612 8.64736 2.68446 8.45507 2.97225C8.26278 3.26003 7.98947 3.48434 7.6697 3.61679C7.34993 3.74924 6.99806 3.7839 6.65859 3.71637C6.31913 3.64885 6.00731 3.48218 5.76256 3.23744C5.51782 2.9927 5.35115 2.68087 5.28363 2.34141C5.2161 2.00194 5.25076 1.65007 5.38321 1.3303C5.51567 1.01053 5.73997 0.737221 6.02775 0.544928C6.31554 0.352636 6.65388 0.25 7 0.25C7.46413 0.25 7.90925 0.434375 8.23744 0.762563C8.56563 1.09075 8.75 1.53587 8.75 2ZM2 0.25C1.65388 0.25 1.31554 0.352636 1.02775 0.544928C0.739967 0.737221 0.515665 1.01053 0.383212 1.3303C0.250758 1.65007 0.216102 2.00194 0.283627 2.34141C0.351151 2.68087 0.517822 2.9927 0.762564 3.23744C1.00731 3.48218 1.31913 3.64885 1.65859 3.71637C1.99806 3.7839 2.34993 3.74924 2.6697 3.61679C2.98947 3.48434 3.26278 3.26003 3.45507 2.97225C3.64737 2.68446 3.75 2.34612 3.75 2C3.75 1.53587 3.56563 1.09075 3.23744 0.762563C2.90925 0.434375 2.46413 0.25 2 0.25ZM12 0.25C11.6539 0.25 11.3155 0.352636 11.0278 0.544928C10.74 0.737221 10.5157 1.01053 10.3832 1.3303C10.2508 1.65007 10.2161 2.00194 10.2836 2.34141C10.3512 2.68087 10.5178 2.9927 10.7626 3.23744C11.0073 3.48218 11.3191 3.64885 11.6586 3.71637C11.9981 3.7839 12.3499 3.74924 12.6697 3.61679C12.9895 3.48434 13.2628 3.26003 13.4551 2.97225C13.6474 2.68446 13.75 2.34612 13.75 2C13.75 1.77019 13.7047 1.54262 13.6168 1.3303C13.5288 1.11798 13.3999 0.925066 13.2374 0.762563C13.0749 0.600061 12.882 0.471156 12.6697 0.383211C12.4574 0.295265 12.2298 0.25 12 0.25Z"
              fill="#B3B3B3"
            />
          </svg>
        </div>
      </div>
      {budget && (
        <>
          <div className="my-4">
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
      <div className="bg-ch-beige px-5 py-5 lg:py-3 my-4 rounded-lg">
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
