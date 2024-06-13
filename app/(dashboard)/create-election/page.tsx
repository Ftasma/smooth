"use client"
import { Button } from '@/components/ui/button'
import { BASE_URL } from '@/lib/endpoints'
import axios from 'axios'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useMutation} from "@tanstack/react-query";
import toast from 'react-hot-toast'
import { useToast } from "@/components/ui/use-toast"

const CreateElection = () => {
    const fetchData=(payload:any)=>{
        return axios.post(`${BASE_URL}/election`,{
            name:payload.name,
            election_date:payload.date,
        })
     }
     const router = useRouter()
    const [name, setName]= useState("")
     const [date, setDate]= useState("")
     const { toast } = useToast()
     const mutation= useMutation({
        mutationFn:fetchData,
        mutationKey:["next"],
        onSuccess:(response)=>{
            // console.log(response.data.data.election.id);
            localStorage.setItem("electionId", response.data.data.election.id) 
            const token= response.data.data.token
            console.log(token);
            toast({
                title: "Election created sucessfully",
            })
            setTimeout(()=>{  
               router.push("/create-election/election-posts")
            },3000)
        },
        onError:(e:any)=>{
            toast({
                title: e?.response?.data?.message
            })
            console.log(e?.response?.data?.message);
        }
    })
         

   
    const submit=()=>{
        // const utcDate = new Date(date).toISOString();
        // setDate(utcDate)
        if(date){
        mutation.mutate({name,date: new Date(date).toISOString()})
        console.log({name,date: new Date(date).toISOString()});
    }else{
        toast({
            variant:"destructive",
            title: "Please fill in all fields",
        })
    }
    }
  return (
    <div className=' h-screen w-full '>
        <Link href='/dashboard'><button className=' bg-gray-300  rounded-full p-1 text-gray-700 font-thin mt-[7%] ml-[7%]'><ChevronLeft/></button></Link>
        <aside className='dashboard-dimensions !py-8'>
            <h1 className='text-[#1F2223] text-2xl font-bold '>Create new election</h1>
            <p className='text-[#57595A]'>Fill in the details below⚡</p>
            <div className='flex w-[100%] justify-around'>
            <span className=' z-50 rounded-full flex items-center justify-center bg-[#0654B0] p-3 px-6 w-9 text-white'><p className=' place-self-center'>1</p></span>
            <span className=' z-50 rounded-full flex items-center justify-center bg-[#EAEAEA] p-3 px-6 w-9 text-[#57595A]'><p className=' place-self-center'>2</p></span>
             <span className=' z-50 rounded-full flex items-center justify-center bg-[#EAEAEA] p-3 px-6 w-9 text-[#57595A]'><p className=' place-self-center'>3</p></span>
            </div>
            <div className=' border-[#BCBCBC] border w-[65%] mx-auto border-dotted -mt-8'/>
            <aside className=' mt-12 space-y-3'>
                <label className=' md:mx-[12%] mx-[8%] font-[Satoshi] flex flex-col gap-3 items-start '>
                    Election name 
                    <input value={name} onChange={(e)=>setName(e.target.value)} placeholder='My Election' className='w-[100%] h-[58px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' type="text"/>
                </label>
                <label className=' font-[Satoshi] flex flex-col gap-3 items-start mx-[8%] md:mx-[12%]'>
                    Date of election 
                    <div className='w-[100%] h-[58px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] px-2 '>
                    <input required value={date} onChange={(e)=>setDate(e.target.value)} placeholder='12/10/12' className='w-[100%] h-[58px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' type="date"/>
                    </div>
                </label>
            </aside>
            <Button onClick={submit} variant="ghost" className='mt-5 text-[#F6F6F6] bg-[#0654B0] w-[84%] md:w-[76%] h-[58px] mx-[8%] md:mx-[12%]'>Continue</Button>
        </aside>
    </div>
  )
}

export default CreateElection