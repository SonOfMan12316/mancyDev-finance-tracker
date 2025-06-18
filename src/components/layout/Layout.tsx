import React from "react";
import { SideNav, Header, BottomNav } from "../global";
import { HeaderProps } from "../global/Header";

interface LayoutProps {
  children: React.ReactNode;
  displayHeader?: boolean;
}

const Layout: React.FC<LayoutProps & HeaderProps> = ({
  children,
  title,
  className,
  buttonTitle,
  displayButton = false,
  onClick,
}) => {
  return (
    <div className="w-screen min-h-screen relative flex flex-col">
      <div className="w-full h-full flex overflow-hidden">
        <SideNav />
        <main className="relative flex-1 flex flex-col bg-ch-beige">
          <div className="flex-1 overflow-auto">
            <Header
              title={title}
              className={className}
              displayButton={displayButton}
              buttonTitle={buttonTitle}
              onClick={onClick}
            />
            <div className="pb-2">{children}</div>
          </div>
          <div className="">
            <BottomNav />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
