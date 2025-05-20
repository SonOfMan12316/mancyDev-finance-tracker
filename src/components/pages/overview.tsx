import { useNavigate } from "react-router-dom";

import { Layout } from "../layout";
import { addCommasToNumber } from "../../utils/number";
import { RightIcon, SavingIcon } from "../icons";
import { transactions } from "../../data/transaction";
import { toDMYString } from "../../utils/date";
import PieChart from "../ui/PieChart";

const OverView = () => {
  const navigate = useNavigate();

  const figure = [
    {
      name: "Current Balance",
      amount: 4836.0,
    },
    {
      name: "Income",
      amount: 3814.25,
    },
    {
      name: "Expenses",
      amount: 1700.5,
    },
  ];
  const savingsData = [
    {
      name: "Savings",
      amount: 159,
      color: "ch-green",
    },
    {
      name: "Gift",
      amount: 40,
      color: "ch-cyan",
    },
    {
      name: "Concert Tickets",
      amount: 110,
      color: "ch-navy",
    },
    {
      name: "New Laptop",
      amount: 10,
      color: "ch-yellow",
    },
  ];
  const budgetsData = [
    {
      name: "Entertainment",
      amount: 50,
      color: "ch-green",
    },
    {
      name: "Bills",
      amount: 750,
      color: "ch-cyan",
    },
    {
      name: "Dining Out",
      amount: 75,
      color: "ch-yellow",
    },
    {
      name: "Personal Care",
      amount: 100,
      color: "ch-navy",
    },
  ];
  const billsData = [
    {
      name: "Paid Bills",
      amount: 190,
      color: "ch-green",
    },
    {
      name: "Total Upcoming",
      amount: 194.98,
      color: "ch-yellow",
    },
    {
      name: "Due Soon",
      amount: 59.98,
      color: "ch-navy",
    },
  ];

  return (
    <div className="">
      <Layout title="overview">
        <div className="px-4 lg:px-6">
          <div className="md:flex lg:space-x-4 flex-grow flex-shrink space-y-3 md:space-y-0 md:justify-between">
            {figure.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col  justify-center py-5 px-4 md:px-8 rounded-xl md:w-56 lg:w-11/12 xl:w-10/12 ${
                  index === 0 ? "bg-black" : "bg-white"
                }`}
              >
                <h1
                  className={`font-light text-xs md:text-sm ${
                    index === 0 ? "text-white" : "text-black"
                  }`}
                >
                  {item.name}
                </h1>
                <div
                  className={`text-2xl md:text-3xl font-bold my-2 md:my-4 ${
                    index === 0 ? "text-white" : "text-black"
                  }`}
                >
                  {"$" + addCommasToNumber(item.amount.toFixed(2))}
                </div>
              </div>
            ))}
          </div>
          <div className="lg:flex lg:gap-4 lg:mt-6">
            <div className="lg:flex flex-col lg:w-2/4 xl:w-4/6 gap-4">
              <div className="bg-white my-8 px-4 md:px-8 lg:px-6 py-5 md:py-3 lg:my-0 lg:py-6 rounded-xl lg:w-full">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-lg font-bold">Pots</h1>
                  </div>
                  <div
                    onClick={() => navigate("/pots")}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <h1 className="text-xs text-ch-grey">See details</h1>
                    <RightIcon color="#696868" />
                  </div>
                </div>
                <div className="md:flex justify-between">
                  <div className="bg-ch-beige my-2 h-28 flex items-center pl-4 rounded-xl md:w-64">
                    <div className="flex space-x-4 items-center">
                      <div>
                        <SavingIcon color="#277C78" />
                      </div>
                      <div className="pt-3">
                        <h1 className="text-sm text-ch-grey">Total Saved</h1>
                        <div className="my-3 font-bold text-3xl">$850</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 px-2 md:w-7/12">
                    {savingsData.map((saving, index) => (
                      <div key={index} className="flex space-x-3 my-2 ">
                        <div
                          className={`w-1 h-11 rounded-xl bg-${saving.color}`}
                        ></div>
                        <div className="flex flex-col justify-center">
                          <span className="text-ch-grey text-xs whitespace-nowrap">
                            {saving.name}
                          </span>
                          <div className="font-bold my-1">
                            {"$" + saving.amount}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-white my-8 px-4 lg:px-6 md:px-8 pt-6 lg:my-0 relative rounded-xl overflow-hidden">
                <div className="flex justify-between">
                  <div>
                    <h1 className="text-lg font-bold">Transactions</h1>
                  </div>
                  <div
                    onClick={() => navigate("/transactions")}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <h1 className="text-xs text-ch-grey">See details</h1>
                    <RightIcon color="#696868" />
                  </div>
                </div>
                {transactions.slice(0, 5).map((transaction, index) => (
                  <div
                    key={index}
                    className="relative flex justify-between w-full my-3.5"
                  >
                    <div className="flex space-x-5 items-center">
                      <div className="w-8">
                        <img
                          className="rounded-full"
                          src={transaction.avatar}
                        />
                      </div>
                      <h1 className="font-bold text-sm">{transaction.name}</h1>
                    </div>
                    <div className="flex items-center flex-col py-3">
                      <h1
                        className={`font-bold text-sm ${
                          index === 0 || index === 3
                            ? "text-ch-green"
                            : "text-black"
                        }`}
                      >
                        {" "}
                        $
                        {transaction.amount < 0
                          ? `${transaction.amount.toFixed(2)}`
                          : `+${transaction.amount.toFixed(2)}`}
                      </h1>
                      <div className="text-ch-grey text-xs font-normal md:text-sm my-1">
                        {toDMYString(transaction.date)}
                      </div>
                    </div>
                    {index !== 4 && (
                      <div className="absolute left-0 w-full bottom-0">
                        <div className=" border-b border-ch-grey/0.15" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:flex flex-col gap-5 lg:w-2/4">
              <div className="bg-white my-8 px-4 md:px-8 lg:px-6 pt-6 pb-4 lg:my-0 rounded-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-lg font-bold">Budgets</h1>
                  </div>
                  <div
                    onClick={() => navigate("/budgets")}
                    className="flex items-center space-x-3 lg:space-x-2 cursor-pointer"
                  >
                    <h1 className="text-xs text-ch-grey">See details</h1>
                    <RightIcon color="#696868" />
                  </div>
                </div>
                <div className="md:flex md:items-center md:justify-between lg:justify-center">
                  <div className="mt-6 mb-2 md:mt-0 flex justify-center md:w-10/12 lg:w-9/12">
                    <PieChart amount={338} limit={975} />
                  </div>
                  <div className="grid grid-cols-2 md:flex md:flex-col px-2 my-2 md:w-2/12 lg:w-3/12">
                    {budgetsData.map((saving, index) => (
                      <div key={index} className="flex space-x-5 my-2 lg:my-1">
                        <div className="flex flex-col justify-center">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-1 h-11 rounded-xl bg-${saving.color}`}
                            ></div>
                            <div className="flex flex-col pt-2">
                              <h1 className="text-ch-grey text-xs whitespace-nowrap">
                                {saving.name}
                              </h1>
                              <span className="font-bold text-black text-sm py-2">
                                {"$" + saving.amount.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-white mt-8 mb-4 px-4 md:px-8 lg:px-6 py-5 lg:my-0 rounded-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-lg font-bold">Recurring Bills</h1>
                  </div>
                  <div
                    onClick={() => navigate("/recurring-bills")}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <h1 className="text-xs text-ch-grey">See details</h1>
                    <RightIcon />
                  </div>
                </div>
                <div className="flex flex-col px-2 space-y-4 mt-8 mb-4">
                  {billsData.map((bill, index) => (
                    <div key={index}>
                      <div className="bg-ch-beige z-50 relative py-5 rounded-lg px-4 items-center">
                        <div
                          className={`border-l-4 border-${bill.color} w-1.5 h-16 absolute left-0 top-0 rounded-l-full`}
                        ></div>

                        <div className="flex items-center justify-between">
                          <span className="text-ch-grey font-normal text-sm">
                            {bill.name}
                          </span>
                          <span className="font-bold">
                            {" "}
                            {"$" + bill.amount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default OverView;
