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
      <div className="px-6 py-4 flex flex-col lg:grid lg:grid-cols-2 gap-4">
        <div className="bg-white px-6 rounded-xl my-2 lg:my-0 pb-1 lg:pb-0 md:py-8 lg:py-4 shadow-sm">
          <div className="md:flex md:items-center md:justify-between lg:flex-col lg:justify-center">
            <div className="my-4 lg:my-0 pt-8 md:pt-0 mx-auto md:mx-0 lg:mx-auto md:w-6/12 lg:w-7/12">
              <PieChart amount={338} limit={975} />
            </div>
            <div className="md:w-6/12 lg:w-full">
              <h1 className="text-base md:text-xl font-bold">
                Spending Summary
              </h1>
              <div className="">
                {budgets.map((budget, index) => (
                  <div
                    key={index}
                    className={`flex justify-between my-2 ${
                      index !== 3 ? "border-b border-ch-light-grey" : ""
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
        <BudgetCard
          title="Entertainment"
          progressBarValue={50}
          progressColor="ch-green"
        />
        <BudgetCard
          title="Bills"
          progressBarValue={75}
          progressColor="ch-cyan"
        />
        <div>
          <BudgetCard
            title="Dining Out"
            progressBarValue={100}
            progressColor="ch-yellow"
          />
        </div>
        <div>
          <BudgetCard
            title="Personal Care"
            progressBarValue={60}
            progressColor="ch-navy"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Budget;
