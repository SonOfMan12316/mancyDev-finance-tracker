import React, {
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useRef,
} from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { mergeRefs } from "react-merge-refs";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  icon?: string | ReactNode;
  placement?: "start" | "end";
  type?: string;
  variant?: "primary";
  onChange?: (...args: any[]) => any;
}

const Input: React.FC<InputProps> = forwardRef((props, ref) => {
  const {
    className,
    placeholder,
    icon = null,
    placement = "start",
    onChange,
    type,
    variant = "primary",
    required,
    ...rest
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    return null;
  };

  return (
    <label className={classnames(className, "flex flex-col items-start")}>
      <div
        className={classnames("w-full h-fit relative rounded-md", {
          "bg-white border border-ch-lighter-beige focus-within:ring-ch-tertiary/30 focus-within:ring-2":
            variant === "primary",
        })}
      >
        {icon && (
          <span
            className={classnames("absolute -translate-y-1/2 top-1/3", {
              "font-medium": typeof icon === "string",
              "ml-4 left-0": placement === "start",
              "mr-4 right-0": placement === "end",
            })}
          >
            {icon}
          </span>
        )}
        <input
          className={classnames(
            "w-full h-11 px-6 text-ch-lighter-beige text-sm focus:outline-none outline-none placeholder:text-xs rounded-md",
            {
              "!pl-12": icon && placement === "start",
              "!pr-12": icon && placement === "end",
              "placeholder:text-ch-lighter-beige": variant === "primary",
            }
          )}
          placeholder={placeholder}
          onChange={handleOnChange}
          type={type}
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          {...rest}
        />
      </div>
    </label>
  );
});

Input.displayName = "Input";

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  placeholder: PropTypes.string,
  icon: PropTypes.any,
  placement: PropTypes.oneOf(["start", "end"]),
  type: PropTypes.string,
  variant: PropTypes.oneOf([
    "primary",
    "naked",
    "feint",
    "grey",
    "serene",
    "fill",
  ]),
  onChange: PropTypes.func,
  tooltipInfo: PropTypes.string,
  required: PropTypes.bool,
  extraRef: PropTypes.any,
};

export default Input;
