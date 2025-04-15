import classnames from "classnames";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "action" | "destroy";
type ButtonSize = "lg" | "md" | "sm" | "xs";
type IconPlacement = "start" | "end";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  placement?: IconPlacement;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      children,
      icon,
      placement = "start",
      disabled = false,
      type = "button",
      ...rest
    },
    ref
  ) => {
    // Base classes that apply to all buttons
    const baseClasses = classnames(
      "relative",
      "w-full",
      "p-2",
      "font-medium",
      "rounded-md",
      "focus:outline-none",
      "outline-none",
      "transition-all",
      {
        "opacity-70 hover:opacity-70 hover:translate-y-0 active:translate-y-0 active:scale-100 cursor-not-allowed":
          disabled,
      },
      { "text-base md:text-lg px-6": size === "lg" },
      { "text-sm md:text-base w-10": size === "md" },
      { "text-sm": size === "sm" },
      { "text-xs": size === "xs" }
    );

    // Variant-specific classes
    const variantClasses = {
      primary:
        "bg-black text-white hover:bg-ch-grey hover:opacity-90 focus:opacity-80 active:-translate-y-0.5",
      secondary:
        "bg-ch-beige text-black hover:bg-white hover:border-black hover:border hover:opacity-90 focus:opacity-80 active:-translate-y-0.5",
      action:
        "flex items-center justify-center border-1 border-ch-lighter-beige py-2 shadow-sm h-10",
      destroy:
        "bg-ch-red text-white hover:opacity-90 focus:opacity-80 active:-translate-y-0.5",
    };

    return (
      <button
        className={classnames(baseClasses, variantClasses[variant], className)}
        type={type}
        disabled={disabled}
        ref={ref}
        {...rest}
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
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
