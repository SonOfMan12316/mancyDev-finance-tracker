import { useState, ReactNode } from "react";
import { OptionsInterface } from "../../../types/global";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { Button } from "../Button/Button";
import "./Select.css";
import { Checkmark } from "../../icons";

type DropdownProps<T> = {
  label?: string;
  options: OptionsInterface<T>[];
  selectedOption?: OptionsInterface<T> | null;
  onSelect: (option: OptionsInterface<T> | null) => void;
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
  optionClassName?: string;
  includePlaceholderOption?: boolean;
  isModal?: boolean;
  themeColor?: string;
};

const Dropdown = <T extends string | number>({
  options,
  selectedOption,
  onSelect,
  placeholder,
  icon,
  className,
  optionClassName,
  includePlaceholderOption = true,
  label,
  isModal = false,
  themeColor,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useClickOutside(() => {
    setIsOpen(false);
  });

  const handleSelect = (option: OptionsInterface<T> | null) => {
    if (option?.value === "") {
      onSelect(null);
    } else {
      onSelect(option);
    }
    setIsOpen(false);
  };

  const allOptions = [
    ...(includePlaceholderOption
      ? [{ value: "" as T, label: placeholder || "" }]
      : []),
    ...options,
  ];

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {label && (
        <label className="text-xs font-bold text-ch-grey capitalize pb-1">
          {label}
        </label>
      )}
      <Button
        variant="action"
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex items-center ${isModal ? "justify-between" : ""}`}
      >
        <span className="truncate flex items-center font-normal">
          {themeColor && (
            <div
              className={`h-4 w-4 rounded-full bg-${
                selectedOption?.value ? selectedOption?.value : "ch-green"
              } `}
            ></div>
          )}{" "}
          <span className={themeColor ? "pl-2" : ""}>
            {selectedOption?.label || placeholder}
          </span>
        </span>

        {icon && <span className="ml-4">{icon}</span>}
      </Button>

      {isOpen && (
        <ul
          className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          role="listbox"
        >
          {allOptions.map((option, index) => (
            <DropdownItem
              key={String(option.value)}
              option={option}
              isSelected={selectedOption?.value === option.value}
              onClick={handleSelect}
              className={optionClassName}
              isPlaceholder={option.value === ""}
              themeColor={themeColor}
              isLast={index === allOptions.length - 1}
              placeholder={placeholder}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

const DropdownItem = <T extends string | number>({
  option,
  isSelected,
  onClick,
  className = "",
  isPlaceholder = false,
  themeColor,
  isLast = false,
  placeholder,
}: {
  option: OptionsInterface<T>;
  isSelected: boolean;
  onClick: (option: OptionsInterface<T>) => void;
  className?: string;
  isPlaceholder?: boolean;
  themeColor?: string;
  isLast?: boolean;
  placeholder?: string;
}) => (
  <li
    className={`relative cursor-pointer select-none py-3 mx-4 text-sm flex items-center justify-between ${
      isLast ? "" : "border-b border-ch-light-grey"
    } ${
      isPlaceholder ? "text-black font-semibold" : "hover:bg-gray-100"
    } ${className}`}
    role="option"
    aria-selected={isSelected}
    onClick={() => onClick(option)}
  >
    <span className="truncate flex items-center font-normal text-sm">
      {themeColor && (
        <div className={`h-4 w-4 rounded-full bg-${option.value} pl-2`}></div>
      )}{" "}
      <span className={themeColor ? "pl-2" : ""}>{option.label}</span>
    </span>
    {(isSelected || (isPlaceholder && option.value === placeholder)) && (
      <span className="">
        <Checkmark />
      </span>
    )}
  </li>
);

export default Dropdown;
