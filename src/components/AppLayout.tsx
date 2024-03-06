import React from 'react'
import Navbar from './AppNavbar'

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">{children}</div>
    </>
  )
}

export default AppLayout
