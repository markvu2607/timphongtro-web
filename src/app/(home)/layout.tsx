import React, { ReactNode } from "react"

import { Navbar } from "./_components/nav-bar"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="h-[80px]" />
      {children}
    </div>
  )
}

export default Layout
