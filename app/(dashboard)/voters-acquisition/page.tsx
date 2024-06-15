"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import axios from 'axios'
import { BASE_URL } from '@/lib/endpoints'
import { ChevronLeft, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
const VotersAcquisition = () => {
  const router = useRouter()
  const sendData = async (payload:any) => {
    const electionId= localStorage.getItem("electionId")
     axios.patch(`${BASE_URL}/election`,{
      id:electionId,
      voters_acquisition_channel:'form'
  }).then((res)=>{
    router.push('/accreditation-form')
  })
    
  }
  return (
    <section className=' h-[100vh] w-full'>
      
    <Link href='/create-election-2'><button className=' bg-gray-300  rounded-full p-1 text-gray-700 font-thin mt-[7%] ml-[7%]'><ChevronLeft/></button></Link>
    <aside className='dashboard-dimensions'>
        <h1 className='text-[#1F2223] text-2xl font-bold '>Voters Acquisition</h1>
        <p className='text-[#57595A]'>Choose one of the following options⚡</p>
        <div className='flex justify-around'>
        <span className=' z-50 rounded-full flex items-center justify-center bg-[#0654B0] p-3 px-6 w-9 text-white'><p className=' place-self-center'>1</p></span>
            <span className=' z-50 rounded-full flex items-center justify-center bg-[#0654B0] p-3 px-6 w-9 text-white'><p className=' place-self-center'>2</p></span>
             <span className=' z-50 rounded-full flex items-center justify-center bg-[#0654B0] p-3 px-6 w-9 text-white'><p className=' place-self-center'>3</p></span>
             <span className=' z-50 rounded-full flex items-center justify-center bg-[#0654B0] p-3 px-6 w-9 text-white'><p className=' place-self-center'>4</p></span>
        </div>
        <div className=' border-[#BCBCBC] border w-[75%] mx-auto border-dotted -mt-8'/>
        <aside className=' mt-12 space-y-3'>
            <div className=' original-border mx-auto !h-[12rem] !w-[80%] !border-[#BCBCBC] gap-3 flex flex-col justify-center items-center'>  
                  <Input id="file" className='opacity-0' type="file" />
                  <Upload className='-mt-10 cursor-pointer text-[#0654B0] text-sm'/>   
              <p className='text-[#1F2223]'>Import .csv file</p>
            </div>
            <div className='original-border mx-auto !h-[58px] !w-[80%] !border-[#BCBCBC] justify-center items-center flex gap-4'>
             <p>Or create <span onClick={sendData} className='text-[#0654B0] cursor-pointer'> acreditation form</span></p>
            </div>
        </aside>
        <Link href=""><Button variant="ghost" className='mt-5 text-[#F6F6F6] bg-[#0654B0] w-[80%] h-[58px]  mx-auto'>Continue</Button></Link>
    </aside>
</section>
  )
}

export default VotersAcquisition