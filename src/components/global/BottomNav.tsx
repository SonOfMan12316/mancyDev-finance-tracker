import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import classnames from "classnames";

import { useUIStore } from "../../store/ui";
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
  // const { bottomnavState, updateBottomnavState } = useUIStore(
  //   (state) => ({
  //     bottomnavState: state.bottomnavState,
  //     updateBottomnavState: state.updateBottomnavState,
  //   }),
  //   shallow
  // );

  const handleNavClick = (label: string) => {
    setActiveNavItem(label);
  };

  useEffect(() => {
    console.log(activeNavItem);
  }, [activeNavItem]);

  const NavItem: Array<NavItem> = [
    {
      icon: <Home />,
      label: "Overview",
      action: () => {
        navigate("/overview");
      },
    },
    {
      icon: <Transaction />,
      label: "Transactions",
      action: () => {
        navigate("/transaction");
      },
    },
    {
      icon: <Budget />,
      label: "Budgets",
      action: () => {
        navigate("/budget");
      },
    },
    {
      icon: <Saving />,
      label: "Savings",
      action: () => {
        navigate("/saving");
      },
    },
    {
      icon: <Bill />,
      label: "Recurring Bills",
      action: () => {
        navigate("/bill");
      },
    },
  ];

  return (
    <ul className="bg-ch-dark-grey flex items-center justify-around h-16 rounded-t-xl w-screen">
      {NavItem.map((i: NavItem, index: number) => (
        <li key={index}>
          <div
            className={classnames(
              "cursor-pointer transition-all duration-300 ease-in-out",
              {
                "bg-[#E2EDF9]": activeNavItem === i?.label,
              }
            )}
            onClick={() => {
              i?.label && handleNavClick(i?.label);
              i?.action && i?.action();
            }}
          >
            <>{i.icon}</>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BottomNav;
