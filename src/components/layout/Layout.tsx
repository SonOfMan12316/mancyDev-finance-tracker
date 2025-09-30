import React from 'react'
import { SideNav, Header, BottomNav } from '../global'
import { HeaderProps } from '../global/Header'

interface LayoutProps {
  children: React.ReactNode
  displayHeader?: boolean
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
    <div className="min-h-screen flex bg-ch-beige">
      <SideNav />
      <div className="flex-1 flex flex-col h-screen">
        <div className="flex-none">
          <Header
            title={title}
            className={className}
            displayButton={displayButton}
            buttonTitle={buttonTitle}
            onClick={onClick}
          />
        </div>
        <div className="flex-1 overflow-y-auto pb-16 lg:pb-6">
          <div className="mt-4">{children}</div>
        </div>
        <div className="fixed bottom-0 left-0 w-full lg:hidden z-50">
          <BottomNav />
        </div>
      </div>
    </div>
  )
}

export default Layout
