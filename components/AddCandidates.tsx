"use client"
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
const AddCandidates = ({onClose,isVisible}:any) => {
        const handleClose=(e:any)=>{
          if(e.target.id==="wrapper") onClose()
        }
        if(!isVisible) return null
  return (
    <div onClick={handleClose} id='wrapper' className='z-[9999] px-4 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
        <div className='w-[600px] flex flex-col'>
            <button onClick={()=>onClose()} className='text-white text-xl place-self-end'>X</button>
            <div className='bg-white py-5'>
            <aside className='dashboard-dimensions'>
                <h1 className='text-[#1F2223] text-2xl font-bold '>Add Candidate</h1>
                <p className='text-[#57595A]'>Fill in the details below⚡</p>
                
                <aside className=' mt-5 space-y-3'>
                    
                    <label className=' font-[Satoshi] flex flex-col gap-3 items-start md:mx-[12%] mx-[8%]'>
                        Election post 
                        <select name="" className='w-[100%] h-[58px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-4 pr-4' id="">
                            <option value="">President</option>
                            <option value="">Vice-President</option>
                        </select>
                    </label>
                    <label className=' font-[Satoshi] flex flex-col gap-3 items-start md:mx-[12%] mx-[8%]'>
                        Name of candidate 
                        <input placeholder='Oluwafemi' className='w-[100%] h-[58px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' type="text"/>
                    </label>
                    <label className=' font-[Satoshi] flex flex-col gap-3 items-start md:mx-[12%] mx-[8%]'>
                        Image
                        <input placeholder='upload' className='w-[100%] h-[58px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' type="file"/>
                    </label>
                    <label className=' font-[Satoshi] flex flex-col gap-3 items-start md:mx-[12%] mx-[8%]'>
                        Bio
                        <textarea name="" className='w-[100%] h-[200px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' id=""></textarea>
                    </label>
                </aside>
                <Button onClick={()=>onClose()} variant="outline" className='mt-5 text-[#F6F6F6] bg-[#0654B0] w-[76%] h-[58px] rounded-md mx-[12%]'>Continue</Button>
            </aside>
            </div>
        </div>
</div>
  )
}

export default AddCandidates