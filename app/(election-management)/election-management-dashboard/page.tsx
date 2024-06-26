"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BASE_URL } from '@/lib/endpoints';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {  ChevronLeft, Clock, Loader2, Pencil, Plus, ToggleLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useToast } from "@/components/ui/use-toast"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
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
import { log } from 'console';
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
const Page = () => {
    const [date, setDate] = React.useState<Date>()
    const [electionName, setElectionName]= useState("")
    const [electionId, setElectionId]= useState(0)
    const [electionDate, setElectionDate]= useState("")
    const [title, setTitle] = useState('')
    const [showModal, setShowModal]= useState(false)
    const [startTime, setStartTime]= useState("")
    const [endTime, setEndTime]= useState("")
    const [inputs, setInputs] = useState<{ id: any, value: string, active: boolean }[]>([{ id: 0, value: "", active: true }])
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
                query.refetch()
                toast({
                    title: "Post added sucessfully",
                })

        },
        onError: (response:any) => {
            // console.log(response?.response?.data?.message);
            
            toast({
                variant:"destructive",
                title: response?.response?.data?.message,
            })
        }
    })

    const handleAddInput = () => {
        const electionId= localStorage.getItem("electionId")
        console.log(electionId);

        const activeInput = inputs.find(input => input.active);
        try {
            mutation.mutate({ title:activeInput?.value, ElectionId: electionId })
            
            query.refetch()
        }catch (error) {
            toast({
                variant:"destructive",
                title: "Error",
            })
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
        const date = new Date(electionDate as any).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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
            const electionId = localStorage.getItem("electionId")
            await axios.delete(`${BASE_URL}/election/post/${id}/${electionId}`)
            toast({
                title: "Post deleted sucessfully",
            })
            query.refetch()
        } catch (error) {
            toast({
                variant:"destructive",
                title: "Something went wrong while deleting the post",
            })
        }
     }
     const saveElection= async ()=>{
        try {
            const currentDate = new Date(electionDate).toISOString().split('T')[0]; // Extract the date part
            const formattedStartTime = new Date(`${currentDate}T${startTime}`).toISOString();
            const formattedEndTime = new Date(`${currentDate}T${endTime}`).toISOString();
            const formattedDate = new Date(electionDate).toISOString();
            // Log the formatted times to check for validity
            console.log('Formatted Start Time:', formattedStartTime);
            console.log('Formatted End Time:', formattedEndTime);
    
            await axios.patch(`${BASE_URL}/election`, {
                name: electionName,
                election_date: date,
                start_time: formattedStartTime,
                end_time: formattedEndTime,
                id: localStorage.getItem("electionId")
            });
            
            toast({
                title: "Election saved sucessfully",
            })
            query.refetch()
        } catch (error) {
            if (error instanceof RangeError) {
                console.error('Invalid time value:', { startTime, endTime });
            }
            console.log(error);
            toast({
                variant:"destructive",
                title: "Something went wrong while saving the election",
            })
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
    <section className=' h-auto md:p-3 '>
        <aside className='mx-auto  flex flex-col w-[95%] lg:w-[80%] h-auto md:bg-white md:p-6 p-2 relative'>
            <span className=' flex place-self-end gap-2 items-center'>Start Election<ToggleLeft size={30} className=''/></span>
            <div className=' md:h-[20%] rounded md:border-[1px] mt-3 w-full border-[#B1B2B2] overflow-y-auto'>
                <div className='flex-col flex  md:flex-row justify-between w-full md:px-6 gap-4 pt-6 '>
                    <label className='w-full  flex flex-col justify-between relative gap-2'>
                        <p>Election name</p>
                        <Input value={electionName} onChange={(e) => setElectionName(e.target.value)} className='rounded bg-[#D2D3D3]'/>
                        <Pencil size={15} className=' absolute right-2 top-11'/>
                    </label>
                    <label className='w-full flex flex-col relative gap-2'>
                        <p>Election Date</p>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal bg-[#D2D3D3] rounded",
                                    !date && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>{electionDate}</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                
                                initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                      
                    </label>
                </div>
                <div className=' flex justify-between w-full md:px-6 gap-4 pt-6'>
                <label className=' w-[80%] flex flex-col justify-between relative gap-2'>
                        <p>Start time</p>
                        <Input type='time' value={startTime} onChange={(e) => setStartTime(e.target.value)} className='rounded bg-[#D2D3D3] w-full'  placeholder='e.g."9.00"'/>
                        
                    </label>
                    <label className=' w-[80%] flex flex-col justify-between relative gap-2'>
                        <p>End Time</p>
                        <Input type='time' value={endTime} onChange={(e) => setEndTime(e.target.value)} className='rounded bg-[#D2D3D3] w-full'  placeholder='e.g."18.00"'/>
                       
                    </label>
                </div>

                <Button onClick={saveElection} variant="ghost" className='bg-[#0654B0] text-white w-[10rem] place-self-start md:mt-[2%] md:ml-[3%] md:mb-4 mt-[5%] ml-[5%]'>Save</Button>
            </div>

            <aside className='md:h-[40%] rounded md:border-[1px] mt-3 w-full border-[#B1B2B2] overflow-y-auto'>
    <div className='flex justify-between px-5'>
        <p className='opacity-0'>j</p>
        <Button onClick={() => setShowModal(true)} variant="ghost" className='hidden md:flex bg-[#0654B0] text-white p-3 place-self-end md:mt-[2%] md:ml-[3%] mt-[5%] ml-[5%] gap-3'><Plus size={16} />Add new post</Button>
    </div>
    <h1 className='place-self-start font-semibold md:hidden text-2xl mt-6'>Election posts</h1>
    
    <Table className='mt-3'>
        <TableHeader className='border-[1px] bg-[#F6F6F6]'>
            <TableRow className=''>
                <TableHead className="">S/N</TableHead>
                <TableHead>Post</TableHead>
                <TableHead className=' text-center'>Candidates</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
    {query?.data?.data?.data?.election_posts.map(({ id, title, Candidates }: any, index: number) => (
        <TableRow key={id} className=''>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className=''>{title}</TableCell>
            <TableCell className='text-center'>{Candidates.length}</TableCell>
            <TableCell className="">
                <span className='items-center flex gap-2 justify-end'>
                    <Button className='rounded bg-white border-[#0654B0] border-[1px] text-[#0654B0]'>Edit</Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" className='rounded bg-[#B00505] text-white'>Delete</Button>
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
                                <AlertDialogAction onClick={() => deleteData(id)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </span>
            </TableCell>
        </TableRow>
    ))}
</TableBody>

    </Table>
    <Button onClick={() => setShowModal(true)} variant="ghost" className='bg-[#0654B0] md:hidden text-white ml-[12%] w-[80%] mt-[6%] gap-3'><Plus size={18} />Add new post</Button>
</aside>

{showModal&&(inputs.map(input => (
                      <div key={input.id} className=' z-[9999] px-4 fixed   inset-0 bg-black bg-opacity-25 flex flex-col backdrop-blur-sm  justify-center items-center '>

                        <div  className=' bg-white md:w-[40%] w-[95%] h-[35%] rounded pt-8  px-3'>
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
