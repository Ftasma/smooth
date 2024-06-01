"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ArrowRight, ChevronLeft, Delete, Plus, ToggleLeftIcon, ToggleRight, ToggleRightIcon, Trash } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const AccreditionForm = () => {
  const [isEditing, setIsEditing] =useState(true)
  const toggleEdit =()=> setIsEditing((current)=>!current)
  return (
    <section className='h-[100vh] w-full'>
         <Link href='/voters-acquisition'><button className=' bg-gray-300  rounded-full p-1 text-gray-700 font-thin mt-[7%] ml-[7%]'><ChevronLeft/></button></Link>
         <div className='dashboard-dimensions px-2 md:overflow-y-auto no-scrollbar'>
            <h1 className=' text-2xl font-medium'>Create Accreditation Form</h1>
            <p className='text-sm text-gray-500'>Personalize your accreditation form</p>
            <div className={cn('mt-3 h-10 flex justify-between px-5 w-full bg-[#F6F6F6]', !isEditing&&"bg-[#C92929] !text-white")}>
              <p className=' opacity-0'>ss</p>
              <span className=' flex items-center gap-3'>{isEditing&&(
               <p className='text-[#2D3648]'> Accepting Response</p>
              )}{!isEditing&&(
                <p className='text-white'>Not Accepting Response</p>
              )} {isEditing&&(
                <ToggleRightIcon onClick={toggleEdit} size={35} className=' text-[#0654B0]'/>
              )}{!isEditing&&(
                <ToggleLeftIcon onClick={toggleEdit} size={35} />
              )}</span>
            </div>
            <aside className=' h-[30%] border-2 space-y-2 rounded px-6 py-3'>
                <Input placeholder='Form title' className=' bg-[#EAEAEA] border-none rounded placeholder:text-[#57595A]'/>
                <Input placeholder='Form Description' className='h-[5rem] bg-[#EAEAEA] border-none rounded placeholder:text-[#57595A]'/>
            </aside>
            <aside className=' h-[30%] flex flex-col  border-2 space-y-3 rounded px-6 py-3  '>
              <p className=' place-self-start text-[#1F2223]'>Label</p>
              <div className=' flex justify-between items-center'>
                <Input placeholder='Form title' className=' bg-[#EAEAEA] border-none w-[50%] rounded placeholder:text-[#57595A]'/>
                <div className=' w-[30%] border-2'>
                <select name="" className='text-[#57595A] w-[30%] border-none' id="">
                  <option value="">Short Answer</option>
                </select>
                </div>
              </div>
                <div className=' flex justify-between'>
                  <span className='flex gap-3 items-center'><input type='checkbox' className='w-5 h-5'/><p>Required</p></span>
                  <button className='flex gap-1 border-2 p-1 border-[#A92323] text-[#A92323]'><Trash className=' text-2xl'/><p className=' font-bold'>Delete</p></button>
                </div>
            </aside>
                <Button className='place-self-start border-2 border-[#0654B0] text-[#0654B0] rounded'><Plus/>Add more questions</Button>
                <Button className=' place-self-center bg-[#0654B0] text-white mt-3 w-[70%] rounded'>Get link <ArrowRight/></Button>
         </div>
    </section>
  )
}

export default AccreditionForm