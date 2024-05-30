"use client"
import React from 'react'
import Image from "next/image"
import lightlogo from "../public/logolight.png"

import { useCookies } from 'react-cookie';
import { useRouter } from "next/navigation";
import UserButton from './UserButton';
const Navbar = () => {
const [cookies, setCookie, removeCookie] = useCookies(['token']);
const router = useRouter()
const handleLogout = () => {
  removeCookie("token");
  router.push("/sign-in"); // Redirect to the login page 
};
  return (
    <div className="bg-[#FFFFFF] h-[70px] w-full flex justify-between md:px-14 px-8 items-center shadow-md fixed z-50">
    <Image className=" w-[110px] h-[110px]" src={lightlogo} alt="logo"/>
    <UserButton/>
    </div>
  )
}

export default Navbar

function removeCookie(arg0: string) {
  throw new Error('Function not implemented.');
}
