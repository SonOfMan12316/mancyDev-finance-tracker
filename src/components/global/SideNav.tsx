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
import useUIStore from "../../store/sidenavStore";
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

  const handleNavClick = (label: string) => {
    setActiveNavItem(label);
  };

  return (
    <div
      style={{
        width: sidenavState ? "15%" : "5%",
        fontFamily: "Poppins",
      }}
      className={classnames(
        "hidden lg:block bg-black rounded-r-2xl h-screen overflow-x-hidden lg:w-11/12 overflow-y-auto absolute lg:relative z-20 max-w-[5rem] w-1/12 expanded:max-w-[16rem]",
        { "animate-sidebar-expand": sidenavState },
        { "animate-sidebar-collapse": !sidenavState }
      )}
    >
      <div className="w-full h-full py-6 relative flex flex-col">
        <div className="flex items-center ml-5 mt-4">
          <span
            className={classnames(
              "absolute not-italic capitalize font-serif text-xl font-bold text-white",
              "hover:text-red-500 transition-all duration-500 ease-in-out",
              "transform origin-left ml-3",
              {
                "opacity-100 scale-x-100": !sidenavState,
                "opacity-0 scale-x-0": sidenavState,
              }
            )}
          >
            j
          </span>
          <span
            className={classnames(
              "absolute transition-all duration-500 ease-in-out",
              "transform origin-left ml-3",
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
          <ul className="w-full flex flex-col space-y-3 pb-10 relative">
            {navItem?.map((i: NavItem, index: number) => {
              return (
                <li className="capitalize" key={index}>
                  <div
                    className={classnames(
                      "py-3 pl-5 flex cursor-pointer transition-all duration-300 ease-in-out",
                      {
                        "inset-0 bg-ch-beige text-black h-12 w-12 lg:w-11/12 rounded-r-xl border-ch-green border-l-4 transform":
                          activeNavItem === i?.label,
                      }
                    )}
                    onClick={() => {
                      i?.label && handleNavClick(i.label);
                      i?.action && i.action();
                    }}
                  >
                    <div className="flex items-center relative z-10 overflow-hidden ml-3">
                      <div
                        className={classnames(
                          "w-5 flex items-center justify-center",
                          {
                            "text-ch-green": activeNavItem === i?.label,
                            "text-ch-lighter-grey": activeNavItem !== i?.label,
                          }
                        )}
                      >
                        {i?.icon && <>{i?.icon}</>}
                      </div>
                      <span
                        className={classnames(
                          "text-sm font-bold tracking-[-0.04em] pt-1 pl-4 transform origin-left transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap",
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
                "flex space-x-2 transition-all duration-300 ease-in-out ",
                {
                  "opacity-0 w-0": !sidenavState,
                  "opacity-100 w-auto": sidenavState,
                }
              )}
            >
              <ArrowLeft />
              <span className="text-ch-lighter-grey text-sm font-poppins pt-1  whitespace-nowrap">
                Minimize Menu
              </span>
            </span>
            <span
              className={classnames("transition-all duration-300 ease-in-out", {
                "opacity-0 w-0": sidenavState,
                "opacity-100": !sidenavState,
              })}
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
