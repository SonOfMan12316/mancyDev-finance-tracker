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
        minWidth: sidenavState ? "16.5rem" : "4rem",
        width: sidenavState ? "17%" : "7.2%",
        transitionProperty: "margin-left",
        transitionDuration: "150ms",
      }}
      className={classnames(
        "hidden lg:block bg-black rounded-r-3xl h-screen overflow-x-hidden lg:w-11/12 overflow-y-auto absolute lg:relative transition  duration-700 z-20 ease-in-out",
        { "ml-0": sidenavState },
        { "-ml-100": !sidenavState }
      )}
    >
      <div className="w-full h-full py-6 relative flex flex-col">
        <div className="flex items-center ml-5">
          <span className="not-italic ml-4 capitalize font-serif  text-xl lg:text-xl font-bold  font-poppins text-white hover:text-red-500 duration-75 ease-in-out">
            {!sidenavState ? "j" : <Logo />}
          </span>
        </div>
        <nav
          style={{ height: "calc(100vh - 8rem)" }}
          className="w-full flex flex-col justify-between py-14"
        >
          <ul className="w-full flex flex-col space-y-3 pb-10 relative">
            {navItem?.map((i: NavItem, index: number) => {
              return (
                <li className="capitalize" key={index}>
                  <div
                    className={classnames(
                      "py-3 pl-9 flex cursor-pointer transition-all duration-300 ease-in-out",
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
                          "w-5 flex items-center justify-center",
                          {
                            "text-ch-green": activeNavItem === i?.label,
                            "text-ch-grey": activeNavItem !== i?.label,
                          }
                        )}
                      >
                        {i?.icon && <>{i?.icon}</>}
                      </div>
                      <span
                        className={classnames(
                          "text-base font-bold tracking-[-0.04em] pl-6",
                          {
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
        <div className="flex space-x-4 ml-10">
          <button onClick={() => updateSidenavState(false)}>
            {sidenavState ? (
              <div className="flex space-x-2">
                <ArrowLeft />
                <span className="text-ch-lighter-grey">Minimize Menu</span>
              </div>
            ) : (
              <ArrowRight />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
