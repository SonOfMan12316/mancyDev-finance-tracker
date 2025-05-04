import { useState, useEffect } from "react";
import { Layout } from "../layout";
import budgets from "../../data/data";
import BudgetCard from "../Budgets/budgetCard";
import Modal from "../global/Modal";
import Input from "../ui/Input/Input";
import { OptionsInterface } from "../../types/global";
import Dropdown from "../ui/Dropdown/Select";
import { DollarSign, DropdownIcon } from "../icons";
import { CategoryOptions, ThemeOptions } from "../../lib/getSelectOptions";
import { Button } from "../ui/Button/Button";
import ConfirmDialog from "../global/ConfirmDialog";
import BudgetSpendingSummaryCard from "../Budgets/BudgetSpendingSummaryCard";
import useUIStore from "../../store/ui-store";

const Budget = () => {
  const [selectedCategoryOption, setSelectedCategoryOption] =
    useState<OptionsInterface<string> | null>(null);
  const [selectedThemeOption, setThemeOption] =
    useState<OptionsInterface<string> | null>(null);

  const { openModal, setOpenModal, selectedBudget } = useUIStore();
  const categoryToDelete = openModal?.type === "delete" ? openModal.data : null;

  const budgetItems = [
    {
      title: "Entertainment",
      progressBarValue: 50,
      progressColor: "ch-green",
    },
    {
      title: "Bills",
      progressBarValue: 75,
      progressColor: "ch-cyan",
    },
    {
      title: "Dining Out",
      progressBarValue: 100,
      progressColor: "ch-yellow",
    },
    {
      title: "Personal Care",
      progressBarValue: 60,
      progressColor: "ch-navy",
    },
  ];

  return (
    <Layout
      title="budgets"
      displayButton={true}
      buttonTitle="+ Add New Budget"
      onClick={() => setOpenModal({ type: "add" })}
    >
      <div className="p-4  lg:px-6 flex flex-col lg:grid lg:grid-cols-2 gap-4">
        <BudgetSpendingSummaryCard budgets={budgets} />
        <>
          {budgetItems.map(({ title, progressBarValue, progressColor }) => (
            <BudgetCard
              key={title}
              title={title}
              progressBarValue={progressBarValue}
              progressColor={progressColor}
            />
          ))}
        </>
        <Modal
          isOpen={openModal?.type === "add" || openModal?.type === "edit"}
          title={openModal?.type === "add" ? "Add Budget" : "Edit Budget"}
          onClose={() => setOpenModal(null)}
        >
          <div className="my-3">
            <h1 className="text-ch-grey text-sm font-normal">
              Choose a category to set a spending budget. These categories can
              help you monitor spending
            </h1>
          </div>
          <form className="">
            <Dropdown
              label="Budget category"
              onSelect={setSelectedCategoryOption}
              selectedOption={
                openModal?.type === "add"
                  ? selectedCategoryOption
                  : selectedBudget
                    ? {
                        label: selectedBudget.category,
                        value: selectedBudget.category,
                      }
                    : null
              }
              options={CategoryOptions}
              includePlaceholderOption={false}
              placeholder="Entertainment"
              icon={<DropdownIcon />}
              isModal={true}
            />
            <div className="mt-3">
              <Input
                typeOfInput="modal"
                variant="primary"
                label="maximum spend"
                value={openModal?.type === "add" ? "" : selectedBudget?.maximum}
                placeholder="e.g. 2000"
                icon={<DollarSign />}
                placement="start"
              />
            </div>
            <div className="my-2">
              <Dropdown
                label="Theme"
                onSelect={setThemeOption}
                selectedOption={
                  openModal?.type === "add"
                    ? selectedThemeOption
                    : selectedBudget
                      ? {
                          label: selectedBudget.theme,
                          value: selectedBudget.theme,
                        }
                      : null
                }
                options={ThemeOptions}
                includePlaceholderOption={false}
                placeholder="Green"
                icon={<DropdownIcon />}
                isModal={true}
                themeColor={ThemeOptions[0].value}
              />
            </div>
            <Button className="mt-2">
              {openModal?.type === "add" ? "Add Budget" : "Save Changes"}
            </Button>
          </form>
        </Modal>
        {/* )} */}
        {/* {openModal?.type === "delete" && ( */}
        <ConfirmDialog
          title={`Delete '${categoryToDelete}'?`}
          isOpen={openModal?.type === "delete"}
          onCancel={() => setOpenModal(null)}
          message={
            "Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."
          }
          cancelText="Yes Confirm Deletion"
          confirmText="No, Go Back"
        />
        {/* )} */}
      </div>
    </Layout>
  );
};

export default Budget;
