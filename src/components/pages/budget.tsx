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
  maximum: number;
  theme: OptionsInterface<string> | null;
};

const Budget = () => {
  const { openModal, setOpenModal, selectedBudget } = useUIStore();

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
      maximum: 0,
      theme: ThemeOptions[0],
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
        maximum: selectedBudget.maximum,
        theme: matchedTheme,
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Dropdown
              label="Budget category"
              onSelect={(option) => setValue("category", option)}
              selectedOption={watch("category")}
              options={CategoryOptions}
              includePlaceholderOption={false}
              placeholder="Entertainment"
              icon={<DropdownIcon />}
              isModal={true}
              {...register("category", { required: "category is required" })}
            />
            {errors.category && (
              <span role="alert" className="text-xs text-ch-danger">
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
                  valueAsNumber: true,
                  required: "Maximum spend is required",
                  min: { value: 1, message: "Amount must be positive" },
                })}
              />
              {errors.maximum && (
                <span role="alert" className="text-xs text-ch-danger">
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
                <span role="alert" className="text-xs text-ch-danger">
                  {errors.theme?.message}
                </span>
              )}
            </div>
            <Button onClick={() => setOpenModal(null)} className="mt-2">
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
