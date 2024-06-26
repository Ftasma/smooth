"use client"
import AddCandidates from '@/components/AddCandidates'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../../components/ui/accordion'
import { Button } from '@/components/ui/button'
import { BASE_URL } from '@/lib/endpoints'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
interface Candidate {
  id: string;
  name: string;
  image:{
    link:string;
  };
  
  ElectionPost: {
    title: string;
  };
}

const Page = () => {
  const [electionName, setElectionName]= useState("")
  const [electionDate, setElectionDate]= useState("")
  const [isLoading, setIsloading]= useState(true)
  const [showModal, setShowModal]= useState(false)

  useEffect(() => {
      const electionId = localStorage.getItem('electionId');
      const name = localStorage.getItem('electionName');
      console.log(electionId, electionName);
      setElectionName(name as any)
    }, []);

  const fetchData = async () => {
    const electionPostId = localStorage.getItem("electionPostId")
    const electionId = localStorage.getItem("electionId")
    return await axios.post(`${BASE_URL}/election/candidates`, { ElectionId: electionId })
  }

  const query = useQuery({
    queryFn: fetchData,
    queryKey: ['something'],
  })

  console.log(query?.data?.data?.data?.candidates);

  const groupedCandidates = query?.data?.data?.data?.candidates?.reduce((acc: Record<string, Candidate[]>, candidate: Candidate) => {
    const postTitle = candidate.ElectionPost.title;
    if (!acc[postTitle]) {
      acc[postTitle] = [];
    }
    acc[postTitle].push(candidate);
    return acc;
  }, {});

  return (
    <section className='h-screen'>
        <div className='mx-auto flex flex-col md:w-[80%] w-full h-[80%] md:bg-white md:p-6 md:overflow-y-auto'>
          <div className='flex justify-between md:px-3 px-6'>
            <h1 className='opacity-0 md:opacity-100 text-2xl font-semibold'>Candidates</h1>
            <Button onClick={() => setShowModal(true)} variant="ghost" className='flex gap-3 bg-[#0654B0] text-white place-self-end'><Plus size={18}/>Add new candidate</Button>
          </div>
          <div className=' mt-[5%]'>
            {
              groupedCandidates && Object.entries(groupedCandidates).map(([title, candidates,image]:any) => (
                <Accordion key={title} className='md:w-[90%] w-[95%] mx-auto border-[1px] border-[#B1B2B2] rounded px-3 mt-2' type="single" collapsible>
                  <AccordionItem value={title}>
                    <AccordionTrigger>{title}</AccordionTrigger>
                    <AccordionContent className=' h-[20%]  md:p-2'>
                      {candidates.map((candidate: Candidate) => (
                        <div key={candidate.id} className='flex justify-around w-[100%] mx-auto mt-6 items-center'>
                          <Image height={15} width={35} className='!h-10 !w-10 object-cover  rounded-full ' alt='Candidate image' src={candidate.image.link}/> 
                          <p className='max-w-3 text-sm text-wrap'>{candidate.name}</p>
                          <span className=' flex items-center gap-3'><Button className='rounded bg-white border-[#0654B0] border-[1px] text-[#0654B0] w-[50%]'>Edit</Button><Button className='rounded bg-[#B00505] text-white w-[50%]'>Delete</Button></span>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))
            }
          </div>
          <AddCandidates isVisible={showModal} onClose={() => setShowModal(false)} />
        </div>
    </section>
  )
}

export default Page
