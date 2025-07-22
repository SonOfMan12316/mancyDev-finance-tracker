import React from "react";
import { Button } from "../ui/Button/Button";
import HeaderProfile from "./HeaderProfile";

export interface HeaderProps {
  title?: string | React.ReactNode;
  buttonTitle?: string | React.ReactNode;
  className?: string;
  displayButton?: boolean;
  onClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  buttonTitle,
  displayButton,
  onClick,
}) => {
  return (
    <header className={`p-4 md:px-8 lg:pt-6 w-full`}>
      <div className="text-black flex justify-between items-center">
        <div>
          {title && (
            <h1 className="text-xl lg:text-3xl font-bold py-2 capitalize font-publicSans">
              {title}
            </h1>
          )}
        </div>
        <div className="flex items-center space-x-4 px-2">
          <HeaderProfile />
          <Button
            size="xs"
            variant="primary"
            onClick={onClick}
            className={`${displayButton ? "block" : "hidden"}`}
          >
            {buttonTitle}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
