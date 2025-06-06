import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createBudget } from "../../api/resource/budget";
import { Layout } from "../layout";
import loadingLottie from "../../assets/lottie/lottie.json"
import BudgetCard from "../Budgets/budgetCard";
import Modal from "../global/Modal";
import Input from "../ui/Input/Input";
import { OptionsInterface } from "../../types/global";
import Select from "../ui/Dropdown/Select";
import { DollarSign, DropdownIcon } from "../icons";
import { CategoryOptions, ThemeOptions } from "../../lib/getSelectOptions";
import { Button } from "../ui/Button/Button";
import ConfirmDialog from "../global/ConfirmDialog";
import BudgetSpendingSummaryCard from "../Budgets/BudgetSpendingSummaryCard";
import useUIStore from "../../store/ui-store";

import { queryClient } from "../../main";
import useBudgets from "../../hooks/useBudget";
import Lottie from "lottie-react";

type BudgetData = {
  category: string;
  maximum: string;
  amount_spent: string;
  theme: string;
}

type BudgetValues = {
  category: OptionsInterface<string> | null;
  maximum: string;
  amount_spent: string;
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
      amount_spent: "",
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
        theme: matchedTheme ?? null,
      });
    } else if (openModal?.type === "add") {
      reset({
        category: { value: "Entertainment", label: "Entertainment" },
        maximum: "",
        amount_spent: "",
        theme: { value: ThemeOptions[0].value, label: ThemeOptions[0].label },
      });
    }
  }, [openModal, selectedBudget, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: BudgetData) => createBudget(data),
    onSuccess: () => {
      toast.success("New budget added Successfully");
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      setOpenModal(null);
    },
    onError: () => {
      toast.error("Error adding new budget", { id: "add-budget-err" });
    },
  });

  const handleAddBudget: SubmitHandler<BudgetValues> = (data) => {
    const budgetData = {
      category: data.category?.value || "",
      maximum: data.maximum,
      amount_spent: data.amount_spent,
      theme: data.theme?.value || ""
    }
    mutate(budgetData);
  };

  const [budgets, setBudgets] = useState<BudgetData[]>([])

  const { isLoading } = useBudgets({
    onSuccess(data) {
      setBudgets(data)
    },
    onError(error) {
      toast.error(`${error.message}`)
    }
  })


  return (
    <Layout
      title="budgets"
      displayButton={true}
      buttonTitle="+ Add New Budget"
      onClick={() => setOpenModal({ type: "add" })}
    >
      {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center grayscale-[50%]">
            <Lottie
              animationData={loadingLottie}
              loop={true}
              autoplay={true}
              style={{
                height: "100%",
                width: "100%",
                maxHeight: 80,
                maxWidth: 80,
              }}
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice",
              }}
            />
          </div>
        ) : (
        <div className="p-4 md:px-8 flex flex-col lg:grid lg:grid-cols-2 gap-4">
        <BudgetSpendingSummaryCard budgets={budgets} />
        <>
          {budgets.map(({ category, maximum, amount_spent, theme }) => (
            <BudgetCard
              key={category}
              title={category}
              progressBarValue={(Number(amount_spent) / Number(maximum)) * 100}
              progressColor={theme}
              amountSpent={Number(amount_spent)}
              maximum={Number(maximum)}
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
          <form onSubmit={handleSubmit(handleAddBudget)}>
            <Select
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
            <div className="mt-3">
              <Input
                typeOfInput="modal"
                variant="primary"
                label="amount spent"
                placeholder="e.g. 2000"
                icon={<DollarSign />}
                placement="start"
                {...register("amount_spent", {
                  required: "Amount spent is required",
                  min: { value: 1, message: "Amount must be positive" },
                })}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  setValue("amount_spent", rawValue, {
                    shouldValidate: true,
                  });
                  e.target.value = rawValue;
                }}
              />
              {errors.amount_spent && (
                <span role="alert" className="text-xs text-ch-red">
                  {errors.maximum?.message}
                </span>
              )}
            </div>
            <div className="my-2">
              <Select
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
            <Button
              type="submit"
              className="mt-3 mb-4 flex items-center justify-center"
            >
              <Spinner isPending={isPending} />
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
      )}
    </Layout>
  );
};

const Spinner = ({ isPending = false }) => {
  return (
    <svg
      className={isPending ? "animate-spin" : "hidden"}
      width="25"
      height="25"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.1562 2.625V5.25C11.1562 5.42405 11.0871 5.59097 10.964 5.71404C10.841 5.83711 10.674 5.90625 10.5 5.90625C10.326 5.90625 10.159 5.83711 10.036 5.71404C9.91289 5.59097 9.84375 5.42405 9.84375 5.25V2.625C9.84375 2.45095 9.91289 2.28403 10.036 2.16096C10.159 2.03789 10.326 1.96875 10.5 1.96875C10.674 1.96875 10.841 2.03789 10.964 2.16096C11.0871 2.28403 11.1562 2.45095 11.1562 2.625ZM18.375 9.84375H15.75C15.576 9.84375 15.409 9.91289 15.286 10.036C15.1629 10.159 15.0938 10.326 15.0938 10.5C15.0938 10.674 15.1629 10.841 15.286 10.964C15.409 11.0871 15.576 11.1562 15.75 11.1562H18.375C18.549 11.1562 18.716 11.0871 18.839 10.964C18.9621 10.841 19.0312 10.674 19.0312 10.5C19.0312 10.326 18.9621 10.159 18.839 10.036C18.716 9.91289 18.549 9.84375 18.375 9.84375ZM14.6762 13.7484C14.5521 13.6306 14.3869 13.5658 14.2158 13.568C14.0447 13.5702 13.8812 13.6392 13.7602 13.7602C13.6392 13.8812 13.5702 14.0447 13.568 14.2158C13.5658 14.3869 13.6306 14.5521 13.7484 14.6762L15.604 16.5326C15.7271 16.6557 15.8941 16.7249 16.0683 16.7249C16.2424 16.7249 16.4094 16.6557 16.5326 16.5326C16.6557 16.4094 16.7249 16.2424 16.7249 16.0683C16.7249 15.8941 16.6557 15.7271 16.5326 15.604L14.6762 13.7484ZM10.5 15.0938C10.326 15.0938 10.159 15.1629 10.036 15.286C9.91289 15.409 9.84375 15.576 9.84375 15.75V18.375C9.84375 18.549 9.91289 18.716 10.036 18.839C10.159 18.9621 10.326 19.0312 10.5 19.0312C10.674 19.0312 10.841 18.9621 10.964 18.839C11.0871 18.716 11.1562 18.549 11.1562 18.375V15.75C11.1562 15.576 11.0871 15.409 10.964 15.286C10.841 15.1629 10.674 15.0938 10.5 15.0938ZM6.32379 13.7484L4.46742 15.604C4.34428 15.7271 4.2751 15.8941 4.2751 16.0683C4.2751 16.2424 4.34428 16.4094 4.46742 16.5326C4.59056 16.6557 4.75757 16.7249 4.93172 16.7249C5.10586 16.7249 5.27288 16.6557 5.39602 16.5326L7.25156 14.6762C7.36944 14.5521 7.43418 14.3869 7.43199 14.2158C7.4298 14.0447 7.36085 13.8812 7.23983 13.7602C7.11882 13.6392 6.95532 13.5702 6.7842 13.568C6.61307 13.5658 6.44786 13.6306 6.32379 13.7484ZM5.90625 10.5C5.90625 10.326 5.83711 10.159 5.71404 10.036C5.59097 9.91289 5.42405 9.84375 5.25 9.84375H2.625C2.45095 9.84375 2.28403 9.91289 2.16096 10.036C2.03789 10.159 1.96875 10.326 1.96875 10.5C1.96875 10.674 2.03789 10.841 2.16096 10.964C2.28403 11.0871 2.45095 11.1562 2.625 11.1562H5.25C5.42405 11.1562 5.59097 11.0871 5.71404 10.964C5.83711 10.841 5.90625 10.674 5.90625 10.5ZM5.39602 4.46742C5.27288 4.34428 5.10586 4.2751 4.93172 4.2751C4.75757 4.2751 4.59056 4.34428 4.46742 4.46742C4.34428 4.59056 4.2751 4.75757 4.2751 4.93172C4.2751 5.01795 4.29209 5.10333 4.32509 5.18299C4.35808 5.26266 4.40645 5.33504 4.46742 5.39602L6.32379 7.25156C6.44786 7.36944 6.61307 7.43418 6.7842 7.43199C6.95532 7.4298 7.11882 7.36085 7.23983 7.23983C7.36085 7.11882 7.4298 6.95532 7.43199 6.7842C7.43418 6.61307 7.36944 6.44786 7.25156 6.32379L5.39602 4.46742Z"
        fill="white"
      />
    </svg>
  );
};

export default Budget;
