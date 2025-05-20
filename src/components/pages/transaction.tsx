import { useState } from "react";
import { Search, Filter, Download, DropdownIcon } from "../icons";
import { Layout } from "../layout";
import Input from "../ui/Input/Input";
import Select from "../ui/Dropdown/Select";
import { CategoryOptions, SortOptions } from "../../lib/getSelectOptions";
import { OptionsInterface, transactionInterface } from "../../types/global";
import { transactions } from "../../data/transaction";
import { toDMYString } from "../../utils/date";
import Pagination from "../global/Pagination";
import { PAGE } from "../../utils/global";

interface TransactionInterface {
  transaction: transactionInterface[];
}

const column = ["Recipient / Sender", "Category", "Transaction Date", "Amount"];

export const Transaction = () => {
  const [selectedSortOption, setSelectedSortOption] =
    useState<OptionsInterface<string> | null>(null);
  const [selectedCategoryOption, setSelectedCategoryOption] =
    useState<OptionsInterface<string> | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(PAGE.NUMBER);
  const [pageSize, setPageSize] = useState<number>(PAGE.SIZE);

  const indexOfLastItem = pageNumber * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-screen">
      <Layout title="transactions">
        <div className="px-4 lg:px-6">
          <div className="bg-white min-h-screen p-4 md:p-8 rounded-md w-full">
            <div className="flex justify-between items-center w-full gap-4">
              <div className="flex-1">
                <Input
                  typeOfInput="normal"
                  placeholder="Search transaction"
                  placement="end"
                  icon={<Search />}
                  className="w-full sm:w-7/12 md:w-10/12 xl:w-8/12"
                />
              </div>
              <div className="flex flex-[1.2] items-center justify-between md:gap-x-6">
                <div className="flex items-center gap-2">
                  <span className="text-ch-grey text-sm font-medium whitespace-nowrap hidden md:block">
                    Sort by
                  </span>
                  <Select
                    options={SortOptions}
                    selectedOption={selectedSortOption}
                    onSelect={setSelectedSortOption}
                    placeholder="Latest"
                    icon={<DropdownIcon />}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-ch-grey text-sm font-medium hidden md:block">
                    Category
                  </span>
                  <Select
                    options={CategoryOptions}
                    onSelect={setSelectedCategoryOption}
                    selectedOption={selectedCategoryOption}
                    placeholder="All transactions"
                    icon={<DropdownIcon />}
                    showSecondSelect={true}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            <TransactionTable transaction={currentItems} />
            <TransactionCard transaction={currentItems} />
            <Pagination
              currentPage={pageNumber}
              pageSize={pageSize}
              totalItems={transactions.length}
              onPageChange={setPageNumber}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};

const TransactionTable: React.FC<TransactionInterface> = ({ transaction }) => {
  return (
    <table className="py-4 mt-8 mb-4 table-fixed hidden md:table">
      <thead>
        <tr>
          {column.map((i, index) => {
            return (
              <th
                className="text-left text-ch-grey text-sm font-normal font-publicSans border-b border-ch-grey/0.15 pb-2"
                key={index}
              >
                {i}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {transaction.map((txn, index) => (
          <tr
            className={`${
              index !== transaction.length - 1
                ? "border-b border-ch-grey/0.15"
                : ""
            }`}
            key={index}
          >
            <td className="w-2/4 items-center py-4 ">
              <div className="flex items-center gap-x-4">
                <img className="w-10 h-10 rounded-full" src={txn.avatar} />
                <h1 className="whitespace-nowrap font-bold text-sm">
                  {txn.name}
                </h1>
              </div>
            </td>
            <td className="w-1/4 ">
              <span className="text-left text-ch-grey text-sm font-normal font-publicSans">
                {txn.category}
              </span>
            </td>
            <td className="w-1/4 ">
              <span className="text-left text-ch-grey text-sm font-normal font-publicSans">
                {toDMYString(txn.date)}
              </span>
            </td>
            <td className="w-1/4">
              <h1
                className={`${
                  txn.amount < 0 ? "text-black" : "text-ch-green"
                } font-bold text-base`}
              >
                {txn.amount < 0
                  ? txn.amount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                  : "+" +
                    txn.amount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
              </h1>
            </td>
            <td className="border-b-1.5 border-ch-grey/0.15"></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TransactionCard: React.FC<TransactionInterface> = ({ transaction }) => {
  return (
    <div className="md:hidden my-4">
      {transaction.map((transaction, index) => (
        <div key={index} className="flex items-center justify-between py-4">
          <div className="flex items-center gap-x-2">
            <img className="w-10 h-10 rounded-full" src={transaction.avatar} />
            <div className="space-y-2">
              <h1 className="whitespace-nowrap font-bold text-sm">
                {transaction.name}
              </h1>
              <p className="text-left text-ch-grey text-sm font-normal font-publicSans">
                {transaction.category}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <h1
              className={`${
                transaction.amount < 0 ? "text-black" : "text-ch-green"
              } font-bold text-base`}
            >
              {transaction.amount < 0
                ? transaction.amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "+" +
                  transaction.amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
            </h1>
            <p className="text-left text-ch-grey text-sm font-normal font-publicSans">
              {toDMYString(transaction.date)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
