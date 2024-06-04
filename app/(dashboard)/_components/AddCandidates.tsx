"use client"
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { BASE_URL } from '@/lib/endpoints'
import { useQuery } from '@tanstack/react-query'
const AddCandidates = ({onClose,isVisible}:any) => {
    const fetchData=()=>{
        return  axios.get(`${BASE_URL}/election/posts?ElectionId=3`)
     }
     const query = useQuery({
      queryFn: fetchData,
      queryKey: ['next'],
     })
     console.log(query?.data?.data?.data?.election_posts[0]);
     
        const handleClose=(e:any)=>{
          if(e.target.id==="wrapper") onClose()
        }
        if(!isVisible) return null
  return (
    <div onClick={handleClose} id='wrapper' className='z-[9999] px-4 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center '>
        <div className=' flex flex-col w-full '>
        <button onClick={onClose} className=' place-self-end opacity-100 pr-3 text-gray-500'>X</button>
        <div className=' bg-white h-[80vh] w-[90%] bg-opacity-100 space-y-3 mx-auto overflow-y-auto  py-4 rounded'>
            <h1 className=' text-center text-2xl'>Add Candidate</h1>
            <p className=' text-center'>Fill in the details below⚡</p>
            <aside className=' mt-12 space-y-3'>
                <label className=' md:mx-[12%] mx-[8%] font-[Satoshi] flex flex-col gap-3 items-start '>
                    Election post 
                    
                    <select className=' outline-none w-[100%] h-[48px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] px-2' name="" id="">
                    {query?.data?.data?.data?.election_posts.map(
                        (post:any)=>{
                            return <option key={post.id} value={post.id}>{post.title}</option>
                        }
                    
                    )}
                    </select>
                    
                </label>
                <label className=' font-[Satoshi] flex flex-col gap-3 items-start mx-[8%] md:mx-[12%]'>
                    Name of candidate
                    <input placeholder='John doe' className='w-[100%] h-[48px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' type="text"/>
                </label>
                <label className=' font-[Satoshi] flex flex-col gap-3 items-start mx-[8%] md:mx-[12%]'>
                    Image
                    <input placeholder='Johnismydoe@gmail.com' className='w-[100%] h-[48px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' type="file"/>
                </label>
                <label className=' font-[Satoshi] flex flex-col gap-3 items-start mx-[8%] md:mx-[12%]'>
                    Bio
                    <textarea name="" className='w-[100%] h-[150px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' id=""></textarea>
                    <Button variant="ghost" type='button' onClick={onClose} className='bg-[#0654B0] text-white w-[100%]'>Continue</Button>
                </label>
            </aside>
        </div>
        </div>
    </div>

  )
}

export default AddCandidates