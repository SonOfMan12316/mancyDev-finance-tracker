import { addCommasToNumber } from "../../utils/number";
import { RightIcon, SavingIcon } from "../icons";

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
        </div>
      </div>
    </div>
  );
};

export default OverView;
