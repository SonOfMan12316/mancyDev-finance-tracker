import React, { ReactNode } from "react";
import { Button } from "../ui/Button/Button";
import { ButtonVariant } from "../ui/Button/Button/Button";
import classnames from "classnames";
import { useClickOutside } from "../../hooks/useClickOutside";
import useUIStore from "../../store/ui-store";

interface PopoverProps {
  isOpen?: boolean;
  setIsOpen: (newState: boolean) => void;
  trigger: ReactNode;
  triggerVariant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  contentPositionY?: "top" | "bottom";
  contentPositionX?: "left" | "right";
  bg?: string;
  hover?: boolean;
}

const Popover: React.FC<PopoverProps> = ({
  isOpen,
  setIsOpen,
  trigger,
  triggerVariant = "tertiary",
  children,
  className,
  contentPositionY = "bottom",
  contentPositionX = "left",
  bg,
  hover,
}) => {
  const { openModal } = useUIStore();
  const popoverRef = useClickOutside(() => {
    if (!openModal) {
      setIsOpen(false);
    }
  });
  return (
    <div className={`w-fit relative ${className}`} ref={popoverRef}>
      <Button
        variant={triggerVariant}
        className="inline-block"
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger}
      </Button>
      {isOpen && (
        <div
          className={classnames(
            `absolute z-20 bg-${
              bg ? bg : "white"
            } rounded-lg transition-all duration-300 ease-in-out px-4`,
            {
              "right-0": contentPositionX === "left",
              "left-0": contentPositionX === "right",
              "top-8": contentPositionY === "bottom",
              "h-fit w-max max-w-[8.375rem] pt-0 ": isOpen,
              "h-0 w-0 overflow-hidden": !isOpen,
              "shadow-budget-popover": !hover,
            }
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;
