import React from 'react'
import plus from "../../../public/gg_add.png"
import Image from 'next/image'
import Link from 'next/link'
const Dashboard = () => {
  return (
    <div className='h-screen bg-[#F6F6F6]'>
        <div className='original-border  mt-[5%] ml-[20%] flex flex-col items-center justify-center gap-2'>
            <Link href="/create-election"><button><Image className=' h-5 w-5' src={plus} alt='plus button'/></button></Link>
            <p className=' text-[#1F2223]'>Create an election</p>
           
        </div>
    </div>
  )
}

export default Dashboard