import { useState, ReactNode } from "react";
import { OptionsInterface } from "../../../types/global";
import { useClickOutside } from "../../../hooks";
import { Button } from "../Button/Button";
import "./Select.css";
import { Checkmark, Download, Filter } from "../../icons";

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
  showSecondSelect?: boolean;
  usedThemes?: Set<string>;
  usedCategories?: Set<string>;
  showUsedIndicator?: boolean;
  responsive?: boolean;
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
  showSecondSelect = false,
  usedThemes = new Set(),
  usedCategories = new Set(),
  showUsedIndicator = false,
  responsive
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

  const [usedItems] = useState(() => new Set([
    ...Array.from(usedThemes),
    ...Array.from(usedCategories),
  ]))

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {label && (
        <label className="text-xs font-bold text-ch-grey capitalize pb-1">
          {label}
        </label>
      )}
      <div>
        {
          responsive && (
            <div
              className="flex justify-between md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {showSecondSelect ? (
                <div>
                  <Filter />
                </div>
              ) : (
                <div>
                  <Download />
                </div>
              )}
            </div>
          )}
          <div className={responsive ? 'hidden md:block' : ''} onClick={() => setIsOpen(!isOpen)}>
            <Button
              variant="action"
              size="lg"
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              className={`flex items-center ${
                isModal ? "justify-between" : ""
              }`}
            >
              <span className="truncate flex items-center font-normal">
                {themeColor && (
                  <div
                    className={`h-4 w-4 rounded-full bg-ch-${
                      selectedOption?.value ? selectedOption?.value : ""
                    } `}
                  ></div>
                )}{" "}
                <span className={themeColor ? "pl-2" : ""}>
                  {selectedOption?.label || placeholder}
                </span>
              </span>

              {icon && (
                <span
                  className={`ml-4 transition-transform duration-500 ${
                    isOpen ? "transform rotate-180" : ""
                  }`}
                >
                  {icon}
                </span>
              )}
            </Button>
          </div>
      </div>

      {isOpen && (
        <ul
          className={`absolute right-0 z-10 mt-1.5 max-h-60 ${
            showSecondSelect ? "min-w-11.063 md:min-w-full" : "min-w-7.125"
          }  w-full overflow-auto rounded-md border  bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
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
              isUsed={showUsedIndicator && usedItems.has(String(option.value))}
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
  isPlaceholder = false,
  themeColor,
  isLast = false,
  placeholder,
  isUsed = false,
}: {
  option: OptionsInterface<T>;
  isSelected: boolean;
  onClick: (option: OptionsInterface<T>) => void;
  className?: string;
  isPlaceholder?: boolean;
  themeColor?: string;
  isLast?: boolean;
  placeholder?: string;
  isUsed?: boolean;
}) => (
  <li
    className={`relative cursor-pointer select-none py-3 mx-4 text-sm flex items-center justify-between ${
      isLast ? "" : "border-b border-ch-grey/0.15"
    } ${isUsed ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    role="option"
    aria-selected={isSelected}
    aria-disabled={isUsed}
    onClick={isUsed ? undefined : () => onClick(option)}
  >
    <span className="truncate flex items-center font-normal text-sm">
      {themeColor && (
        <div
          className={`h-4 w-4 rounded-full bg-ch-${option.value} pl-2`}
        ></div>
      )}{" "}
      <span
        className={
          themeColor ? "pl-2" : option.label === placeholder ? "font-bold" : ""
        }
      >
        {option.label}
      </span>
    </span>
    {isSelected || (isPlaceholder && option.value === placeholder) ? (
      <span className="">
        <Checkmark />
      </span>
    ) : (
      isUsed && <span className="text-xs text-ch-grey">Already Used</span>
    )}
  </li>
);

export default Dropdown;
