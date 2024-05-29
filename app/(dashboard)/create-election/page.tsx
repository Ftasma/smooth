import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const CreateElection = () => {
  return (
    <div className=' h-screen w-full '>
        <Link href='/dashboard'><button className=' bg-gray-300 h-8 w-10 rounded-full text-black mt-[7%] ml-[7%]'>&#8636;</button></Link>
        <aside className='dashboard-dimensions '>
            <h1 className='text-[#1F2223] text-2xl font-bold '>Create new election</h1>
            <p className='text-[#57595A]'>Fill in the details below⚡</p>
            <div className='flex w-[100%] justify-around'>
                <span className=' z-50 rounded-full bg-[#0654B0] p-2 w-9 text-white'>1</span>
                <span className=' z-50 rounded-full bg-[#EAEAEA] p-2 w-9 text-[#57595A]'>2</span>
                <span className=' z-50 rounded-full bg-[#EAEAEA] p-2 w-9 text-[#57595A]'>3</span>
            </div>
            <div className=' border-[#BCBCBC] border w-[65%] mx-auto border-dotted -mt-8'/>
            <aside className=' mt-12 space-y-3'>
                <label className=' md:mx-[12%] mx-[8%] font-[Satoshi] flex flex-col gap-3 items-start '>
                    Election name 
                    <input placeholder='My Election' className='w-[100%] h-[58px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' type="text"/>
                </label>
                <label className=' font-[Satoshi] flex flex-col gap-3 items-start mx-[8%] md:mx-[12%]'>
                    Date of election 
                    <div className='w-[100%] h-[58px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] px-2 '>
                    <input placeholder='12/10/12' className='w-[100%] h-[58px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' type="date"/>
                    </div>
                </label>
                <label className=' font-[Satoshi] flex flex-col gap-3 items-start mx-[8%] md:mx-[12%]'>
                    Election posts
                    <input placeholder='Johnismydoe@gmail.com' className='w-[100%] h-[58px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' type="text"/>
                </label>
            </aside>
            <Link href="/create-election-2"><Button variant="outline" className='mt-5 text-[#F6F6F6] bg-[#0654B0] w-[84%] md:w-[76%] h-[58px] mx-[8%] md:mx-[12%]'>Continue</Button></Link>
        </aside>
    </div>
  )
}

export default CreateElection