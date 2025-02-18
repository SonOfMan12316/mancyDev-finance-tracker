import React, { useState, ReactNode, useEffect, ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useClickOutside } from "../../hooks/useClickOutside";
import { Home, Transaction, Budget, Saving, Bill, ArrowLeft } from "../icons";
import { shallow } from "zustand/shallow";
import classnames from "classnames";
import { useUIStore } from "../../store/ui";
import Logo from "./Logo";

interface NavItem {
  icon: ReactNode | null;
  label: string;
  action?: () => void;
}

const SideNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItem: Array<NavItem> = [
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

  const [activeNavItem, setActiveNavItem] = useState<string>(
    location.pathname.split("/")?.filter((part) => part !== "")[0]
  );

  const sidenavRef = useClickOutside(() => {
    // updateSidenavState(false);
  });

  const handleNavClick = (label: string) => {
    setActiveNavItem(label);
  };

  // const { sidenavState, updateSidenavState } = useUIStore((state) => ({
  //   sidenavState: state.sidenavState,
  //   updateSidenavState: state.updateSidenavState,
  // }));

  // useEffect(() => {}, [sidenavState]);

  return (
    <div
      ref={sidenavRef}
      style={{ minWidth: "17.5rem", width: "17%" }}
      className={classnames(
        "hidden lg:block bg-black rounded-r-3xl h-screen overflow-x-hidden overflow-y-auto absolute lg:relative lg:ml-0 transition-[margin-left] duration-700 z-20"
        // { "ml-0": sidenavState },
        // { "-ml-[100%]": !sidenavState }
      )}
    >
      <div className="w-full h-full py-6 relative flex flex-col">
        <div className="flex items-center ml-6">
          <Logo />
        </div>
        <nav
          style={{ height: "calc(100vh - 10rem)" }}
          className="w-full flex flex-col justify-between py-14"
        >
          <ul className="w-full flex flex-col space-y-1 pb-10 relative">
            {navItem?.map((i: NavItem, index: number) => {
              return (
                <li className="capitalize" key={index}>
                  <div
                    className={classnames(
                      "py-3 pl-10 flex cursor-pointer transition-all duration-300 ease-in-out",
                      {
                        "inset-0 bg-ch-beige text-black h-12  w-12 lg:w-11/12 rounded-r-xl border-ch-green border-l-4 transform":
                          activeNavItem === i?.label,
                      }
                    )}
                    onClick={() => {
                      i?.label && handleNavClick(i.label);
                      i?.action && i.action();
                    }}
                  >
                    <div className="flex items-center relative z-10">
                      <div
                        className={classnames(
                          "w-5 flex items-center justify-center p-1"
                        )}
                      >
                        {i?.icon && <>{i?.icon}</>}
                      </div>
                      <span
                        className={classnames(
                          "text-sm md:text-base tracking-[-0.04em] pl-3",
                          {
                            "text-black": activeNavItem === i?.label,
                            "text-white": activeNavItem !== i?.label,
                          }
                        )}
                      >
                        {i?.label}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex space-x-4 ml-10">
          <ArrowLeft />
          <span className="text-ch-lighter-grey">Minimize Menu</span>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
