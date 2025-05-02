import { useState } from "react";
import { Layout } from "../layout";
import PieChart from "../ui/PieChart";
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

const Budget = () => {
  const [BudgetModal, setBudgetModal] = useState<boolean>(false);

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [handlePopOver, setHandlePopOver] = useState<boolean>(false);
  const [selectedCategoryOption, setSelectedCategoryOption] =
    useState<OptionsInterface<string> | null>(null);
  const [selectedThemeOption, setThemeOption] =
    useState<OptionsInterface<string> | null>(null);

  const budgetItems = [
    {
      title: "Entertainment",
      progressBarValue: 50,
      progressColor: "ch-green",
      onClick: () => setHandlePopOver(true),
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

  const handleDelete = (title: string) => {
    setCategoryToDelete(title);
    setShowDeleteConfirm(true);
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  return (
    <Layout
      title="budgets"
      displayButton={true}
      buttonTitle="+ Add New Budget"
      onClick={() => setBudgetModal(true)}
    >
      <div className="p-4 flex flex-col lg:grid lg:grid-cols-2 gap-4">
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
        <>
          {budgetItems.map(
            ({ title, progressBarValue, progressColor, onClick }) => (
              <BudgetCard
                key={title}
                title={title}
                progressBarValue={progressBarValue}
                progressColor={progressColor}
                onClick={onClick}
                onDelete={() => handleDelete(title)}
                onEdit={handleEdit}
              />
            )
          )}
        </>
        <Modal
          isOpen={BudgetModal}
          title={"Add New Budget"}
          onClose={() => setBudgetModal(false)}
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
              selectedOption={selectedCategoryOption}
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
                placeholder="e.g. 2000"
                icon={<DollarSign />}
                placement="start"
              />
            </div>
            <div className="my-2">
              <Dropdown
                label="Theme"
                onSelect={setThemeOption}
                selectedOption={selectedThemeOption}
                options={ThemeOptions}
                includePlaceholderOption={false}
                placeholder="Green"
                icon={<DropdownIcon />}
                isModal={true}
                themeColor={ThemeOptions[0].value}
              />
            </div>
            <Button className="mt-2">Add Budget</Button>
          </form>
        </Modal>
        {showDeleteConfirm && (
          <ConfirmDialog
            title={`Delete '${categoryToDelete}'`}
            isOpen={showDeleteConfirm}
            onCancel={() => setShowDeleteConfirm(false)}
            message={
              "Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."
            }
            cancelText="Yes Confirm Deletion"
            confirmText="No, Go Back"
          />
        )}
      </div>
    </Layout>
  );
};

export default Budget;
