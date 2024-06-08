"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BASE_URL } from '@/lib/endpoints';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Calendar, ChevronLeft, Clock, Loader2, Pencil, Plus, ToggleLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
const Page = () => {
    const [electionName, setElectionName]= useState("")
    const [electionDate, setElectionDate]= useState("")
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
                query.refetch()
                toast.success("Post added successfully");

        },
        onError: (e: any) => {
            toast.error("something went wrong")
        }
    })

    const handleAddInput = () => {
        const electionId= localStorage.getItem("electionId")
        console.log(electionId);

        const activeInput = inputs.find(input => input.active);
        try {
            mutation.mutate({ title:activeInput?.value, ElectionId: electionId })
            toast.success("Post added successfully")
            query.refetch()
        }catch (error) {
            toast.error("error")
        }finally{
            query.refetch()
            setShowModal(false)
        }
        

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

    const fetchData = async () => {
        const electionId= localStorage.getItem("electionId")
        const response = await axios.post(`${BASE_URL}/election/post/candidates`, {ElectionId:electionId})
        return response;
     }

     const query = useQuery({
      queryFn: fetchData,
      queryKey: ['something'],
     })

     console.log(query?.data?.data?.data?.election_posts);

     const deleteData = async (id: any) => {
        try {
            await axios.delete(`${BASE_URL}/election/post/${id}`)
            toast.success("Post deleted successfully")
            query.refetch()
        } catch (error) {
            toast.error("Something went wrong while deleting the post")
        }
     }

  if (query.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" size={48} />
      </div>
    )
  }

  if (query.isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error loading data</p>
      </div>
    )
  }

  return (
    <section className='h-[500vh]  md:p-3'>
        <aside className='mx-auto flex flex-col w-[95%] h-[200vh] md:bg-white md:p-6 p-2 relative'>
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
                            <span className=' flex items-center gap-3 md:-mr-0 -mr-[10%]'>
                                <Button className='rounded bg-white border-[#0654B0] border-[1px] text-[#0654B0] w-[50%]'>Edit</Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline" className='rounded bg-[#B00505] text-white w-[50%]'>Delete</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete post
                                            and remove your data from our servers.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => deleteData(post.id)}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                {/* <Button onClick={() => deleteData(post.id)} className='rounded bg-[#B00505] text-white w-[50%]'>Delete</Button> */}
                            </span>
                        </div>
                            {/* <div className='border-[0.2px] border-black'/> */}
                            <hr className='w-[95%] mx-auto'/>
                        </div>
                    ))}
                    <Button onClick={()=>setShowModal(true)} variant="ghost" className=' bg-[#0654B0]  md:hidden text-white ml-[12%] w-[80%] mt-[6%] gap-3'><Plus size={18}/>Add new post</Button>
            </aside>
            {showModal&&(inputs.map(input => (
                      <div key={input.id} className=' z-[9999] px-4 fixed   inset-0 bg-black bg-opacity-25 flex flex-col backdrop-blur-sm  justify-center items-center '>

                        <div  className=' bg-white md:w-[40%] w-[95%] h-[30%] rounded pt-8  px-3'>
                            <div className='w-full flex flex-col justify-center gap-5 items-center'>
                                <div className='flex items-center w-[95%] gap-[30%]'>
                                    <button onClick={()=>setShowModal(false)} className='text-black  p-2 bg-[#EAEAEA] rounded-full '><ChevronLeft/></button>
                                    <p className='text-[#1F2223] '>Election post</p>
                                </div>
                            <Input
                                value={input.value}
                                onChange={(e) => handleInputChange(input.id, e.target.value)}
                                placeholder='e.g, President'
                                className='h-[58px] border-[#E5E5E5] placeholder:text-[#57595A] rounded w-[80%]'
                                id={`${input.id}`}
                                disabled={!input.active}
                                />
                                <Button onClick={handleAddInput} className='place-self-center border-2 bg-[#0654B0B2] gap-x-2 text-white rounded w-[80%]'>
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
