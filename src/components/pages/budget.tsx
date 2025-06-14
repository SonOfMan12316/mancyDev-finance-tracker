import { useEffect, useState, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MutateOptions, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createBudget } from "../../api/resource/addBudget";
import { Layout } from "../layout";
import loadingLottie from "../../assets/lottie/lottie.json";
import BudgetCard from "../Budgets/budgetCard";
import Modal from "../global/Modal";
import Input from "../ui/Input/Input";
import {
  OptionsInterface,
  budgetInfo,
  transactionInterface,
} from "../../types/global";
import Select from "../ui/Dropdown/Select";
import { DollarSign, DropdownIcon } from "../icons";
import { CategoryOptions, ThemeOptions } from "../../lib/getSelectOptions";
import { Button } from "../ui/Button/Button";
import ConfirmDialog from "../global/ConfirmDialog";
import BudgetSpendingSummaryCard from "../Budgets/BudgetSpendingSummaryCard";
import useUIStore from "../../store/ui-store";

import { queryClient } from "../../App";
import { useBudgets, useBudgetTotals, useTransactions } from "../../hooks";
import Lottie from "lottie-react";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useDeleteBudget } from "../../api/resource/deleteBudget";
import Spinner from "../icons/Spinner";

type BudgetValues = {
  category: OptionsInterface<string> | null;
  maximum: string;
  amount_spent: string;
  theme: OptionsInterface<string> | null;
};

const Budget = () => {
  const [budgets, setBudgets] = useState<budgetInfo[]>([]);
  const { usedThemes } = useBudgetTotals(budgets);
  const [transactions, setTransactions] = useState<transactionInterface[]>([]);
  const { openModal, setOpenModal, selectedBudget } = useUIStore();
  const transactionsQuery = useMemo(
    () => query(collection(db, "transactions"), orderBy("date", "desc")),
    []
  );

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

  const { isLoading } = useBudgets({
    onSuccess(data) {
      setBudgets(data);
    },
    onError(error) {
      toast.error(`${error.message}`);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createBudget,
    onMutate: async (newBudget) => {
      await queryClient.cancelQueries({ queryKey: ["budgets"] });
      const previousBudgets =
        queryClient.getQueryData<budgetInfo[]>(["budgets"]) || [];

      queryClient.setQueryData(["budgets"], (old: budgetInfo[] | undefined) => [
        ...(old || []),
        newBudget,
      ]);

      return { previousBudgets };
    },
    onError: (error: Error, _, context) => {
      toast.error(error.message, { id: "add-budget-err" });
      if (context?.previousBudgets) {
        queryClient.setQueryData(["budgets"], context.previousBudgets);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });

  const handleAddBudget: SubmitHandler<BudgetValues> = (data) => {
    const budgetData = {
      category: data.category?.value || "",
      maximum: data.maximum,
      amount_spent: data.amount_spent,
      theme: data.theme?.value || "",
    };
    mutate(budgetData, {
      onSuccess: () => {
        toast.success("Budget added!");
        setOpenModal(null);
      },
    });
  };

  const mutation = useDeleteBudget();

  const handleDeleteBudget = (budgetId: string) => {
    mutation.mutate(budgetId, {
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ["budgets"] });
        const previousBudgets =
          queryClient.getQueryData<budgetInfo[]>(["budgets"]) || [];

        queryClient.setQueryData(["budgets"], (old: budgetInfo[]) => [...old]);

        return { previousBudgets };
      },
      onSuccess: () => {
        setOpenModal(null);
        queryClient.invalidateQueries({ queryKey: ["budgets"] });
        toast.success("Budget deleted!");
      },
      onError: (error, _, context) => {
        toast.error(`Failed to delete: ${error.message}`);
        if (context?.previousBudgets) {
          queryClient.setQueryData(["budgets"], context.previousBudgets);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["budgets"] });
      },
    } as MutateOptions<
      void,
      Error,
      string,
      { previousBudgets?: budgetInfo[] }
    >);
  };

  useTransactions({
    queryRef: transactionsQuery,
    onSuccess: (data) => setTransactions(data),
    onError: (error) => toast.error(`${error.message}`),
  });

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
      ) : budgets && budgets.length > 0 && !isLoading ? (
        <div className="p-4 md:px-8 flex flex-col lg:grid lg:grid-cols-2 gap-4">
          <BudgetSpendingSummaryCard budgets={budgets} />
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
              transactions={transactions}
            />
          ))}
        </div>
      ) : (
        <div className="py-32 lg:py-40">
          <Lottie
            animationData={loadingLottie}
            loop={true}
            autoplay={true}
            style={{
              height: "100%",
              width: "100%",
              maxHeight: 80,
              maxWidth: 80,
              margin: "0 auto",
            }}
            rendererSettings={{
              preserveAspectRatio: "xMidYMid slice",
            }}
          />
          <p className="text-ch-black text-center text-sm font-normal">
            No budget found.
          </p>
        </div>
      )}
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
              usedThemes={usedThemes}
              showUsedIndicator={true}
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
            disabled={isPending}
          >
            <Spinner isPending={isPending} />
            {openModal?.type === "add" ? "Add Budget" : "Save Changes"}
          </Button>
        </form>
      </Modal>
      <ConfirmDialog
        title={`Delete '${openModal?.data?.title}'?`}
        isOpen={openModal?.type === "delete"}
        onCancel={() => setOpenModal(null)}
        handleConfirm={() => handleDeleteBudget(`${openModal?.data?.id}`)}
        icon={<Spinner isPending={mutation.isPending} />}
        message={
          "Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."
        }
        cancelText="No, Go Back"
        confirmText="Yes Confirm Deletion"
      />
    </Layout>
  );
};

export default Budget;
