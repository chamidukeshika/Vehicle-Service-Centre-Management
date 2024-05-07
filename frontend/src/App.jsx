import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Container } from 'react-bootstrap'

const App = () => {
  const location = useLocation();
  // Check if the current pathname starts with "/admin" or "/profile"
  const isAdminRoute = location.pathname.startsWith('/admin/dashboard') || location.pathname.startsWith('/profile');

  return (
    <>
      {!isAdminRoute && <Header />}
      <ToastContainer />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
