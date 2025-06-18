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
    <div className="w-screen h-screen flex">
      <SideNav />
      <main className="flex-1 flex flex-col bg-ch-beige">
        <Header
          title={title}
          className={className}
          displayButton={displayButton}
          buttonTitle={buttonTitle}
          onClick={onClick}
        />
        <div className="flex-1 overflow-auto pb-20">
          {children}
        </div>
        <div className="fixed bottom-0 left-0 w-full lg:hidden z-50">
          <BottomNav />
        </div>
      </main>
    </div>
  );
};

export default Layout;
