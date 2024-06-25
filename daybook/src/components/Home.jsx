import React from 'react'
import Left from './Left.jsx'
import Navbar from './Navbar.jsx'
import { Outlet } from "react-router-dom";


const Home = () => {

  return (
    <div className=''>
        <Navbar/>
        <div className='hello'>
        <Left />
        <Outlet />
        </div>
      
    </div>
  )
}

export default Home