import React from 'react'
import Header from './Header_Footer/Header.jsx'
import Footer from './Header_Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <Outlet className="flex-grow" />
        <Footer />
    </div>
  )
}

export default Layout