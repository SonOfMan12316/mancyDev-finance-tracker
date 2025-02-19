import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import classnames from "classnames";

import { Bill, Budget, Home, Saving, Transaction } from "../icons";

interface NavItem {
  icon: ReactNode | null;
  label: string;
  action: () => void;
}

const BottomNav = () => {
  const navigate = useNavigate();

  const [activeNavItem, setActiveNavItem] = useState<string>(
    location.pathname.split("/")?.filter((part) => part !== "")[0]
  );

  const handleNavClick = (label: string) => {
    setActiveNavItem(label);
  };

  const NavItem: Array<NavItem> = [
    {
      icon: <Home />,
      label: "overview",
      action: () => {
        navigate("/overview");
      },
    },
    {
      icon: <Transaction />,
      label: "transaction",
      action: () => {
        navigate("/transaction");
      },
    },
    {
      icon: <Budget />,
      label: "budget",
      action: () => {
        navigate("/budget");
      },
    },
    {
      icon: <Saving />,
      label: "saving",
      action: () => {
        navigate("/saving");
      },
    },
    {
      icon: <Bill />,
      label: "recurring bills",
      action: () => {
        navigate("/recurring-bill");
      },
    },
  ];

  return (
    <ul className="bg-ch-dark-grey flex items-center justify-around h-16 md:h-24 rounded-t-xl w-screen relative">
      {NavItem.map((i: NavItem, index: number) => (
        <li
          key={index}
          className={classnames(
            "cursor-pointer transition-all duration-300 ease-in-out relative",
            {
              "": activeNavItem === i?.label,
            }
          )}
          onClick={() => {
            i?.label && handleNavClick(i?.label);
            i?.action && i?.action();
          }}
        >
          <div className="z-10 relative flex flex-col items-center">
            <div className="pl-4 md:pl-6">
              <>{i?.icon}</>
            </div>
            <div className="mx-auto">
              <span
                className={`capitalize hidden md:block font-bold text-base text-right pt-2 md:pl-6 ${
                  activeNavItem === i?.label
                    ? "text-black"
                    : "text-ch-lighter-grey"
                }`}
              >
                {i?.label}
              </span>
            </div>
          </div>
          {activeNavItem === i?.label && (
            <div className="absolute inset-0 bg-white  h-14 md:h-20 w-12 md:w-28 border-ch-green border-b-8 transform -translate-y-3.5 md:-translate-y-2  md:translate-x-2 rounded-t-xl"></div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BottomNav;
