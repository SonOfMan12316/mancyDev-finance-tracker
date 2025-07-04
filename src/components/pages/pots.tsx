import { useEffect, useState, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import { createPot } from "../../api/resource/addPot";
import { Layout } from "../layout";
import PotCard from "../Pots/potsCard";
import { Modal, ConfirmDialog, LottieLoader, EmptyLottie } from "../global";
import useUIStore from "../../store/ui-store";
import Input from "../ui/Input/Input";
import { OptionsInterface, potInfo } from "../../types/global";
import { DollarSign, DropdownIcon } from "../icons";
import Dropdown from "../ui/Dropdown/Select";
import { ThemeOptions } from "../../lib/getSelectOptions";
import { Button } from "../ui/Button/Button";
import PotManagement from "../Pots/potManagement";
import { queryClient } from "../../App";
import Spinner from "../icons/Spinner";
import usePots from "../../hooks/usePots";
import { useBudgetTotals } from "../../hooks";

type PotValues = {
  potName: string;
  amountTarget: string;
  theme: OptionsInterface<string> | null;
  amountToAdd: string;
  amountToWithdraw: string;
};

const Pots = () => {
  const { openModal, setOpenModal, selectedPot } = useUIStore();
  const [totalAmount, setTotalAmount] = useState(selectedPot?.total || 0);
  const amountOfCharactersAllowed = 30;
  const [characterLeft, setCharacterLeft] = useState<number>(
    amountOfCharactersAllowed
  );
  const [pots, setPots] = useState<potInfo[]>([]);

  const { usedPotThemes } = useBudgetTotals(undefined, pots);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<PotValues>({
    defaultValues: {
      potName: "",
      amountTarget: "",
      theme: null,
      amountToAdd: "",
      amountToWithdraw: "",
    },
  });

  const amountToAdd = useMemo(() => {
    const watchedValue = watch("amountToAdd");
    return watchedValue ? parseFloat(watchedValue) || 0 : 0;
  }, [watch("amountToAdd")]);

  const amountToWithdraw = useMemo(() => {
    const watchedValue = watch("amountToWithdraw");
    return watchedValue ? parseFloat(watchedValue) || 0 : 0;
  }, [watch("amountToWithdraw")]);

  const handleAddMoneyOnChange = (newValue: number) => {
    if (selectedPot) {
      const maxAmountAllowed =
        Number(selectedPot.target) - Number(selectedPot.total);
      if (newValue > maxAmountAllowed) {
        toast.error(`Maximum amount allowed is ${maxAmountAllowed}`, {
          id: "max-added-amount-exceed",
        });
        setValue("amountToAdd", maxAmountAllowed.toString());
      } else {
        setValue("amountToAdd", newValue.toString().replace(/\D/g, ""));
      }
    }
  };

  const handleWithdrawMoneyOnChange = (newValue: number) => {
    if (selectedPot) {
      const maxAmountAllowed = Number(selectedPot.total);
      if (newValue > maxAmountAllowed) {
        toast.error(`Maximum amount allowed is ${maxAmountAllowed}`, {
          id: "max-withdrawn-amount-exceed",
        });
        setValue("amountToWithdraw", maxAmountAllowed.toString());
      } else {
        setValue("amountToWithdraw", newValue.toString().replace(/\D/g, ""));
      }
    }
  };

  useEffect(() => {
    if (openModal?.type === "edit" && openModal.data?.id) {
      const pot = queryClient
        .getQueryData<potInfo[]>(["pots"])
        ?.find((pot) => pot.id === openModal.data?.id);

      if (pot) {
        const matchedTheme = ThemeOptions.find(
          (opt) => opt.value === pot.theme
        );

        setValue("potName", pot.name ?? "");
        setValue("amountTarget", pot.target.toString() ?? "");
        setValue("theme", matchedTheme || null);
      }
    } else if (openModal?.type === "add") {
      setValue("potName", "");
      setValue("amountTarget", "");
      setValue("theme", {
        label: ThemeOptions[0].label,
        value: ThemeOptions[0].value,
      });
    }
  }, [openModal, selectedPot, setValue]);

  useEffect(() => {
    const addedAmount = Number(amountToAdd) || 0;
    setTotalAmount((Number(selectedPot?.total) || 0) + addedAmount);
  }, [amountToAdd, selectedPot?.total]);

  useEffect(() => {
    const withdrawnAmount = Number(amountToWithdraw) || 0;
    setTotalAmount((Number(selectedPot?.total) || 0) - withdrawnAmount);
  }, [amountToWithdraw, selectedPot?.total]);

  const { mutate: addOrEditPot, isPending } = useMutation<
    potInfo,
    Error,
    Omit<potInfo, "id"> & { id?: string }
  >({
    mutationFn: async (data) => {
      if (data.id) {
        await updateDoc(doc(db, "pots", data.id), {
          name: data.name,
          target: data.target,
          total: data.total,
          theme: data.theme,
        });
        return { ...data, id: data.id };
      } else {
        return await createPot(data);
      }
    },
    onSuccess: (updatedPot, variables) => {
      queryClient.setQueryData<potInfo[]>(["pots"], (current = []) => {
        if (variables.id) {
          return current.map((pot) =>
            pot.id === variables.id ? updatedPot : pot
          );
        } else {
          return [...current, updatedPot];
        }
      });
      toast.success(variables.id ? "Pot updated!" : "Pot added!");
      setOpenModal(null);
    },
    onError: (error: Error, variables) => {
      toast.error(error.message, {
        id: variables.id ? "edit-pot-err" : "add-pot-err",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
  });

  const { isLoading } = usePots({
    onSuccess(data) {
      setPots(data);
    },
    onError(error) {
      toast.error(`${error.message}`);
    },
  });

  const handleSubmitBudget: SubmitHandler<PotValues> = (data) => {
    const potData = {
      name: data.potName || "",
      target: data.amountTarget,
      total: data.amountToAdd
        ? data.amountToAdd + data.amountTarget
        : data.amountTarget + data.amountToWithdraw,
      theme: data.theme?.value || "",
      ...(openModal?.type === "edit" && { id: openModal.data?.id }),
    };

    addOrEditPot(potData);
  };

  return (
    <Layout
      title="pots"
      displayButton={true}
      buttonTitle="+ Add New Pots"
      onClick={() => setOpenModal({ type: "add" })}
    >
      {isLoading ? (
        <LottieLoader />
      ) : pots.length > 0 ? (
        <div className="px-4 md:px-8 flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-4">
          <>
            {pots.map(({ name, target, total, theme }) => (
              <PotCard
                key={name}
                title={name}
                target={Number(target)}
                total={Number(total)}
                progressColor={theme}
                pot={pots.find((pot) => pot.name === name) || null}
              />
            ))}
          </>
        </div>
      ) : (
        <div className="pt-32 lg:pt-40">
          <EmptyLottie />
          <p className="text-ch-black text-center text-sm font-normal">
            No budget found.
          </p>
        </div>
      )}
      <Modal
        isOpen={
          openModal?.type === "add" ||
          openModal?.type === "edit" ||
          openModal?.type === "addMoney" ||
          openModal?.type === "withdraw"
        }
        title={
          openModal?.type === "add"
            ? "Add New Pot"
            : openModal?.type === "edit"
              ? "Edit Pot"
              : openModal?.type === "addMoney"
                ? `Add to '${openModal?.data?.title}'`
                : openModal?.type === "withdraw"
                  ? `Withdraw from '${openModal?.data?.title}'`
                  : ""
        }
        onClose={() => {
          setOpenModal(null);
          setValue("amountToAdd", "");
          setValue("amountToWithdraw", "");
        }}
        modalHeader={
          openModal?.type === "add"
            ? "Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
            : openModal?.type === "edit"
              ? "If your saving targets change, feel free to update your pots."
              : openModal?.type === "addMoney"
                ? "Add money to your pot to keep it seperate from your main balance. As soon as you add this money, it will be deducted from your current balance"
                : openModal?.type === "withdraw"
                  ? "Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot."
                  : ""
        }
      >
        {openModal?.type === "add" || openModal?.type === "edit" ? (
          <>
            <form onSubmit={handleSubmit(handleSubmitBudget)}>
              <div>
                <Input
                  typeOfInput="normal"
                  variant="primary"
                  label="Pot Name"
                  placeholder="e.g. Rainy Days"
                  {...register("potName", {
                    required: "Pot Name is required",
                  })}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (value.length > amountOfCharactersAllowed) {
                      value = value.slice(0, amountOfCharactersAllowed);
                    }
                    setValue("potName", value);
                    setCharacterLeft(amountOfCharactersAllowed - value.length);
                    if (value.length === amountOfCharactersAllowed) {
                      setCharacterLeft(0);
                    }
                  }}
                  showAmountOfCharacterAllowed={true}
                  amountOfCharactersAllowed={characterLeft}
                />
                {errors.potName && (
                  <span role="alert" className="text-xs text-ch-red">
                    {errors.potName?.message}
                  </span>
                )}
              </div>
              <div className="mt-3">
                <Input
                  typeOfInput="modal"
                  variant="primary"
                  label="Target"
                  placeholder="e.g. 2000"
                  icon={<DollarSign />}
                  placement="start"
                  {...register("amountTarget", {
                    required: "Target amount is required",
                    min: { value: 1, message: "Amount must be positive" },
                  })}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, "");
                    setValue("amountTarget", rawValue, {
                      shouldValidate: true,
                    });
                    e.target.value = rawValue;
                  }}
                />
                {errors.amountTarget && (
                  <span role="alert" className="text-xs text-ch-red">
                    {errors.amountTarget?.message}
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
                  responsive={false}
                  showUsedIndicator={true}
                  usedThemes={usedPotThemes}
                />
                {errors.theme && (
                  <span role="alert" className="text-xs text-ch-red">
                    {errors.theme?.message}
                  </span>
                )}
              </div>
              <Button
                type="submit"
                onClick={() => handleSubmitBudget}
                className="mt-3 mb-4"
                disabled={isPending}
              >
                <Spinner isPending={isPending} />
                {openModal?.type === "add" ? "Add Pot" : "Save Changes"}
              </Button>
            </form>
          </>
        ) : (openModal?.type === "addMoney" ||
            openModal?.type === "withdraw") &&
          selectedPot ? (
          <>
            <PotManagement
              title={selectedPot.name}
              total={Number(totalAmount)}
              target={Number(selectedPot.target)}
              progressColor="black"
              targetReachedPercentage={
                (Number(selectedPot.total) / Number(selectedPot.target)) * 100
              }
              amountToAdd={amountToAdd}
              amountToWithdraw={amountToWithdraw}
              percentageChange={
                amountToAdd
                  ? amountToAdd
                    ? (amountToAdd / Number(selectedPot.target)) * 100
                    : 0
                  : amountToWithdraw
                    ? (amountToWithdraw / Number(selectedPot.target)) * 100
                    : 0
              }
              calculatedProgressColor={amountToAdd ? selectedPot.theme : "red"}
              modalCardHeader="New Amount"
            />
            <div className="mt-6 mb-2">
              {openModal?.type === "addMoney" ? (
                <Input
                  typeOfInput="modal"
                  variant="primary"
                  label="Amount To Add"
                  icon={<DollarSign />}
                  placeholder="400"
                  {...register("amountToAdd", {
                    required: "Amount to add is required",
                  })}
                  onChange={(e) => handleAddMoneyOnChange(e.target.value)}
                />
              ) : (
                <Input
                  typeOfInput="modal"
                  variant="primary"
                  label="Amount To Withdraw"
                  icon={<DollarSign />}
                  placeholder="400"
                  {...register("amountToWithdraw", {
                    required: "Amount to withdraw is required",
                  })}
                  onChange={(e) => handleWithdrawMoneyOnChange(e.target.value)}
                />
              )}
            </div>
            <Button
              onClick={() => setOpenModal(null)}
              disabled={
                (amountToAdd || selectedPot?.total) >= selectedPot?.target
              }
              className="mt-3 mb-4"
            >
              {openModal?.type === "addMoney"
                ? "Confirm Addition"
                : "Confirm Withdrawal"}
            </Button>
          </>
        ) : (
          <></>
        )}
      </Modal>
      <ConfirmDialog
        title={`Delete '${openModal?.data?.title}'?`}
        isOpen={openModal?.type === "delete"}
        onCancel={() => setOpenModal(null)}
        message={
          "Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever."
        }
        cancelText="Yes Confirm Deletion"
        confirmText="No, Go Back"
      />
    </Layout>
  );
};

export default Pots;
