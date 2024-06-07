"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BASE_URL } from '@/lib/endpoints';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Calendar, Clock, Loader2, Pencil, Plus, ToggleLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Page = () => {
    const [electionName, setElectionName]= useState("")
    const [electionDate, setElectionDate]= useState("")
    const [isLoading, setIsloading]= useState(true)
    const [title, setTitle] = useState('')
    const [showModal, setShowModal]= useState(false)
    const [inputs, setInputs] = useState<{ id: any, value: string, active: boolean }[]>([{ id: 0, value: "", active: true }])
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
            toast.success("Post added successfully");
            // console.log(response?.data?.data?.election_post?.id);
            setTimeout(() => {

            }, 3000)
        },
        onError: (e: any) => {
            toast.error("something went wrong")
        }
    })
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
    useEffect(() => {
        const electionId = localStorage.getItem('electionId');
        const name = localStorage.getItem('electionName');
        const electionDate = localStorage.getItem('electionDate');
        const date = new Date(electionDate as any)
        console.log(electionId, electionName);
        setElectionName(name as any)
        setElectionDate(date as any)
      }, []);
      const fetchData =async()=>{
        const electionPostId= localStorage.getItem("electionPostId")
        const electionId= localStorage.getItem("electionId")
        return await axios.post(`${BASE_URL}/election/post/candidates`, {ElectionId:electionId})
        setIsloading(false)
     }
     const query = useQuery({
      queryFn: fetchData,
      queryKey: ['something'],
     })
     console.log(query?.data?.data?.data?.election_posts);
  return (
    <section className='h-[500vh]  p-3'>
        {/* <div className='flex'>
            <div className=' place-self-start flex justify-between items-center gap-6 pl-4 pt-4'>
                <Link href='/dashboard'><button className=' bg-gray-300  rounded-full p-1 text-gray-700 font-thin mt-[7%] ml-[7%]'><ChevronLeft/></button></Link>
                <h1 className=' text-2xl font-bold'>{electionName}</h1>
            </div>
            
        </div> */}
        {/* <div>
        <div className=' flex justify-around items-center md:w-[50%] mt-7 gap-5 pl-4 pt-4'>
                <p className='text-[#0654B0] underline text-sm'>Election info</p>
                <p className='text-[#B1B2B2] text-sm '>Candidates</p>
                <p className='text-[#B1B2B2] text-sm '>Voters</p>
                <p className='text-[#B1B2B2] text-sm '>Payment</p>
            </div>
            <p className='opacity-0'>t</p>
        </div> */}
        <aside className='mx-auto flex flex-col w-[95%] h-[200vh] md:bg-white p-6 relative'>
            <span className=' flex place-self-end gap-2 items-center'>Start Election<ToggleLeft size={30} className=''/></span>
            <div className=' md:h-[20%] rounded md:border-[1px] mt-3 w-full border-[#B1B2B2] overflow-y-auto'>
                <div className='flex-col flex  md:flex-row justify-between w-full md:px-6 gap-4 pt-6 '>
                    <label className='w-full flex flex-col justify-between relative gap-2'>
                        <p>Election name</p>
                        <Input className='rounded bg-[#D2D3D3]' disabled placeholder={electionName}/>
                        <Pencil size={15} className=' absolute right-2 top-11'/>
                    </label>
                    <label className='w-full flex flex-col justify-between relative gap-2'>
                        <p>Election Date</p>
                         <Input className='rounded  bg-[#D2D3D3]' disabled placeholder={electionDate}/>
                        <Calendar size={15} className=' absolute right-2 top-11'/>
                    </label>
                </div>
                <div className=' flex justify-between w-full md:px-6 gap-4 pt-6'>
                <label className=' w-[80%] flex flex-col justify-between relative gap-2'>
                        <p>Start time</p>
                        <Input className='rounded bg-[#D2D3D3]'  placeholder='e.g."9.00"'/>
                        <Clock size={15} className=' absolute right-2  top-11'/>
                    </label>
                    <label className=' w-[80%] flex flex-col justify-between relative gap-2'>
                        <p>End Time</p>
                        <Input className='rounded bg-[#D2D3D3]'  placeholder='e.g."18.00"'/>
                        <Clock size={15} className=' absolute right-2 top-11'/>
                    </label>
                </div>
                
                <Button variant="ghost" className='bg-[#0654B0] text-white w-[30%] place-self-start md:mt-[2%] md:ml-[3%] mt-[5%] ml-[5%]'>Save</Button>
            </div>

            <aside className='md:h-[40%] rounded md:border-[1px] mt-3 w-full border-[#B1B2B2] overflow-y-auto'>
                <div className=' flex justify-between px-5'>
                    <p className=' opacity-0'>j</p>
                    <Button onClick={()=>setShowModal(true)} variant="ghost" className='hidden md:flex bg-[#0654B0] text-white w-[30%] place-self-end md:mt-[2%] md:ml-[3%] mt-[5%] ml-[5%]  gap-3'><Plus size={18}/>Add new post</Button>
                </div>
                <h1 className=' place-self-start font-semibold md:hidden text-2xl mt-6'>Election posts</h1>
                <div className='h-[5%] hidden md:flex border-[1px] border-[#797A7B] w-[95%] mx-auto mt-6  justify-around items-center'>
                    <span><p>S/N</p></span>
                    <span> <p>Election Post</p></span>
                    <span>Number of candidates</span>
                    <span className='-'>Action</span>
                </div>
                    {query?.data?.data?.data?.election_posts.map((post:any, index:number)=>(
                        <div key={post.id} className=''>
                        <div  className='w-[100%] mx-auto mt-6 flex justify-around items-center'>
                            <span className='-ml-[2%] font-bold  w-2'>{index+1}</span>
                            <span className='-ml-[5%] font-semibold max-w-3 text-sm'>{post.title}</span>
                            <span className='-mr-[10%] hidden md:block'>{post.Candidates.length}</span>
                            <span className=' flex items-center gap-3'><Button className='rounded bg-white border-[#0654B0] border-[1px] text-[#0654B0] w-[50%]'>Edit</Button><Button className='rounded bg-[#B00505] text-white w-[50%]'>Delete</Button></span>
                        </div>
                            {/* <div className='border-[0.2px] border-black'/> */}
                            <hr className='w-[95%] mx-auto'/>
                        </div>
                    ))}
                    <Button onClick={()=>setShowModal(true)} variant="ghost" className=' bg-[#0654B0] place-self-center md:hidden text-white w-[80%] md:mt-[2%] md:ml-[3%] mt-[6%] ml-[5%] gap-3'><Plus size={18}/>Add new post</Button>
            </aside>                    
            {showModal&&(inputs.map(input => (
                      <div className=' z-[9999] px-4 fixed inset-0 bg-black bg-opacity-25 flex flex-col backdrop-blur-sm  justify-center items-center '>
                        <button onClick={()=>setShowModal(false)} className='text-black rounded p-2 bg-white place-self-end'>X</button>
                        <div className=' bg-white w-[80%] h-[60%]  pt-8  px-3'>
                            <div className='w-full flex flex-col justify-center items-center'>
                            <Input
                                value={input.value}
                                onChange={(e) => handleInputChange(input.id, e.target.value)}
                                placeholder='e.g, President'
                                className='h-[58px] border-[#E5E5E5] placeholder:text-[#57595A]'
                                key={input.id}
                                id={`${input.id}`}
                                disabled={!input.active}
                                />
                                <Button onClick={handleAddInput} className='place-self-start border-2 border-[#0654B0] gap-x-2 text-[#0654B0] rounded'>
                                    <Plus size={17} />Add post
                                </Button>
                                </div>
                                </div>
                        </div>
                        )))}
        </aside>
    </section>
  )
}

export default Page