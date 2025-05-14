import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
  const amountToAdd = parseInt(watch("amountToAdd"));
  const amountToWithdraw = parseInt(watch("amountToWithdraw"));

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
      <div className="px-4 lg:px-6 flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-4">
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
                percentageChange={(amountToAdd / selectedPot.target) * 100}
                calculatedProgressColor={selectedPot.theme}
                modalCardHeader="New Amount"
              />
              <div className="mt-6 mb-2">
                {openModal?.type === "addMoney" ? (
                  <>
                    <Input
                      typeOfInput="modal"
                      variant="primary"
                      label="Amount To Add"
                      icon={<DollarSign />}
                      placeholder="400"
                      {...register("amountToAdd", {
                        required: "Amount to add is required",
                      })}
                    />
                    {errors?.amountToAdd && (
                      <span role="alert" className="text-xs text-ch-red">
                        {errors.amountToAdd?.message}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <Input
                      typeOfInput="modal"
                      variant="primary"
                      label="Amount To Withdraw"
                      icon={<DollarSign />}
                      placeholder="400"
                      {...register("amountToWithdraw", {
                        required: "Amount to withdraw is required",
                      })}
                    />
                    {errors?.amountToWithdraw && (
                      <span role="alert" className="text-xs text-ch-red">
                        {errors.amountToWithdraw?.message}
                      </span>
                    )}
                  </>
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
