import { useEffect } from "react";
import { useForm } from "react-hook-form";
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

type BudgetValues = {
  category: OptionsInterface<string> | null;
  maximum: string;
  theme: OptionsInterface<string> | null;
};

const Budget = () => {
  const { openModal, setOpenModal, selectedBudget } = useUIStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<BudgetValues>({
    defaultValues: {
      category: null,
      maximum: "",
      theme: null,
    },
  });

  useEffect(() => {
    if (openModal?.type === "edit" && selectedBudget) {
      const matchedCategory = CategoryOptions.find(
        (opt) => opt.value === selectedBudget.category
      );

      const matchedTheme = ThemeOptions.find(
        (opt) => opt.value === selectedBudget.theme
      );

      reset({
        category: matchedCategory ?? null,
        maximum: selectedBudget.maximum.toString() ?? "",
        theme: matchedTheme,
      });
    } else if (openModal?.type === "add") {
      reset({
        category: null,
        maximum: "",
        theme: { value: ThemeOptions[0].value },
      });
    }
  }, [openModal, selectedBudget, reset]);

  const onSubmit = () => {};

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
          {budgets.map(({ category, maximum, amount_spent, theme }) => (
            <BudgetCard
              key={category}
              title={category}
              progressBarValue={(amount_spent / maximum) * 100}
              progressColor={theme}
              amountSpent={amount_spent}
              maximum={maximum}
              budget={
                budgets.find((budget) => budget.category === category) || null
              }
            />
          ))}
        </>
        <Modal
          isOpen={openModal?.type === "add" || openModal?.type === "edit"}
          title={openModal?.type === "add" ? "Add Budget" : "Edit Budget"}
          onClose={() => setOpenModal(null)}
          modalHeader={
            openModal?.type === "add"
              ? "Choose a category to set a spending budget. These categories can help you monitor spending"
              : "As your budgets change, feel free to update your spending limits."
          }
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Dropdown
              label="Budget category"
              onSelect={(option) => setValue("category", option)}
              selectedOption={watch("category")}
              options={CategoryOptions}
              includePlaceholderOption={false}
              placeholder={openModal?.type === "edit" ? "" : "Entertainment"}
              icon={<DropdownIcon />}
              isModal={true}
              {...register("category", { required: "category is required" })}
            />
            {errors.category && (
              <span role="alert" className="text-xs text-ch-red">
                {errors.category?.message}
              </span>
            )}
            <div className="mt-3">
              <Input
                typeOfInput="modal"
                variant="primary"
                label="maximum spend"
                placeholder="e.g. 2000"
                icon={<DollarSign />}
                placement="start"
                {...register("maximum", {
                  required: "Maximum spend is required",
                  min: { value: 1, message: "Amount must be positive" },
                })}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  setValue("maximum", rawValue, {
                    shouldValidate: true,
                  });
                  e.target.value = rawValue;
                }}
              />
              {errors.maximum && (
                <span role="alert" className="text-xs text-ch-red">
                  {errors.maximum?.message}
                </span>
              )}
            </div>
            <div className="my-2">
              <Dropdown
                label="Theme"
                onSelect={(option) => setValue("theme", option)}
                selectedOption={watch("theme")}
                options={ThemeOptions}
                includePlaceholderOption={false}
                placeholder="Green"
                icon={<DropdownIcon />}
                isModal={true}
                themeColor={watch("theme")?.value}
                {...register("theme", { required: "theme is required" })}
              />
              {errors.theme && (
                <span role="alert" className="text-xs text-ch-red">
                  {errors.theme?.message}
                </span>
              )}
            </div>
            <Button onClick={() => setOpenModal(null)} className="mt-3 mb-4">
              {openModal?.type === "add" ? "Add Budget" : "Save Changes"}
            </Button>
          </form>
        </Modal>
        <ConfirmDialog
          title={`Delete '${openModal?.data}'?`}
          isOpen={openModal?.type === "delete"}
          onCancel={() => setOpenModal(null)}
          message={
            "Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."
          }
          cancelText="Yes Confirm Deletion"
          confirmText="No, Go Back"
        />
      </div>
    </Layout>
  );
};

export default Budget;
