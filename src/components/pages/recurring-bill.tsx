import { useState } from "react";

import { Search, DropdownIcon, LightCheckmark } from "../icons";
import { Layout } from "../layout";
import Input from "../ui/Input/Input";
import Select from "../ui/Dropdown/Select";
import { OptionsInterface, recurringbillInterface } from "../../types/global";
import { SortOptions } from "../../lib/getSelectOptions";
import bills from "../../data/bills";

interface RecurringBillInterface {
  bills: recurringbillInterface[];
}

const column = ["bill title", "due date", "amount"];

const RecurringBill = () => {
  const [selectedCategoryOption, setSelectedCategoryOption] =
    useState<OptionsInterface<string> | null>(null);
  const summaryData = [
    {
      header: "Paid Bills",
      amount: "2($320.00)",
    },
    {
      header: "Total Incoming",
      amount: "6($1,230.00)",
    },
    {
      header: "Due Soon",
      amount: "2($40.00)",
    },
  ];

  return (
    <Layout title="recurring bills">
      <div className="px-4 md:px-8">
        <div>
          <div className="w-full flex flex-col md:flex-row md:items-center md:space-x-6">
            <div className="w-full bg-black flex md:flex-col items-center md:items-start space-x-4 md:space-x-0 p-5 md:pt-8 h-28 md:h-48 rounded-lg">
              <LightBillIcon />
              <div className="flex flex-col space-y-2 md:pt-8">
                <h1 className="text-white text-sm font-normal">Total bills</h1>
                <h2 className="text-white font-bold text-3xl">$384.98</h2>
              </div>
            </div>
            <div className="w-full bg-white rounded-xl mt-3 md:mt-0 p-3.5">
              <h1 className="font-bold text-base">Summary</h1>
              {summaryData.map((summary, index) => (
                <div
                  className={`${
                    index !== 2
                      ? " border-b border-ch-grey/0.15 pb-3.5"
                      : "py-0.5"
                  } mt-4 flex justify-between items-center`}
                  key={index}
                >
                  <div
                    className={`${
                      index === 2 ? "text-ch-red" : "text-ch-grey"
                    } font-normal text-sm`}
                  >
                    {summary.header}
                  </div>
                  <div
                    className={`${
                      index === 2 ? "text-ch-red" : "text-ch-dark-grey"
                    } font-bold text-xs`}
                  >
                    {summary.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl mt-5 mb-2 p-5 md:p-8 md:pb-1.5">
            <div className="flex justify-between items-center w-full gap-4">
              <div className="flex-1">
                <Input
                  typeOfInput="normal"
                  placeholder="Search bills"
                  placement="end"
                  icon={<Search />}
                  className="w-full sm:w-7/12 xl:w-8/12"
                />
              </div>
              <div className="flex flex-[1.2] items-center justify-between ">
                <div className="flex items-center gap-2">
                  <span className="text-ch-grey text-sm font-medium whitespace-nowrap hidden md:block">
                    Sort by
                  </span>
                  <Select
                    options={SortOptions}
                    onSelect={setSelectedCategoryOption}
                    selectedOption={selectedCategoryOption}
                    placeholder="Latest"
                    icon={<DropdownIcon />}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            <RecurringBillCard bills={bills} />
            <RecurringBillTable bills={bills} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

const RecurringBillTable: React.FC<RecurringBillInterface> = ({ bills }) => {
  return (
    <table className="mt-2 md:mt-10 table-fixed hidden md:table">
      <thead>
        <tr>
          {column.map((i, index) => {
            return (
              <th
                className="text-left capitalize text-ch-grey text-sm font-normal font-publicSans border-b border-ch-grey/0.15 pb-2"
                key={index}
              >
                {i}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {bills.map((bill, index) => (
          <tr
            className={`${
              index < bills.length - 1 ? "border-b border-ch-grey/0.15" : ""
            }`}
            key={index}
          >
            <td className="w-2/3 items-center py-4 ">
              <div className="flex items-center gap-x-4">
                <img className="w-10 h-10 rounded-full" src={bill.avatar} />
                <h1 className="whitespace-nowrap font-bold text-sm">
                  {bill.header}
                </h1>
              </div>
            </td>
            <td className="w-1/3">
              <div className="flex  items-center space-x-2">
                <span className="text-left text-ch-grey text-sm font-normal font-publicSans">
                  {bill.Duration}
                </span>
                <div>
                  {index === 0 || index === 1 ? (
                    <LightCheckmark />
                  ) : index === 2 || index === 3 ? (
                    <CautionIcon />
                  ) : null}
                </div>
              </div>
            </td>
            <td className="w-1/3">
              <span
                className={`${
                  index === 2 || index === 3 ? "text-ch-red" : "text-ch-black"
                } text-sm font-bold`}
              >
                {"$" + bill.amount.toFixed(2)}
              </span>
            </td>
            <td className="border-b border-ch-grey/0.15"></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const RecurringBillCard: React.FC<RecurringBillInterface> = ({ bills }) => {
  return (
    <div className="mt-2 md:hidden">
      {bills.map((bill, index) => (
        <div
          key={index}
          className={`${
            index < bills.length - 1
              ? " border-b border-ch-grey/0.15 py-3.5"
              : "py-0.5"
          } flex flex-col`}
        >
          <div className="flex space-x-2 pb-1.5">
            <div className="flex items-center space-x-2">
              <img className="w-8 h-8 rounded-full" src={bill.avatar} />
              <div>
                <h1 className="font-bold text-sm whitespace-nowrap">
                  {bill.header}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="font-normal text-xs text-ch-green">
                {bill.Duration}{" "}
              </h2>
              {index === 0 || index === 1 ? (
                <LightCheckmark />
              ) : index === 2 || index === 3 ? (
                <CautionIcon />
              ) : null}
            </div>
            <div>
              <h2
                className={`${
                  index === 2 || index === 3 ? "text-ch-red" : "text-ch-black"
                } text-sm font-bold`}
              >
                {"$" + bill.amount.toFixed(2)}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const LightBillIcon = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.4375 16.25C28.4375 16.4986 28.3387 16.7371 28.1629 16.9129C27.9871 17.0887 27.7486 17.1875 27.5 17.1875H12.5C12.2514 17.1875 12.0129 17.0887 11.8371 16.9129C11.6613 16.7371 11.5625 16.4986 11.5625 16.25C11.5625 16.0014 11.6613 15.7629 11.8371 15.5871C12.0129 15.4113 12.2514 15.3125 12.5 15.3125H27.5C27.7486 15.3125 27.9871 15.4113 28.1629 15.5871C28.3387 15.7629 28.4375 16.0014 28.4375 16.25ZM27.5 20.3125H12.5C12.2514 20.3125 12.0129 20.4113 11.8371 20.5871C11.6613 20.7629 11.5625 21.0014 11.5625 21.25C11.5625 21.4986 11.6613 21.7371 11.8371 21.9129C12.0129 22.0887 12.2514 22.1875 12.5 22.1875H27.5C27.7486 22.1875 27.9871 22.0887 28.1629 21.9129C28.3387 21.7371 28.4375 21.4986 28.4375 21.25C28.4375 21.0014 28.3387 20.7629 28.1629 20.5871C27.9871 20.4113 27.7486 20.3125 27.5 20.3125ZM35.9375 8.75V32.5C35.9373 32.6598 35.8963 32.8168 35.8184 32.9563C35.7404 33.0958 35.6282 33.213 35.4922 33.2969C35.3446 33.389 35.174 33.4378 35 33.4375C34.8547 33.4376 34.7113 33.4039 34.5813 33.3391L30 31.0484L25.4187 33.3391C25.2887 33.404 25.1453 33.4378 25 33.4378C24.8547 33.4378 24.7113 33.404 24.5813 33.3391L20 31.0484L15.4187 33.3391C15.2887 33.404 15.1453 33.4378 15 33.4378C14.8547 33.4378 14.7113 33.404 14.5813 33.3391L10 31.0484L5.41875 33.3391C5.2758 33.4104 5.11697 33.4441 4.95736 33.4368C4.79775 33.4295 4.64264 33.3816 4.50676 33.2975C4.37089 33.2135 4.25875 33.0961 4.18099 32.9565C4.10324 32.8169 4.06245 32.6598 4.0625 32.5V8.75C4.0625 8.16984 4.29297 7.61344 4.7032 7.2032C5.11344 6.79297 5.66984 6.5625 6.25 6.5625H33.75C34.3302 6.5625 34.8866 6.79297 35.2968 7.2032C35.707 7.61344 35.9375 8.16984 35.9375 8.75ZM34.0625 8.75C34.0625 8.66712 34.0296 8.58763 33.971 8.52903C33.9124 8.47042 33.8329 8.4375 33.75 8.4375H6.25C6.16712 8.4375 6.08763 8.47042 6.02903 8.52903C5.97042 8.58763 5.9375 8.66712 5.9375 8.75V30.9828L9.58125 29.1609C9.71129 29.096 9.85465 29.0622 10 29.0622C10.1453 29.0622 10.2887 29.096 10.4187 29.1609L15 31.4516L19.5813 29.1609C19.7113 29.096 19.8547 29.0622 20 29.0622C20.1453 29.0622 20.2887 29.096 20.4187 29.1609L25 31.4516L29.5813 29.1609C29.7113 29.096 29.8547 29.0622 30 29.0622C30.1453 29.0622 30.2887 29.096 30.4187 29.1609L34.0625 30.9828V8.75Z"
        fill="white"
      />
    </svg>
  );
};

const CautionIcon = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 0.5C5.71442 0.5 4.45772 0.881218 3.3888 1.59545C2.31988 2.30968 1.48676 3.32484 0.994786 4.51256C0.502816 5.70028 0.374095 7.00721 0.624899 8.26809C0.875703 9.52896 1.49477 10.6872 2.40381 11.5962C3.31285 12.5052 4.47104 13.1243 5.73192 13.3751C6.99279 13.6259 8.29973 13.4972 9.48744 13.0052C10.6752 12.5132 11.6903 11.6801 12.4046 10.6112C13.1188 9.54229 13.5 8.28558 13.5 7C13.4982 5.27665 12.8128 3.62441 11.5942 2.40582C10.3756 1.18722 8.72335 0.50182 7 0.5ZM6.5 4C6.5 3.86739 6.55268 3.74021 6.64645 3.64645C6.74022 3.55268 6.86739 3.5 7 3.5C7.13261 3.5 7.25979 3.55268 7.35356 3.64645C7.44732 3.74021 7.5 3.86739 7.5 4V7.5C7.5 7.63261 7.44732 7.75979 7.35356 7.85355C7.25979 7.94732 7.13261 8 7 8C6.86739 8 6.74022 7.94732 6.64645 7.85355C6.55268 7.75979 6.5 7.63261 6.5 7.5V4ZM7 10.5C6.85167 10.5 6.70666 10.456 6.58333 10.3736C6.45999 10.2912 6.36386 10.1741 6.30709 10.037C6.25033 9.89997 6.23548 9.74917 6.26441 9.60368C6.29335 9.4582 6.36478 9.32456 6.46967 9.21967C6.57456 9.11478 6.7082 9.04335 6.85368 9.01441C6.99917 8.98547 7.14997 9.00033 7.28701 9.05709C7.42406 9.11386 7.54119 9.20999 7.6236 9.33332C7.70602 9.45666 7.75 9.60166 7.75 9.75C7.75 9.94891 7.67098 10.1397 7.53033 10.2803C7.38968 10.421 7.19892 10.5 7 10.5Z"
        fill="#C94736"
      />
    </svg>
  );
};

export default RecurringBill;
