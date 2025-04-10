import { useState } from "react";
import { Search, Filter, Download, Dropdown } from "../icons";
import { Layout } from "../layout";
import Input from "../ui/Input/Input";
import Select from "../ui/Dropdown/Dropdown";
import {
  CategoryOptions,
  SortOptions,
} from "../../assets/lib/getSelectOptions";
import { OptionsInterface } from "../../types/global";
import transactions from "../../data/transaction";

const column = ["Recipient / Sender", "Category", "Transaction Date", "Amount"];

export const Transaction = () => {
  const [selectedSortOption, setSelectedSortOption] =
    useState<OptionsInterface<string> | null>(null);
  const [selectedCategoryOption, setSelectedCategoryOption] =
    useState<OptionsInterface<string> | null>(null);
  return (
    <div className="w-screen">
      <Layout title="transaction">
        <div className="px-4 lg:px-6">
          <div className="bg-white h-screen p-4 md:p-8 rounded-md">
            <div className="flex justify-between items-center w-full gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search transaction"
                  placement="end"
                  icon={<Search />}
                  className="w-full lg:w-10/12 xl:w-8/12"
                />
              </div>
              <div className="flex-[0.5] flex justify-end gap-2 sm:hidden">
                <Download />
                <Filter />
              </div>
              <div className="hidden sm:flex flex-[1.2] items-center justify-between md:gap-x-6">
                <div className="flex items-center gap-2">
                  <span className="text-ch-grey text-sm font-medium whitespace-nowrap">
                    Sort by
                  </span>
                  <Select
                    options={SortOptions}
                    selectedOption={selectedSortOption}
                    onSelect={setSelectedSortOption}
                    placeholder="Latest"
                    icon={<Dropdown />}
                    className="md:w-full"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-ch-grey text-sm font-medium">
                    Category
                  </span>
                  <Select
                    options={CategoryOptions}
                    onSelect={setSelectedCategoryOption}
                    selectedOption={selectedCategoryOption}
                    placeholder="All transactions"
                    icon={<Dropdown />}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            <table className="py-4 my-4 table-fixed">
              <thead>
                <tr className="text-left">
                  {column.map((i, index) => {
                    return <th key={index}>{i}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="w-2/4 items-center">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={transaction.avatar}
                      />
                      <h1 className="whitespace-nowrap">{transaction.name}</h1>
                    </td>

                    <td className="w-1/4">
                      <span>{transaction.category}</span>
                    </td>
                    <td className="w-1/4">
                      <h1>{transaction.amount}</h1>
                    </td>
                    <td className="w-1/4">
                      <span>{transaction.date}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
};
