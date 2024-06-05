"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, ChevronLeft, Clock, Pencil, ToggleLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [electionName, setElectionName]= useState("")
    const [electionDate, setElectionDate]= useState("")
    useEffect(() => {
        const electionId = localStorage.getItem('electionId');
        const name = localStorage.getItem('electionName');
        const electionDate = localStorage.getItem('electionDate');
        const date = new Date(electionDate as any)
        console.log(electionId, electionName);
        setElectionName(name as any)
        setElectionDate(date as any)
      }, []);
  return (
    <section className='h-[500vh]  p-3'>
        <div className='flex'>
            <div className=' place-self-start flex justify-between items-center gap-6 pl-4 pt-4'>
                <Link href='/dashboard'><button className=' bg-gray-300  rounded-full p-1 text-gray-700 font-thin mt-[7%] ml-[7%]'><ChevronLeft/></button></Link>
                <h1 className=' text-2xl font-bold'>{electionName}</h1>
            </div>
            
        </div>
        <div>
        <div className=' flex justify-around items-center md:w-[50%] mt-7 gap-5 pl-4 pt-4'>
                <p className='text-[#0654B0] underline text-sm'>Election info</p>
                <p className='text-[#B1B2B2] text-sm '>Candidates</p>
                <p className='text-[#B1B2B2] text-sm '>Voters</p>
                <p className='text-[#B1B2B2] text-sm '>Payment</p>
            </div>
            <p className='opacity-0'>t</p>
        </div>
        <aside className='mx-auto flex flex-col w-[95%] h-[200vh] md:bg-white p-6'>
            <span className=' flex place-self-end gap-2 items-center'>Start Election<ToggleLeft size={30} className=''/></span>
            <div className=' md:h-[20%] rounded md:border-[1px] mt-3 w-full border-[#B1B2B2]'>
                <div className='flex-col flex  md:flex-row justify-between w-full md:px-6 gap-4 pt-6 overflow-y-auto'>
                    <label className='w-full flex flex-col justify-between relative gap-2'>
                        <p>Election name</p>
                        <Input className='rounded bg-[#D2D3D3]' disabled placeholder={electionName}/>
                        <Pencil size={15} className=' absolute right-2 top-11'/>
                    </label>
                    <label className='w-full flex flex-col justify-between relative gap-2'>
                        <p>Election Date</p>
                         <Input className='rounded  bg-[#D2D3D3]' disabled placeholder={electionDate}/>
                        <Calendar size={15} className=' absolute right-2 top-11'/>
                    </label>
                </div>
                <div className=' flex justify-between w-full md:px-6 gap-4 pt-6'>
                <label className=' w-[80%] flex flex-col justify-between relative gap-2'>
                        <p>Start time</p>
                        <Input className='rounded bg-[#D2D3D3]' disabled placeholder={electionDate}/>
                        <Clock size={15} className=' absolute right-2  top-11'/>
                    </label>
                    <label className=' w-[80%] flex flex-col justify-between relative gap-2'>
                        <p>End Time</p>
                        <Input className='rounded bg-[#D2D3D3]' disabled placeholder={electionDate}/>
                        <Clock size={15} className=' absolute right-2 top-11'/>
                    </label>
                </div>
                <Button variant="ghost" className='bg-[#0654B0] text-white w-[30%] place-self-start md:mt-[2%] md:ml-[3%] mt-[5%] ml-[5%]'>Save</Button>
            </div>

        </aside>
    </section>
  )
}

export default Page