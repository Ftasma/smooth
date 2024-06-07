"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../../components/ui/accordion'
import { Button } from '@/components/ui/button'
import { BASE_URL } from '@/lib/endpoints'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'


const page = () => {
  const [electionName, setElectionName]= useState("")
  const [electionDate, setElectionDate]= useState("")
  const [isLoading, setIsloading]= useState(true)
  useEffect(() => {
      const electionId = localStorage.getItem('electionId');
      const name = localStorage.getItem('electionName');
      console.log(electionId, electionName);
      setElectionName(name as any)
    }, []);
    const fetchData =async()=>{
      const electionPostId= localStorage.getItem("electionPostId")
      const electionId= localStorage.getItem("electionId")
      return await axios.post(`${BASE_URL}/election/post/candidates`, {ElectionId:electionId})
   }
   const query = useQuery({
    queryFn: fetchData,
    queryKey: ['something'],
   })
   console.log(query?.data?.data?.data?.election_posts);
  return (
    <section className='h-screen'>
        <div className='mx-auto flex flex-col md:w-[80%] w-full h-[80%] md:bg-white md:p-6 overflow-y-auto'>
          <div className='flex justify-between md:px-3 px-6'>
            <h1 className='opacity-0 md:opacity-100 text-2xl font-semibold'>Candidates</h1>
            <Button variant="ghost" className='flex gap-3 bg-[#0654B0] text-white place-self-end'><Plus size={18}/>Add new candidate</Button>
          </div>
          <div className=' mt-[5%]'>
            {
              query?.data?.data?.data?.election_posts?.map((post:any, index:number)=>(
                <Accordion key={post.id} className='md:w-[90%] w-[95%] mx-auto border-[1px] border-[#B1B2B2] rounded px-3 mt-2' type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger >{post.title}</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))
              }
          </div>
        </div>
    </section>
  )
}

export default page