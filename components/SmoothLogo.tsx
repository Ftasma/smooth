import React from 'react'
import Image from "next/image"
import lightlogo from "../public/logolight.png"
import Link from 'next/link'
const SmoothLogo = () => {
  return <Link href="/dashboard"> <Image  className=" w-[110px] h-[110px]" src={lightlogo} alt="logo"/></Link>
}

export default SmoothLogo