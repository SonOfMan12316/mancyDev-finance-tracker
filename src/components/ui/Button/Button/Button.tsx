import React, { ButtonHTMLAttributes, ReactNode, Ref, forwardRef } from "react";
import classnames from "classnames";

export type ButtonVariants = "primary" | "secondary" | "tertiary" | "destroy";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariants;
  disabled?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
}

const Button = forwardRef(
  (
    {
      children,
      className,
      variant = "primary",
      type = "button",
      size = "lg",
      disabled,
      ...rest
    }: ButtonProps,
    ref?: Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        className={classnames(
          className,
          "w-full p-2 font-medium rounded-md hover:opacity-90 focus:outline-none focus:opacity-80 active:-translate-y-0.5 outline-none transition-all",
          { "bg-black text-white hover:bg-ch-grey": variant === "primary" },
          {
            "bg-ch-beige text-black hover:bg-white hover:border-black hover:border":
              variant === "secondary",
          },
          {
            "bg-ch-red text-white": variant === "destroy",
          },
          {
            "opacity-70 hover:opacity-70 hover:translate-y-0 active:translate-y-0 active:scale-100 cursor-not-allowed":
              disabled,
          },
          { "text-base md:text-lg": size === "lg" },
          { "text-sm md:text-base": size === "md" },
          { "text-sm": size === "sm" },
          { "text-xs": size === "xs" }
        )}
        type={type}
        disabled={disabled}
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
