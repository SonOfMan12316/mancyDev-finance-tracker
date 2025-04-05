import { useState, ReactNode } from "react";
import { OptionsInterface } from "../../../types/global";
import { useClickOutside } from "../../../hooks/useClickOutside";

type DropdownProps<T> = {
  options: OptionsInterface<T>[];
  selectedOption?: OptionsInterface<T> | null;
  onSelect: (option: OptionsInterface<T> | null) => void;
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
  optionClassName?: string;
  includePlaceholderOption?: boolean;
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
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm hover:bg-gray-50 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">{selectedOption?.label || placeholder}</span>

        {icon && <span className="ml-2">{icon}</span>}
      </button>

      {isOpen && (
        <ul
          className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          role="listbox"
        >
          {allOptions.map((option) => (
            <DropdownItem
              key={String(option.value)}
              option={option}
              isSelected={selectedOption?.value === option.value}
              onClick={handleSelect}
              className={optionClassName}
              isPlaceholder={option.value === ""}
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
}: {
  option: OptionsInterface<T>;
  isSelected: boolean;
  onClick: (option: OptionsInterface<T>) => void;
  className?: string;
  isPlaceholder?: boolean;
}) => (
  <li
    className={`relative cursor-pointer select-none py-2 lg:py-4 pl-3 pr-4 ${
      isPlaceholder ? "text-black font-semibold" : "hover:bg-gray-100"
    } ${isSelected ? "bg-gray-100 font-semibold" : ""} ${className}`}
    role="option"
    aria-selected={isSelected}
    onClick={() => onClick(option)}
  >
    <span className="block truncate">{option.label}</span>
    {isSelected && !isPlaceholder && (
      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
        ✓
      </span>
    )}
    <div className="border-b border-ch-light-grey py-1"></div>
  </li>
);

export default Dropdown;
