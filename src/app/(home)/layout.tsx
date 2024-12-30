import React, { ReactNode } from "react"

import { Navbar } from "./_components/nav-bar"
import { Footer } from "./_components/footer"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="h-[80px]" />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
