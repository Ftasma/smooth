import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import teamImage from "../public/2_Team V1 (1).png"
import { Button } from './ui/button'

const FirstTimeDisplay = () => {
  return (
    <div className='bg-[#F6F6F6] h-[100vh] md:pt-4 pt-[6rem] px-6 text-center'>
      <Image className=' object-cover mx-auto' src={teamImage} alt='team image'/>
      <h1 className=' text-2xl'>Ready to start? Create your first <br />election now!</h1>
      <Link href="/create-election"><Button variant="outline" className='mt-5 flex items-center justify-center gap-3 text-[#F6F6F6] bg-[#0654B0] widthMd h-[58px] mx-auto px-6'><span className='-mt-1 text-2xl text'>&#43;</span>Create an election</Button></Link>
    </div>
  )
}

export default FirstTimeDisplay