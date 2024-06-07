"use client"
import React from 'react'

import UserButton from './UserButton';
import SmoothLogo from './SmoothLogo';
const Navbar = () => {
  return (
    <div className="bg-[#FFFFFF] h-[70px] w-full flex justify-between md:px-14 px-8 items-center shadow-md fixed z-[99999999]">
    <SmoothLogo/>
    <UserButton/>
    </div>
  )
}

export default Navbar

