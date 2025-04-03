import React from "react";
import classnames from "classnames";
import Button from "../ui/Button/Button";

export interface HeaderProps {
  title?: string | React.ReactNode;
  buttonTitle?: string | React.ReactNode;
  className?: string;
  displayButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  buttonTitle,
  className,
  displayButton,
}) => {
  return (
    <header className={`${className} p-4 lg:px-8 lg:pt-6 w-full`}>
      <div className="text-black flex items-center">
        {title && (
          <h1 className="text-3xl font-extrabold py-2 capitalize font-poppins">
            {title}
          </h1>
        )}
        <Button className={`${displayButton ? "block" : "hidden"}`}>
          {buttonTitle}
        </Button>
      </div>
    </header>
  );
};

export default Header;
