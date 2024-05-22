import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
const AddCandidates = () => {
  return (
    <div className=' h-[100%] w-full '>
    <Link href='/create-election-2'><button className=' bg-gray-300 h-8 w-10 rounded-full text-black mt-[7%] ml-[7%]'>&#8636;</button></Link>
    <aside className='dashboard-dimensions'>
        <h1 className='text-[#1F2223] text-2xl font-bold '>Add Candidate</h1>
        <p className='text-[#57595A]'>Fill in the details below⚡</p>
        
        <aside className=' mt-5 space-y-3'>
            
            <label className=' font-[Satoshi] flex flex-col gap-3 items-start mx-[12%]'>
                Election post 
                <select name="" className='w-[100%] h-[58px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-4 pr-4' id="">
                    <option value="">President</option>
                    <option value="">Vice-President</option>
                </select>
            </label>
            <label className=' font-[Satoshi] flex flex-col gap-3 items-start mx-[12%]'>
                Name of candidate 
                <input placeholder='Oluwafemi' className='w-[100%] h-[58px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' type="text"/>
            </label>
            <label className=' font-[Satoshi] flex flex-col gap-3 items-start mx-[12%]'>
                Image
                <input placeholder='upload' className='w-[100%] h-[58px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' type="file"/>
            </label>
            <label className=' font-[Satoshi] flex flex-col gap-3 items-start mx-[12%]'>
                Bio
                <textarea name="" className='w-[100%] h-[200px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' id=""></textarea>
            </label>
        </aside>
        <Link href=""><Button variant="outline" className='mt-5 text-[#F6F6F6] bg-[#0654B0] w-[76%] h-[58px] rounded-md mx-[12%]'>Continue</Button></Link>
    </aside>
</div>
  )
}

export default AddCandidates