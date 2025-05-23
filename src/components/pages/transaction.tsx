import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { Search, DropdownIcon } from "../icons";
import { Layout } from "../layout";
import Input from "../ui/Input/Input";
import Select from "../ui/Dropdown/Select";
import { CategoryOptions, SortOptions } from "../../lib/getSelectOptions";
import { OptionsInterface, transactionInterface } from "../../types/global";
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
  const [transactions, setTransactions] = useState<transactionInterface[]>([]);

  const indexOfLastItem = pageNumber * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const transactionCollectionRef = collection(db, "transactions");

  const getTransactions = async () => {
    try {
      setIsLoading(true);
      const data = await getDocs(transactionCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as transactionInterface[];
      setTransactions(filteredData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="w-screen">
      <Layout title="transactions">
        <div className="px-4 md:px-8">
          <div className="bg-white min-h-screen p-4 md:p-8 rounded-md w-full">
            <div className="flex justify-between items-center w-full gap-4">
              <div className="flex-1">
                <Input
                  typeOfInput="normal"
                  placeholder="Search transaction"
                  placement="end"
                  icon={<Search />}
                  className="w-11/12 sm:w-7/12 md:w-10/12 xl:w-8/12"
                />
              </div>
              <div className="flex flex-[1.2] items-center justify-between gap-x-4 md:gap-x-6">
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
            {isLoading ? (
              <div className="absolute w-full top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
                <div className="h-1/4 w-1/4">
                  <DotLottieReact
                    src="https://lottie.host/dfbd7ad5-7401-4b5f-8e39-f57f325c38c9/myKWeEicAa.lottie"
                    loop
                    autoplay
                  />
                </div>
              </div>
            ) : (
              <>
                <TransactionTable transaction={currentItems} />
                <TransactionCard transaction={currentItems} />
              </>
            )}
            {transactions.length > 0 && (
              <Pagination
                currentPage={pageNumber}
                pageSize={pageSize}
                totalItems={transactions.length}
                onPageChange={setPageNumber}
              />
            )}
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
            <td className="border-b border-ch-grey/0.15"></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TransactionCard: React.FC<TransactionInterface> = ({ transaction }) => {
  return (
    <div className="md:hidden">
      {transaction.map((txn, index) => (
        <div
          key={index}
          className={`${
            index !== transaction.length - 1
              ? "border-b border-ch-grey/0.15"
              : ""
          } flex items-center justify-between py-4`}
        >
          <div className="flex items-center gap-x-2">
            <img className="w-8 h-8 rounded-full" src={txn.avatar} />
            <div className="space-y-1">
              <h1 className="whitespace-nowrap font-bold text-sm">
                {txn.name}
              </h1>
              <p className="text-left text-ch-grey text-xs font-normal font-publicSans">
                {txn.category}
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <h1
              className={`${
                txn.amount < 0 ? "text-black" : "text-ch-green"
              } font-bold text-sm`}
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
            <p className="text-left text-ch-grey text-xs font-normal font-publicSans">
              {toDMYString(txn.date)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
