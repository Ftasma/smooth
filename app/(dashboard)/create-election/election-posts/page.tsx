"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BASE_URL } from '@/lib/endpoints'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { ChevronLeft, Plus } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useToast } from "@/components/ui/use-toast"
const Page = () => {
    const { toast } = useToast()
    const sendData = (payload: any) => {
        return axios.post(`${BASE_URL}/election/post`, {
            title: payload.title,
            ElectionId: payload.ElectionId,
        })
    }

    const mutation = useMutation({
        mutationFn: sendData,
        mutationKey: ["next"],
        onSuccess: (response) => {
            localStorage.setItem("electionPostId", response?.data?.data?.election_post?.id)
            toast({
                title: "Post added",
            })
            // console.log(response?.data?.data?.election_post?.id);
            setTimeout(() => {

            }, 3000)
        },
        onError: (e: any) => {
            console.log(e.response.data.message);
            
            toast({
                variant:"destructive",
                title: e.response.data.message,
            })
        }
    })
    

    const [inputs, setInputs] = useState<{ id: any, value: string, active: boolean }[]>([{ id: 0, value: "", active: true }])
    const [title, setTitle] = useState('')
    
    const handleAddInput = () => {
        const electionId= localStorage.getItem("electionId")
        console.log(electionId);
        
        const activeInput = inputs.find(input => input.active);
        mutation.mutate({ title:activeInput?.value, ElectionId: electionId })

        console.log(activeInput?.value);
        setInputs(prevInputs =>
            prevInputs.map(input => ({ ...input, active: false }))
            .concat({ id: prevInputs.length, value: title, active: true })
        );
        setTitle('');
    }

    const handleInputChange = (id: number, value: string) => {
        setInputs(prevInputs =>
            prevInputs.map(input => input.id === id ? { ...input, value } : input)
        );
    }

    return (
        <div className='h-[300vh] w-full'>
            <Link href='/dashboard'>
                <button className='bg-gray-300 rounded-full p-1 text-gray-700 font-thin mt-[7%] ml-[7%]'>
                    <ChevronLeft />
                </button>
            </Link>
            <aside className='dashboard-dimensions !py-8 overflow-y-auto'>
                <h1 className='text-[#1F2223] text-2xl font-bold '>Add election posts</h1>
                <p className='text-[#57595A]'>Fill in the details below⚡</p>
                <div className='flex justify-around'>
                <span className=' z-50 rounded-full flex items-center justify-center bg-[#0654B0] p-3 px-6 w-9 text-white'><p className=' place-self-center'>1</p></span>
                <span className=' z-50 rounded-full flex items-center justify-center bg-[#0654B0] p-3 px-6 w-9 text-white'><p className=' place-self-center'>2</p></span>
                <span className=' z-50 rounded-full flex items-center justify-center bg-[#EAEAEA] p-3 px-6 w-9 text-[#57595A]'><p className=' place-self-center'>3</p></span>
            </div>
            <div className=' border-[#BCBCBC] border w-[65%] mx-auto border-dotted -mt-8'/>
                <aside className='mt-12 space-y-3'>
                    <label className='md:mx-[12%] mx-[8%] font-[Satoshi] flex flex-col gap-3 items-start '>
                        Election post
                        {inputs.map(input => (
                            <Input
                                value={input.value}
                                onChange={(e) => handleInputChange(input.id, e.target.value)}
                                placeholder='e.g, President'
                                className='h-[58px] border-[#E5E5E5] placeholder:text-[#57595A]'
                                key={input.id}
                                id={`${input.id}`}
                                disabled={!input.active}
                            />
                        ))}

                        <Button onClick={handleAddInput} className='place-self-start border-2 border-[#0654B0] gap-x-2 text-[#0654B0] rounded'>
                            <Plus size={17} />Add post
                        </Button>
                    </label>
                </aside>
                <Link href="/create-election-2"><Button variant="ghost" className='mt-5 text-[#F6F6F6] bg-[#0654B0] w-[84%] md:w-[76%] h-[58px] mx-[8%] md:mx-[12%]'>  Continue</Button></Link>
                  
            </aside>
        </div>
    )
}

export default Page
