"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ArrowRight, ChevronLeft, Plus, ToggleLeftIcon,  ToggleRightIcon, Trash } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import InputComp from './_components/InputComp'

const AccreditionForm = () => {
  const [isEditing, setIsEditing] =useState(true)
  const [inputs, setInputs] = useState<{ id: number }[]>([{ id: 0 }])

  const handleAddInput = () => {
    setInputs(prevInputs => [...prevInputs, { id: prevInputs.length }]);
  };
  const handleDeleteInput = (id: number) => {
    setInputs(prevInputs => prevInputs.filter(input => input.id !== id));
  };
  const toggleEdit =()=> setIsEditing((current)=>!current)
  return (
    <section className='h-[100vh] w-full'>
         <Link href='/voters-acquisition'><button className=' bg-gray-300  rounded-full p-1 text-gray-700 font-thin mt-[7%] ml-[7%]'><ChevronLeft/></button></Link>
         <div className='dashboard-dimensions px-5 md:overflow-y-auto no-scrollbar'>
            <h1 className=' text-2xl font-medium'>Create Accreditation Form</h1>
            <p className='text-sm text-gray-500'>Personalize your accreditation form</p>
            <div className={cn('mt-3 h-10 flex justify-between px-5 w-full bg-white md:bg-[#F6F6F6]', !isEditing&&"bg-[#C92929] md:bg-[#C92929] !text-white")}>
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
                 {inputs.map(input => (
                <InputComp key={input.id} id={input.id} onDelete={handleDeleteInput} />
                     ))}
                <Button onClick={handleAddInput} className='place-self-start border-2 border-[#0654B0] gap-x-2 text-[#0654B0] rounded'><Plus size={17}/>Add more questions</Button>
                <Button variant="ghost" className=' place-self-center bg-[#0654B0] gap-x-2 text-white mt-3 w-[85%] rounded'>Get link <ArrowRight size={17}/></Button>
         </div>
    </section>
  )
}

export default AccreditionForm