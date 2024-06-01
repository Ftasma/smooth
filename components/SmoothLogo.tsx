import React from 'react'
import Image from "next/image"
import lightlogo from "../public/logolight.png"
const SmoothLogo = () => {
  return <Image  className=" w-[110px] h-[110px]" src={lightlogo} alt="logo"/>
}

export default SmoothLogo