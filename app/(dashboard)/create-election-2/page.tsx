"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import plus from "../../../public/gg_add.png"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, PlusCircle } from 'lucide-react'
import AddCandidates from '../_components/AddCandidates'
import axios from 'axios'
import { BASE_URL } from '@/lib/endpoints'
import { useQuery } from '@tanstack/react-query'
const CreateElection2 = () => {
//   const fetchData=async()=>{
//     return await axios.get(`${BASE_URL}/election/posts?ElectionId=5`)
//  }
//  const query = useQuery({
//   queryFn: fetchData,
//   queryKey: ['next'],
//  })

  const [showModal, setShowModal]= useState(false)
  return (
    <>
    <div className=' h-screen w-full '>
      
        <Link href='/dashboard'><button className=' bg-gray-300  rounded-full p-1 text-gray-700 font-thin mt-[7%] ml-[7%]'><ChevronLeft/></button></Link>
        <aside className='dashboard-dimensions'>
            <h1 className='text-[#1F2223] text-2xl font-bold '>Create new election</h1>
            <p className='text-[#57595A]'>Fill in the details below⚡</p>
            <div className='flex justify-around'>
                <span className=' z-50 rounded-full flex items-center justify-center bg-[#0654B0] p-3 px-6 w-9 text-white'><p className=' place-self-center'>1</p></span>
                <span className=' z-50 rounded-full flex items-center justify-center bg-[#0654B0] p-3 px-6 w-9 text-white'><p className=' place-self-center'>2</p></span>
                <span className=' z-50 rounded-full flex items-center justify-center bg-[#0654B0] p-3 px-6 w-9 text-white'><p className=' place-self-center'>3</p></span>
            </div>
            <div className=' border-[#BCBCBC] border w-[65%] mx-auto border-dotted -mt-8'/>
            <aside className=' mt-12 space-y-3'>
                <div className='original-border mx-auto !h-[58px] !w-[80%] !border-[#BCBCBC] justify-center items-center flex gap-4'>
                <PlusCircle onClick={()=>setShowModal(true)} className='cursor-pointer text-[#0654B0]' size={20}/>
                <p className='text-[#57595A]'>Add candidate</p>
                </div>
            </aside>
            <Link href="/voters-acquisition"><Button variant="ghost" className='mt-5 text-[#F6F6F6] bg-[#0654B0] w-[80%] h-[58px]  mx-auto'>Continue</Button></Link>
        </aside>
    </div>
    <AddCandidates isVisible={showModal} onClose={()=>setShowModal(false)}/>
    </>
  )
}

export default CreateElection2