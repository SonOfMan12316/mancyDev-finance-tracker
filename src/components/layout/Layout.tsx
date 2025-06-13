import React from "react";
import { SideNav, Header, BottomNav } from "../global";
import { HeaderProps } from "../global/Header";

interface LayoutProps {
  children: React.ReactNode;
  displayHeader?: boolean;
}

const Layout: React.FC<LayoutProps & HeaderProps> = ({
  children,
  displayHeader = true,
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
        <main className="relative flex-1 lg:block flex flex-col bg-ch-beige">
          <Header
            title={title}
            className={className}
            displayButton={displayButton}
            buttonTitle={buttonTitle}
            onClick={onClick}
          />
          <div className="flex-1 overflow-auto pb-4 lg:pb-8">{children}</div>
          <div className="w-full">
            <BottomNav />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
