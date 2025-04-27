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
      label: "transactions",
      action: () => {
        navigate("/transactions");
      },
    },
    {
      icon: <Budget />,
      label: "budgets",
      action: () => {
        navigate("/budgets");
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
    <ul className="lg:hidden bg-ch-dark-grey flex items-center justify-around h-16 md:h-24 rounded-t-xl w-screen relative">
      {NavItem.map((i: NavItem, index: number) => (
        <li
          key={index}
          className={classnames(
            "cursor-pointer transition-all duration-300 ease-in-out relative",
            "h-14 md:h-20", // Set fixed height for consistent positioning
            {
              "": activeNavItem === i?.label,
            }
          )}
          onClick={() => {
            i?.label && handleNavClick(i?.label);
            i?.action && i?.action();
          }}
        >
          <div className="z-10 relative flex flex-col items-center h-full justify-center">
            <div
              className={classnames("pl-4 md:pl-6", {
                "text-ch-green": activeNavItem === i?.label,
                "text-ch-lighter-grey": activeNavItem !== i?.label,
              })}
            >
              {i?.icon && <>{i?.icon}</>}
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

          {/* Active Indicator */}
          {activeNavItem === i?.label && (
            <span className="absolute inset-x-0 -bottom-1 top-0 bg-white px-4 w-16 md:w-32 border-ch-green border-b-8 rounded-t-xl z-0" />
          )}
        </li>
      ))}
    </ul>
  );
};

export default BottomNav;
