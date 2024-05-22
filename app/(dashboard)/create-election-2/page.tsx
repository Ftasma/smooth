import Link from 'next/link'
import React from 'react'
import plus from "../../../public/gg_add.png"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
const CreateElection2 = () => {
  return (
    <div className=' h-screen w-full '>
      
        <Link href='/create-election'><button className=' bg-gray-300 h-8 w-10 rounded-full text-black mt-[7%] ml-[7%]'>&#8636;</button></Link>
        <aside className='dashboard-dimensions'>
            <h1 className='text-[#1F2223] text-2xl font-bold '>Create new election</h1>
            <p className='text-[#57595A]'>Fill in the details below⚡</p>
            <div className='flex justify-around'>
                <span className=' z-50 rounded-full bg-[#0654B0] p-2 w-9 text-white'>1</span>
                <span className=' z-50 rounded-full bg-[#0654B0] p-2 w-9 text-white'>2</span>
                <span className=' z-50 rounded-full bg-[#EAEAEA] p-2 w-9 text-[#57595A]'>3</span>
            </div>
            <div className=' border-[#BCBCBC] border w-[65%] mx-auto border-dotted -mt-8'/>
            <aside className=' mt-12 space-y-3'>
                <div className='original-border mx-auto !h-[58px] !w-[80%] !border-[#BCBCBC] justify-center items-center flex gap-4'>
                <button><Image className=' h-5 w-5' src={plus} alt='plus button'/></button>
                <p className='text-[#57595A] -mt-1'>Add candidate</p>
                </div>
            </aside>
            <Link href="/add-candidates"><Button variant="outline" className='mt-5 text-[#F6F6F6] bg-[#0654B0] w-[80%] h-[58px] rounded-md mx-auto'>Continue</Button></Link>
        </aside>
    </div>
  )
}

export default CreateElection2