"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import plus from "../../../public/2_Team V1 (1).png"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, PlusCircle, Trash } from 'lucide-react'
import AddCandidates from '@/components/AddCandidates'
import axios from 'axios'
import { BASE_URL } from '@/lib/endpoints'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
const CreateElection2 = () => {
  const router = useRouter()
  const fetchData =async()=>{
    const electionPostId= localStorage.getItem("electionPostId")
    const electionId= localStorage.getItem("electionId")
    return await axios.post(`${BASE_URL}/election/candidates`, {ElectionId:electionId})
 }
 const query = useQuery({
  queryFn: fetchData,
  queryKey: ['something'],
 })
 console.log(query?.data?.data?.data?.candidates);
 
  const [showModal, setShowModal]= useState(false)
  useEffect(() => {
    if (!showModal) {
      query.refetch();
    }
  }, [showModal, query]);
  return (
    <>
    <div className=' h-[300vh] md:h-[100&] w-full '>
        
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
            <div className='overflow-y-auto no-scrollbar ml-[20%] w-full place-self-center'>
            {query?.data?.data?.data?.candidates?.map((candidate:any)=>(
              <div key={candidate.id} className='mt-6 place-self-center h-16 flex justify-between  items-center px-3 rounded-xl w-[80%] border-2 border-blue-500 '>
              <div className=' w-[70%] flex md:justify-around justify-between items-center'>
              
                <Image height={15} width={35} className='!h-10 !w-10 object-cover  rounded-full ' src={`${candidate.image.link}`} alt='Candidate image'/>
               
                <h1 className='max-w-3'>{candidate.name}</h1>
                <p className=' max-w-16 text-xs bg-[#D9D9D9] text-black rounded px-1 -mr-[30%] md:-mr-0'>{candidate.ElectionPost.title}</p>
              </div>
              <div className=' pr-2 pb-1 hidden md:block'>
                <h2 className=' text-gray-400'>...</h2>
              </div>
             </div>
            ))}
            </div>
            <aside className=' mt-3 space-y-3'>
                <div className='original-border mx-auto !h-[58px] !w-[80%] !border-[#BCBCBC] justify-center items-center flex gap-4 mt-[5%]'>
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