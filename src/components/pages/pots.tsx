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
import { ThemeOptions, PotOptions } from "../../lib/getSelectOptions";
import { Button } from "../ui/Button/Button";

type PotValues = {
  potName: string;
  amountTarget: string;
  theme: OptionsInterface<string> | null;
};

const Pots = () => {
  const { openModal, setOpenModal, selectedPot } = useUIStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<PotValues>({
    defaultValues: {
      potName: "",
      amountTarget: "",
      theme: null,
    },
  });
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
          isOpen={openModal?.type === "add" || openModal?.type === "edit"}
          title={openModal?.type === "add" ? "Add New Pot" : "Edit Pot"}
          onClose={() => setOpenModal(null)}
        >
          <div className="my-3">
            <h1 className="text-ch-grey text-sm font-normal">
              {openModal?.type === "add"
                ? "Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
                : "If your saving targets change, feel free to update your pots."}
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                typeOfInput="modal"
                variant="primary"
                label="Pot Name"
                placeholder="e.g. Rainy Days"
                {...register("potName", {
                  valueAsNumber: true,
                  required: "Pot Name is required",
                })}
                defaultValue={watch("potName")}
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
                  valueAsNumber: true,
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
                defaultValue={watch("amountTarget")}
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
            <Button onClick={() => setOpenModal(null)} className="mt-2">
              {openModal?.type === "add" ? "Add Pot" : "Save Changes"}
            </Button>
          </form>
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
