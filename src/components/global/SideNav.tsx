import { useState, ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Transaction,
  Budget,
  Saving,
  Bill,
  ArrowLeft,
  ArrowRight,
} from "../icons";
import classnames from "classnames";
import useUIStore from "../../store/ui-store";
import Logo from "./Logo";

interface NavItem {
  icon: ReactElement;
  label: string;
  action?: () => void;
}

const SideNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const sidenavState = useUIStore((state) => state.sidenavState);
  const updateSidenavState = useUIStore((state) => state.updateSidenavState);

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

  const [activeNavItem, setActiveNavItem] = useState<string>(
    location.pathname
      .split("/")
      ?.filter((part) => part !== "")[0]
      .replace("-", " ")
  );

  const handleNavClick = (label: string) => {
    setActiveNavItem(label);
  };

  return (
    <div
      className={classnames(
        "hidden lg:block  bg-black rounded-r-2xl h-screen overflow-x-hidden overflow-y-auto absolute lg:relative z-20",
        "transition-all duration-300 ease-in-out",
        { "min-w-14 w-1/6": sidenavState },
        { "min-w-5.5 w-5.5": !sidenavState }
      )}
    >
      <div className="w-full h-full py-6 relative flex flex-col">
        <div className="flex items-center ml-5 mt-4">
          <span
            className={classnames(
              "transition-all duration-500 ease-in-out",
              "transform origin-left ml-4",
              {
                "opacity-100 scale-x-100": !sidenavState,
                "opacity-0 scale-x-0": sidenavState,
              }
            )}
          >
            <svg
              width="14"
              height="22"
              viewBox="0 0 14 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.95201 21.44H2.93601V10.24H0.76001V5.312H3.06401C3.70401 2.272 6.68001 0 11.96 0H13.24V4.288H11C9.33601 4.288 8.53601 4.448 8.56801 5.312H13.24V10.24H8.95201V21.44Z"
                fill="white"
              />
            </svg>
          </span>
          <span
            className={classnames(
              "absolute transition-all duration-500 ease-in-out",
              "transform origin-left ml-3 font-publicSans",
              {
                "opacity-100 scale-x-100": sidenavState,
                "opacity-0 scale-x-0": !sidenavState,
              }
            )}
          >
            <Logo />
          </span>
        </div>
        <nav
          style={{ height: "calc(100vh - 6rem)" }}
          className="w-full flex flex-col justify-between py-14 pb-10"
        >
          <ul className="w-full flex flex-col space-y-3 pb-10 relative font-publicSans">
            {navItem?.map((i: NavItem, index: number) => {
              return (
                <li className="capitalize " key={index}>
                  <div
                    className={classnames(
                      "py-3 pl-5 flex cursor-pointer transition-all duration-300 ease-in-out",
                      {
                        "inset-0 bg-ch-beige text-black h-12 w-12 lg:w-11/12 rounded-r-lg border-ch-green border-l-4 transform":
                          activeNavItem === i?.label,
                      }
                    )}
                    onClick={() => {
                      i?.label && handleNavClick(i.label);
                      i?.action && i.action();
                    }}
                  >
                    <div className="flex items-center relative z-10 overflow-hidden ml-3">
                      <span
                        className={classnames(
                          "w-5 flex items-center hover:text-white justify-center",
                          {
                            "text-ch-green": activeNavItem === i?.label,
                            "text-ch-lighter-grey": activeNavItem !== i?.label,
                          }
                        )}
                      >
                        {i?.icon && <>{i?.icon}</>}
                      </span>
                      <span
                        className={classnames(
                          "text-sm font-publicSans font-bold hover:text-white tracking-[-0.04em] pt-1 pl-4 transform origin-left transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap",
                          {
                            "scale-x-0 opacity-0 w-0": !sidenavState,
                            "scale-x-100 opacity-100": sidenavState,
                            "text-black": activeNavItem === i?.label,
                            "text-ch-lighter-grey": activeNavItem !== i?.label,
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
        <div className="ml-8 relative h-[30px]">
          <button
            className="absolute inset-0 flex items-center"
            onClick={() => updateSidenavState(false)}
          >
            <span
              className={classnames(
                "flex space-x-2 transition-all text-ch-lighter-grey hover:text-white duration-300 ease-in-out ",
                {
                  "opacity-0 w-0": !sidenavState,
                  "opacity-100 w-auto": sidenavState,
                }
              )}
            >
              <ArrowLeft />
              <span className="text-ch-lighter-grey text-sm font-publicSans pt-1 hover:text-white whitespace-nowrap">
                Minimize Menu
              </span>
            </span>
            <span
              className={classnames(
                "transition-all duration-300 hover:text-white ease-in-out",
                {
                  "opacity-0 w-0": sidenavState,
                  "opacity-100": !sidenavState,
                }
              )}
            >
              <ArrowRight />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
