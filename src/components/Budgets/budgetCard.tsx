import React, { useState } from "react";
import { RightIcon } from "../icons";
import { toDMYString } from "../../utils/date";
import { CardHeader } from "../layout";
import useUIStore from "../../store/ui-store";
import { budgetInfo, transactionInterface } from "../../types/global";
import { ProgressBar } from "../global";
import { useNavigate } from "react-router-dom";
import EmptyLottie from "../global/EmptyLottie";
import LoadingDots from "../ui/LoadingDots";

interface BudgetCardProps {
  title: string;
  maximum: number;
  amountSpent: number;
  progressBarValue: number;
  progressColor: string;
  onClick?: () => void;
  budget: budgetInfo | null;
  transactions: transactionInterface[];
  getTransactionLoading: boolean;
}

const BudgetCard: React.FC<BudgetCardProps> = ({
  title,
  progressColor,
  maximum,
  amountSpent,
  budget,
  transactions,
  getTransactionLoading,
}) => {
  const { setOpenModal, setSelectedBudget, setSharedTitle } = useUIStore();
  const navigate = useNavigate();

  const [popOpen, setPopOpen] = useState<boolean>(false);
  const filteredTransaction = transactions.filter(
    (transaction) => transaction.category === title
  );

  return (
    <div className="bg-white px-6 rounded-xl lg:my-0 shadow-sm">
      <CardHeader
        progressColor={progressColor}
        title={title}
        popOpen={popOpen}
        setPopOpen={setPopOpen}
        type="budget"
        onEdit={() => {
          setOpenModal({
            type: "edit",
            data: { id: budget?.id, title: title },
          });
          setSelectedBudget(budget);
        }}
        onDelete={() => {
          setOpenModal({
            type: "delete",
            data: { id: budget?.id, title: title },
          });
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
          <div
            className="flex text-ch-grey hover:text-black items-center space-x-2 cursor-pointer"
            onClick={() => {
              navigate("/transactions");
              setSharedTitle(title);
            }}
          >
            <h1 className="text-xs font-normal">See all</h1>
            <RightIcon />
          </div>
        </div>
        {getTransactionLoading ? (
          <LoadingDots />
        ) : filteredTransaction.length > 0 ? (
          filteredTransaction.slice(0, 3).map((txn, index) => (
            <div
              key={txn.id}
              className={`flex justify-between my-2  ${
                index < 2 ? "border-b border-ch-grey/0.15" : ""
              } py-2 lg:py-2.5`}
            >
              <div className="flex items-center md:space-x-4">
                <div className="hidden md:block">
                  <img
                    loading="lazy"
                    className="w-10 h-10 rounded-full"
                    src={txn.avatar}
                    alt={txn.name}
                  />
                </div>
                <h1 className="text-black text-xs font-bold">{txn.name}</h1>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <p className="text-black text-xs font-bold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(txn.amount)}
                </p>
                <span className="text-ch-grey text-xs font-normal">
                  {toDMYString(txn.date)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full text-center pt-9 pb-16">
            <EmptyLottie />
            <span className="text-ch-black text-xs sm:text-sm font-normal ">
              No budget found for this category
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetCard;
