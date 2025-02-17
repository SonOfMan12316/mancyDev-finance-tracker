import React from "react";
import { SideNav, Header } from "../global";
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
}) => {
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <div className="w-full h-full flex">
        <SideNav />
        <main className="relative w-full h-full px-5 md:px-7 overflow-auto">
          <Header
            title={title}
            className={className}
            displayButton={displayButton}
            buttonTitle={buttonTitle}
          />
          <div className="pb-11">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
