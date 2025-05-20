import { budgetInterface } from "../../types/global";
import PieChart from "../ui/PieChart";

interface BudgetSpendingSummaryCardProp {
  budgets: budgetInterface[];
}

const BudgetSpendingSummaryCard: React.FC<BudgetSpendingSummaryCardProp> = ({
  budgets,
}) => {
  return (
    <div className="bg-white px-6 rounded-xl my-2 lg:my-0 pb-1 lg:pb-0 md:py-8 lg:py-4 shadow-sm">
      <div className="md:flex md:items-center md:justify-between lg:flex-col lg:justify-center">
        <div className="my-4 lg:my-0 pt-8 md:pt-0 mx-auto md:mx-0 lg:mx-auto md:w-6/12 lg:w-7/12">
          <PieChart amount={338} limit={975} />
        </div>
        <div className="md:w-6/12 lg:w-full">
          <h1 className="text-base md:text-xl font-bold">Spending Summary</h1>
          <div className="">
            {budgets.map((budget, index) => (
              <div
                key={index}
                className={`flex justify-between my-2 ${
                  index !== 3 ? "border-b border-ch-grey/0.15" : ""
                }  py-2 md:py-3`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`bg-${budget.theme} h-6 md:h-5 w-1 rounded-md`}
                  ></div>
                  <h1 className="text-ch-grey text-sm font-normal">
                    {budget.category}
                  </h1>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-base font-bold">
                    {"$" + budget.amount_spent?.toFixed(2)}{" "}
                    <span className="text-ch-grey text-sm font-normal">
                      &nbsp; of {"$" + budget.maximum.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSpendingSummaryCard;
