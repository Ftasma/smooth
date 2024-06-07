"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { BASE_URL } from '@/lib/endpoints'
import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'


import { useRouter } from 'next/navigation'
import App from '@/app/(dashboard)/_components/Image'
import ImageComp from '@/app/(dashboard)/_components/Image'
const AddCandidates = ({onClose,isVisible}:any) => {
    const sendData=(payload:any)=>{
       
        return axios.post(`${BASE_URL}/election/candidate`,{
            ElectionPostId:payload.electionPostId,
            name:payload.name,
            image:payload.image,
            bio:payload.bio,
            ElectionId:payload.electionId
        })
     }
    const router = useRouter()
    const [electionPostId, setElectionPostId]=useState("")
    const [name, setName]=useState("")
    const [image, setImage]=useState({})
    const [bio, setBio]=useState("")
    const [electionId, setElectionId]=useState(0)
    const fetchData=async()=>{
        const electionId= localStorage.getItem("electionId")
        setElectionId(Number(electionId))
        console.log(electionId);
        
        const electionPostId= localStorage.getItem("electionPostId")
        return await axios.get(`${BASE_URL}/election/posts?ElectionId=${electionId}`)
     }
     const query = useQuery({
      queryFn: fetchData,
      queryKey: ['next'],
     })
     const mutation= useMutation({
        mutationFn:sendData,
        mutationKey:["next"],
        onSuccess:(response)=>{
            onClose()
            setTimeout(()=>{
                toast.success("Candidate added");
            },1000)
            // useEffect(() => {
            //     router.refresh();
            //   }, []);
        },
        onError:(e:any)=>{
            toast.error("error occured")
        }
    })
    const submit=()=>{
        mutation.mutate({electionPostId,name,image:{
            "link": "https://example.com/images/janesmith.png",
            "id": "xyz456",
            "extension": "png",
        },bio,electionId} as any)
        console.log({electionPostId,name,image:{
            "link": "https://example.com/images/janesmith.png",
            "id": "xyz456",
            "extension": "png",
        },bio,electionId} as any)
        
    }
   console.log( query?.data?.data);
   
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
                    
                    <select value={electionPostId} onChange={(e)=>setElectionPostId(e.target.value)} className=' outline-none w-[100%] h-[48px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] px-2' name="" id="">
                    {query?.data?.data?.data?.election_posts.map(
                        (post:any)=>{
                            return <option key={post.id} value={post.id}>{post.title}</option>
                            
                            
                        }
                    
                    )}
                    </select>
                    
                </label>
                <label className=' font-[Satoshi] flex flex-col gap-3 items-start mx-[8%] md:mx-[12%]'>
                    Name of candidate
                    <input value={name} onChange={(e)=>setName(e.target.value)} placeholder='John doe' className='w-[100%] h-[48px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' type="text"/>
                </label>
                <label className=' font-[Satoshi] flex flex-col gap-3 items-start mx-[8%] md:mx-[12%]'>
                    Image
                    <input  placeholder='Johnismydoe@gmail.com' className='w-[100%] h-[48px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' type="file"/>
                </label>
                <label className=' font-[Satoshi] flex flex-col gap-3 items-start mx-[8%] md:mx-[12%]'>
                    Bio
                    <textarea value={bio} onChange={(e)=>setBio(e.target.value)} name="" className='w-[100%] h-[150px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' id=""></textarea>
                    <Button variant="ghost" type='button' onClick={submit} className='bg-[#0654B0] text-white w-[100%]'>Continue</Button>
                    <ImageComp/>
                </label>
            </aside>
        </div>
        </div>
    </div>

  )
}

export default AddCandidates