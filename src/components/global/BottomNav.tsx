import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    location.pathname
      .split("/")
      ?.filter((part) => part !== "")[0]
      .replace("-", " ")
  );

  const handleNavClick = (label: string) => {
    setActiveNavItem(label.replace("-", " "));
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
      label: "pots",
      action: () => {
        navigate("/pots");
      },
    },
    {
      icon: <Bill />,
      label: "recurring bills",
      action: () => {
        navigate("/recurring-bills");
      },
    },
  ];

  return (
    <ul className="lg:hidden bg-ch-dark-grey flex items-center h-16 md:h-24 px-4 rounded-t-xl w-screen relative">
      {NavItem.map((i: NavItem, index: number) => (
        <li
          key={index}
          className={classnames(
            "cursor-pointer relative",
            "h-14 md:h-20 flex-1 flex justify-center items-center",
            {
              "absolute top-1 bg-white rounded-t-xl border-b-4 border-ch-green": activeNavItem === i?.label
            }
          )}
          onClick={() => {
            i?.label && handleNavClick(i?.label);
            i?.action && i?.action();
          }}
        >
          <div className="z-10 flex-1 flex flex-col items-center justify-center">
            <div
              className={classnames("", {
                "text-ch-green": activeNavItem === i?.label,
                "text-ch-lighter-grey": activeNavItem !== i?.label,
              })}
            >
              {i?.icon && <>{i?.icon}</>}
            </div>
              <span
                className={`capitalize hidden md:block font-bold text-base pt-2 ${
                  activeNavItem === i?.label
                    ? "text-black"
                    : "text-ch-lighter-grey"
                }`}
              >
                {i?.label}
              </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BottomNav;
