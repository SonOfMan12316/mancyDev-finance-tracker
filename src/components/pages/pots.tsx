import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Layout } from "../layout";
import PotCard from "../Pots/potsCard";
import pots from "../../data/pots";
import { Modal, ConfirmDialog } from "../global";
import useUIStore from "../../store/ui-store";
import Input from "../ui/Input/Input";
import { OptionsInterface } from "../../types/global";
import { DollarSign, DropdownIcon } from "../icons";
import Dropdown from "../ui/Dropdown/Select";
import { ThemeOptions } from "../../lib/getSelectOptions";
import { Button } from "../ui/Button/Button";
import PotManagement from "../Pots/potManagement";

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
      const maxAmountAllowed = selectedPot.target - selectedPot.total;
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
      const maxAmountAllowed = selectedPot.total;
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
    if (openModal?.type === "edit" && selectedPot) {
      const matchedTheme = ThemeOptions.find(
        (opt) => opt.value === selectedPot.theme
      );
      setValue("potName", selectedPot.name ?? "");
      setValue("amountTarget", selectedPot.target.toString() ?? "");
      setValue("theme", matchedTheme ?? ThemeOptions[0]);
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
    const addedAmount = amountToAdd || 0;
    setTotalAmount((selectedPot?.total || 0) + addedAmount);
  }, [amountToAdd, selectedPot?.total]);

  useEffect(() => {
    const withdrawnAmount = amountToWithdraw || 0;
    setTotalAmount((selectedPot?.total || 0) - withdrawnAmount);
  }, [amountToWithdraw, selectedPot?.total]);

  const onSubmit = () => {};
  return (
    <Layout
      title="pots"
      displayButton={true}
      buttonTitle="+ Add New Pots"
      onClick={() => setOpenModal({ type: "add" })}
    >
      <div className="px-4 md:px-8 flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-4">
        <>
          {pots.map(({ name, target, total, theme }) => (
            <PotCard
              key={name}
              title={name}
              target={target}
              total={total}
              progressColor={theme}
              pot={pots.find((pot) => pot.name === name) || null}
            />
          ))}
        </>
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
                  ? `Add to '${openModal?.data}'`
                  : openModal?.type === "withdraw"
                    ? `Withdraw from '${openModal?.data}'`
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
              <form onSubmit={handleSubmit(onSubmit)}>
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
                      setCharacterLeft(
                        amountOfCharactersAllowed - value.length
                      );
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
                    usedAsInput={true}
                  />
                  {errors.theme && (
                    <span role="alert" className="text-xs text-ch-red">
                      {errors.theme?.message}
                    </span>
                  )}
                </div>
                <Button
                  onClick={() => setOpenModal(null)}
                  className="mt-3 mb-4"
                >
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
                total={totalAmount}
                target={selectedPot.target}
                progressColor="black"
                targetReachedPercentage={
                  (selectedPot.total / selectedPot.target) * 100
                }
                amountToAdd={amountToAdd}
                amountToWithdraw={amountToWithdraw}
                percentageChange={
                  amountToAdd
                    ? amountToAdd
                      ? (amountToAdd / selectedPot.target) * 100
                      : 0
                    : amountToWithdraw
                      ? (amountToWithdraw / selectedPot.target) * 100
                      : 0
                }
                calculatedProgressColor={
                  amountToAdd ? selectedPot.theme : "red"
                }
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
                    onChange={(e) =>
                      handleWithdrawMoneyOnChange(e.target.value)
                    }
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
          title={`Delete '${openModal?.data}'?`}
          isOpen={openModal?.type === "delete"}
          onCancel={() => setOpenModal(null)}
          message={
            "Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever."
          }
          cancelText="Yes Confirm Deletion"
          confirmText="No, Go Back"
        />
      </div>
    </Layout>
  );
};

export default Pots;
