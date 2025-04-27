import React from "react";
import { Layout } from "../layout";
import PieChart from "../ui/PieChart";
import budgets from "../../data/data";
import BudgetCard from "../Budgets/budgetCard";

interface BudgetProps {
  // Define your props here
}

const Budget: React.FC<BudgetProps> = () => {
  return (
    <Layout title="budgets" displayButton={true} buttonTitle="+ Add New Budget">
      <div className="px-4 lg:px-6">
        <div className="bg-white px-6 md:px-8 rounded-xl my-2 pb-1 shadow-sm">
          <div className="md:flex md:items-center md:justify-between lg:flex-col lg:justify-center">
            <div className="my-4 pt-8 mx-auto md:mx-0 md:w-6/12">
              <PieChart amount={407} limit={975} />
            </div>
            <div className="md:w-6/12">
              <h1 className="text-base md:text-xl font-bold">
                Spending Summary
              </h1>
              <div className="">
                {budgets.map((budget, index) => (
                  <div
                    key={index}
                    className="flex justify-between my-2 lg:my-1 border-b border-ch-light-grey py-2 md:py-3"
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
        <BudgetCard />
      </div>
    </Layout>
  );
};

export default Budget;
