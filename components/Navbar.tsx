"use client"
import React from 'react'

import UserButton from './UserButton';
import SmoothLogo from './SmoothLogo';
import { Button } from './ui/button';
import Link from 'next/link';
const Navbar = () => {
  return (
    <div className="bg-[#FFFFFF] h-[70px] w-full flex justify-between md:px-14 px-8 items-center shadow-md fixed z-[99999999]">
    <SmoothLogo/>
    <div className='flex items-center'>
    <Link href="/wallet"><Button className='bg-[#F6F6F6] p-2 text-[#0654B0] font-satoshi rounded text-[1.1rem]'>My Wallet</Button></Link>
    <UserButton/>
    </div>
    </div>
  )
}

export default Navbar

