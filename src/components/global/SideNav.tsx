import React, { useState, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useClickOutside } from "../../hooks/useClickOutside";
import { Home, Transaction, Budget, Saving, Bill } from "../icons";
import { shallow } from "zustand/shallow";
import classnames from "classnames";
import { useUIStore } from "../../store/ui";

interface NavItem {
  icon: ReactNode | null;
  label: string;
  action?: () => void;
}

const SideNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  const { sidenavState, updateSidenavState } = useUIStore((state) => ({
    sidenavState: state.sidenavState,
    updateSidenavState: state.updateSidenavState,
    shallow,
  }));

  const [activeNavItem, setActiveNavItem] = useState<string>(
    location.pathname.split("/")?.filter((part) => part !== "")[0]
  );

  const sidenavRef = useClickOutside(() => {
    updateSidenavState(false);
  });

  const handleNavClick = (label: string) => {
    setActiveNavItem(label);
  };

  return (
    <div
      className={classnames(
        "bg-black w-[17%] min-w-[17.5rem] h-screen overflow-x-hidden overflow-y-auto absolute lg:relative lg:ml-0 transition-[margin-left] duration-700 z-20",
        { "ml-0": sidenavState },
        { "-ml-[100%]": !sidenavState }
      )}
    >
      <div>bhbubhjk</div>
    </div>
  );
};

export default SideNav;
