
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import Footer from '../Footer/Footer'
import ThemeProvider from '../ThemeProvider/ThemeProvider'


function Layout() {
  return (
    <div>
      <ThemeProvider >
        <Header/>
        <Outlet/>
        <Footer/>
      </ThemeProvider>
    </div>
  )
}

export default Layout
