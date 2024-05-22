import React from 'react'
import Image from "next/image"
import lightlogo from "../public/logolight.png"
import userImage from "../public/Frame 425.png";
const Navbar = () => {
  return (
    <div className="bg-[#FFFFFF] h-[70px] w-full flex justify-between md:px-14 px-8 items-center shadow-md fixed z-50">
    <Image className=" w-[110px] h-[110px]" src={lightlogo} alt="logo"/>
    <Image className=" w-[60px] h-[35px]" src={userImage} alt="logo"/>
    </div>
  )
}

export default Navbar