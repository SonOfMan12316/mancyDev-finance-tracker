import {
  addCommasToNumber,
  addPlusSignToNonNegativeNumber,
} from "../../utils/number";
import { Line, RightIcon, SavingIcon } from "../icons";
// const { transaction }
import transactions from "../../data/transaction";
import { toDMYString } from "../../utils/date";

const OverView = () => {
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
      name: "Outfit",
      amount: 159,
      color: "ch-green",
    },
    {
      name: "Gift",
      amount: 40,
      color: "ch-cyan",
    },
    {
      name: "Concert",
      amount: 110,
      color: "ch-navy",
    },
    {
      name: "New Laptop",
      amount: 10,
      color: "ch-yellow",
    },
  ];

  return (
    <div className="bg-ch-beige">
      <div className="p-4">
        <h1 className="text-3xl font-extrabold">Overview</h1>
        {figure.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col justify-center mt-3 py-5 px-4 rounded-xl ${
              index === 0 ? "bg-black" : "bg-white"
            }`}
          >
            <h1
              className={`font-light text-xs ${
                index === 0 ? "text-white" : "text-black"
              }`}
            >
              {item.name}
            </h1>
            <div
              className={`text-2xl font-bold my-2 ${
                index === 0 ? "text-white" : "text-black"
              }`}
            >
              {"$" + addCommasToNumber(item.amount.toFixed(2))}
            </div>
          </div>
        ))}
        <div className="bg-white my-8 px-4 py-5 rounded-xl">
          <div className="flex justify-between">
            <div>
              <h1 className="text-lg font-bold">Pots</h1>
            </div>
            <div className="flex items-center space-x-3">
              <h1 className="text-xs text-ch-grey">See details</h1>
              <RightIcon color="#696868" />
            </div>
          </div>
          <div className="bg-ch-beige my-2 py-5 px-4 rounded-xl">
            <div className="flex items-center">
              <SavingIcon color="#277C78" />
              <div>
                <h1 className="text-xs text-ch-grey">Total Saved</h1>
                <div className="my-3 font-bold text-2xl">$850</div>
              </div>
            </div>
            <div className="grid grid-cols-2 px-2">
              {savingsData.map((saving, index) => (
                <div key={index} className="flex space-x-3 my-2 ">
                  <div
                    className={`w-1 max-h-[2rem] rounded-xl bg-${saving.color}`}
                  ></div>
                  <div className="flex flex-col justify-center">
                    <h1 className="text-ch-grey text-sm">{saving.name}</h1>
                    <div className="font-bold my-1">{"$" + saving.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white my-4 px-4 py-5 rounded-xl">
          <div className="flex justify-between">
            <div>
              <h1 className="text-lg font-bold">Transactions</h1>
            </div>
            <div className="flex items-center space-x-3">
              <h1 className="text-xs text-ch-grey capitalize">view all</h1>
              <RightIcon color="#696868" />
            </div>
          </div>
          {transactions.slice(0, 5).map((transaction, index) => (
            <div key={index} className="flex justify-between">
              <div className="flex space-x-5 items-center">
                <div className="w-8">
                  <img className="rounded-full" src={transaction.avatar} />
                </div>
                <h1 className="font-bold text-sm">{transaction.name}</h1>
              </div>
              <div className="flex flex-col py-3">
                <h1
                  className={`font-bold ${
                    index === 0 || index === 3 ? "text-ch-green" : "text-black"
                  }`}
                >
                  {" "}
                  {"$" +
                    addPlusSignToNonNegativeNumber(Number(transaction.amount))}
                </h1>
                <div className="text-ch-grey text-xs font-light my-1">
                  {toDMYString(transaction.date)}
                </div>
              </div>
              <div className="absolute">
                <Line className={`${index === 0 ? "hidden" : ""}`} />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white my-4 px-4 py-5 rounded-xl">
          <div className="flex justify-between">
            <div>
              <h1 className="text-lg font-bold">Budgets</h1>
            </div>
            <div className="flex items-center space-x-3">
              <h1 className="text-xs text-ch-grey capitalize">see details</h1>
              <RightIcon color="#696868" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
