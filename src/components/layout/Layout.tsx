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
    <div className="w-screen h-screen relative overflow-hidden">
      <div className="w-full h-full flex">
        <SideNav />
        <main className="relative flex-1 flex flex-col bg-ch-beige overflow-auto">
          <div className="overflow-auto">
            <Header
              title={title}
              className={className}
              displayButton={displayButton}
              buttonTitle={buttonTitle}
              onClick={onClick}
            />
            <div className="flex-1 pb-4 lg:pb-8">{children}</div>
          </div>
          <div className="w-full mt-auto">
            <BottomNav />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
