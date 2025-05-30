import { useState, useEffect, useMemo } from "react";
import { db } from "../../firebase";
import { collection, query, where, Query, orderBy } from "firebase/firestore";
import toast from "react-hot-toast";
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
import useDebounce from "../../hooks/useDebounce";
import useTransactions from "../../hooks/useTransactions";

interface TransactionInterface {
  transaction: transactionInterface[];
  isLoading: boolean;
  transactionSearch?: string;
}

const column = ["Recipient / Sender", "Category", "Transaction Date", "Amount"];

export const Transaction = () => {
  const [selectedSortOption, setSelectedSortOption] =
    useState<OptionsInterface<string> | null>({
      label: "Latest",
      value: "Latest",
    });
  const [selectedCategoryOption, setSelectedCategoryOption] =
    useState<OptionsInterface<string> | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(PAGE.NUMBER);
  const [pageSize] = useState<number>(PAGE.SIZE);
  const [transactions, setTransactions] = useState<transactionInterface[]>([]);
  const [baseQuery, setBaseQuery] = useState<Query>(
    query(collection(db, "transactions"), orderBy("date", "desc"))
  );
  const [transactionSearch, setTransactionSearch] = useState<string>("");
  const delaySearch = useDebounce(transactionSearch, 1500);

  const indexOfLastItem = pageNumber * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    let queryRef = query(
      collection(db, "transactions"),
      orderBy(
        selectedSortOption?.value === "Oldest"
          ? "date"
          : selectedSortOption?.value === "Latest"
            ? "date"
            : selectedSortOption?.value === "A to Z"
              ? "name"
              : selectedSortOption?.value === "Z to A"
                ? "name"
                : selectedSortOption?.value === "Highest"
                  ? "amount"
                  : selectedSortOption?.value === "Lowest"
                    ? "amount"
                    : "date",
        selectedSortOption?.value === "Oldest"
          ? "asc"
          : selectedSortOption?.value === "Latest"
            ? "desc"
            : selectedSortOption?.value === "A to Z"
              ? "asc"
              : selectedSortOption?.value === "Z to A"
                ? "desc"
                : selectedSortOption?.value === "Highest"
                  ? "desc"
                  : selectedSortOption?.value === "Lowest"
                    ? "asc"
                    : "desc"
      )
    );
    setBaseQuery(queryRef);
  }, [selectedSortOption]);

  const activeQuery = useMemo(() => {
    let q = baseQuery;

    if (
      selectedCategoryOption?.value &&
      selectedCategoryOption.value !== "All transactions"
    ) {
      q = query(q, where("category", "==", selectedCategoryOption.value));
    }

    if (delaySearch) {
      const end = delaySearch + "\uf8ff";
      q = query(q, where("name", ">=", delaySearch), where("name", "<=", end));
    }
    return q;
  }, [baseQuery, selectedCategoryOption, delaySearch]);

  const { isLoading } = useTransactions({
    queryRef: activeQuery,
    onSuccess: (data) => setTransactions(data),
    onError: (error) => toast.error(`${error.message}`),
  });

  return (
    <div className="w-screen">
      <Layout title="transactions">
        <div className="px-4 md:px-8">
          <div className="bg-white min-h-90 p-4 md:p-8 rounded-md w-full">
            <div className="flex justify-between items-center w-full gap-4">
              <div className="flex-1">
                <Input
                  typeOfInput="normal"
                  placeholder="Search transaction"
                  placement="end"
                  onChange={(e) => setTransactionSearch(e.target.value)}
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
                    selectedOption={
                      selectedSortOption?.value === "Latest"
                        ? null
                        : selectedSortOption
                    }
                    onSelect={(option) => {
                      setSelectedSortOption(
                        option || { label: "Latest", value: "Latest" }
                      );
                    }}
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

            <TransactionTable
              transaction={currentItems}
              isLoading={isLoading}
              transactionSearch={transactionSearch}
            />
            <TransactionCard isLoading={isLoading} transaction={currentItems} />
            {transactions && transactions.length > 0 && !isLoading && (
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

const TransactionTable: React.FC<TransactionInterface> = ({
  transaction,
  isLoading,
  transactionSearch,
}) => {
  return (
    <div>
      <table className="py-4 mt-8 mb-4 table-fixed hidden md:table">
        <thead>
          <tr>
            {column.map((i, index) => {
              const widths = ["w-2/4", "w-1/4", "w-1/4", "w-1/4"];
              return (
                <th
                  className={`text-left text-ch-grey text-sm font-normal font-publicSans border-b border-ch-grey/0.15 pb-2 ${widths[index]}`}
                  key={index}
                >
                  {i}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="w-full relative">
          {isLoading ? (
            <tr>
              <td colSpan={6} className="text-center py-10">
                <DotLottieReact
                  src="https://lottie.host/df769f50-c4f3-4f5a-a967-dc21e728bdd4/qCDaeBxHKM.lottie"
                  loop
                  autoplay
                  className="w-3/5 h-3/5 mx-auto"
                />
                <p className="text-ch-black text-lg font-normal">Loading ...</p>
              </td>
            </tr>
          ) : transaction && transaction.length > 0 && !isLoading ? (
            transaction.map((txn, index) => {
              return (
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
                      <img
                        className="w-10 h-10 rounded-full"
                        src={txn.avatar}
                      />
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
              );
            })
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-10">
                <DotLottieReact
                  src="https://lottie.host/df769f50-c4f3-4f5a-a967-dc21e728bdd4/qCDaeBxHKM.lottie"
                  loop
                  autoplay
                  className="w-3/5 h-3/5 mx-auto"
                />
                <p className="text-ch-black text-base font-normal">
                  No transaction{" "}
                  {transactionSearch !== "" ? "with such name" : ""} found.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const TransactionCard: React.FC<TransactionInterface> = ({
  transaction,
  isLoading,
  transactionSearch,
}) => {
  return (
    <div className="md:hidden">
      {isLoading ? (
        <div className="w-full h-80 flex flex-col items-center justify-center">
          <div className="text-center mt-4">
            <DotLottieReact
              src="https://lottie.host/df769f50-c4f3-4f5a-a967-dc21e728bdd4/qCDaeBxHKM.lottie"
              loop
              autoplay
            />
          </div>
          <p className="text-ch-black text-lg font-normal">Loading ...</p>
        </div>
      ) : transaction && transaction.length > 0 && !isLoading ? (
        transaction.map((txn, index) => (
          <div
            key={index}
            className={`${
              index !== transaction.length - 1
                ? "border-b border-ch-grey/0.15"
                : ""
            } flex items-center justify-between py-4 mt-1`}
          >
            <div className="flex items-center gap-x-2">
              <img className="w-8 h-8 rounded-full" src={txn.avatar} />
              <div className="space-y-1">
                <h1 className="whitespace-nowrap font-bold text-sm">
                  {txn.name}
                </h1>
                <p className="text-left text-ch-grey text-xs font-medium font-publicSans">
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
        ))
      ) : (
        <div className="w-full h-80 flex flex-col items-center justify-center">
          <div className="text-center mt-4">
            <DotLottieReact
              src="https://lottie.host/df769f50-c4f3-4f5a-a967-dc21e728bdd4/qCDaeBxHKM.lottie"
              loop
              autoplay
            />
          </div>
          <p className="text-ch-black text-center text-base font-normal">
            No transaction {transactionSearch !== "" ? "with such name" : ""}{" "}
            found.
          </p>
        </div>
      )}
    </div>
  );
};
