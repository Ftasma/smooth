"use client"
import AddCandidates from '@/components/AddCandidates'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../../components/ui/accordion'
import { Button } from '@/components/ui/button'
import { BASE_URL } from '@/lib/endpoints'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Loader2, Plus, Upload } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { v4 as uuidv4 } from "uuid";

import toast from 'react-hot-toast'
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { fileUploadInstance } from '@/components/ClientSetup'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface Candidate {
  id: string;
  name: string;
  image: {
    link: string;
  };
  ElectionPost: {
    title: string;
  };
  bio: string;
  ElectionPostId: number;
}

const Page = () => {
  const [electionPostId, setElectionPostId] = useState(0);
  const [electionName, setElectionName] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [file, setFile] = useState<any>();
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [electionId, setElectionId] = useState(0);
  const sendData = (payload: any) => {
    return axios.post(`${BASE_URL}/election/candidate`, {
      ...( editingCandidate?.id ? { id: editingCandidate.id } : {}),
      ElectionPostId: payload.electionPostId,
      name: payload.name,
      image: payload.image,
      bio: payload.bio,
      ElectionId: payload.electionId
    });
  };
   const mutation = useMutation({
  mutationFn: sendData,
  mutationKey: ["next"],
  onSuccess: (response) => {
    setTimeout(() => {
      toast.success("Candidate updated");
    }, 1000);
  },
  onError: (e: any) => {
    toast.error("error occurred");
  }
});
  useEffect(() => {
    const name = localStorage.getItem('electionName');
    setElectionName(name as any)
  }, []);

  const fetchData = async () => {
    const electionId = localStorage.getItem("electionId")
    return await axios.post(`${BASE_URL}/election/candidates`, { ElectionId: electionId })
  }

  const query = useQuery({
    queryFn: fetchData,
    queryKey: ['candidates'],
  })
  console.log(query.data?.data?.data?.candidates);
  
  if (query.isLoading) {
    return <div className="flex justify-center items-center h-screen">
    <Loader2 className="animate-spin" size={48} />
  </div>
  }

  if (query.isError) {
    return <div className="flex justify-center items-center h-screen">
    <p>Error loading data</p>
  </div>
  }
  
  const groupedCandidates = query?.data?.data?.data?.candidates?.reduce((acc: Record<string, Candidate[]>, candidate: Candidate) => {
    const postTitle = candidate.ElectionPost.title;
    if (!acc[postTitle]) {
      acc[postTitle] = [];
    }
    acc[postTitle].push(candidate);
    return acc;
  }, {});

  const deleteData = async (id: any) => {
    try {
        await axios.delete(`${BASE_URL}/election/candidate/${id}`)
        toast.success("Candidate deleted successfully")
        query.refetch()
    } catch (error) {
        toast.error("Something went wrong while deleting the Candidate")
    }
 }
 function handleFileChange(e: any) {
  e.preventDefault();
  setFile(e.target.files[0]);
}
 const handleEdit = (candidate: Candidate) => {
    setName(candidate.name);
    setBio(candidate.bio);
    setElectionPostId(candidate.ElectionPostId);
    setEditingCandidate(candidate);
 }

 async function uploadImage(){
  const key = uuidv4();
  const response = await axios.get(`https://sbxapi.smoothballot.com/storage/url?key=${key}`);
  const signed_upload_url = response.data.data.url;
  fileUploadInstance(signed_upload_url, file.type).put("", file);
  const file_url = `https://smooth-ballot.s3.eu-north-1.amazonaws.com/${key}`;
  const file_name_arr = file.name.split(".");
  const extension = file_name_arr[file_name_arr.length - 1];

  return {
    link: file_url,
    id: key,
    extension
  }

 }

 const submit = async () => {

  console.log(editingCandidate?.id)

  let image = editingCandidate?.image;

  if( file ) image = await uploadImage();
   
  mutation.mutate({
    id: editingCandidate?.id,
    electionPostId,
    name,
    image,
    bio,
    electionId: parseInt(localStorage.getItem("electionId") as string )
  } as any);
  // console.log({
  //   electionPostId,
  //   name,
  //   image: {
  //     "link": file_url,
  //     "id": key,
  //     "extension": extension,
  //   },
  //   bio,
  //   electionId
  // } as any);
  
};
 const handleClose = () => {
    setEditingCandidate(null);
 }

  return (
    <section className='h-[200vh] md:h-[500vh]'>
      <div className='mx-auto flex flex-col md:w-[80%] w-full h-[80%] md:bg-white md:p-6 md:overflow-y-auto'>
        <div className='flex justify-between md:px-3 px-6'>
          <h1 className='opacity-0 md:opacity-100 text-2xl font-semibold'>Candidates</h1>
          <Button onClick={() => setShowModal(true)} variant="ghost" className='flex gap-3 bg-[#0654B0] text-white place-self-end'><Plus size={18} />Add new candidate</Button>
        </div>
        <div className='mt-[5%]'>
          {
            groupedCandidates && Object.entries(groupedCandidates).map(([title, candidates]:any) => (
              <Accordion key={title} className='md:w-[90%] w-[95%] mx-auto border-[1px] border-[#B1B2B2] rounded px-3 mt-2' type="single" collapsible>
                <AccordionItem value={title}>
                  <AccordionTrigger>{title}</AccordionTrigger>
                  <AccordionContent className='h-[20%] md:p-2 mb-3'>
                        <Table>
                        <TableHeader className='border-[1px] bg-[#F6F6F6]'>
                          <TableRow className=''>
                              <TableHead className="">S/N</TableHead>
                              <TableHead>Image</TableHead>
                              <TableHead className=' text-center'>Name</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                        
                    {candidates.map((candidate: Candidate,index: number) => (
                      <TableRow key={candidate.id} >
                        <TableCell className=' font-medium'>{index+1}</TableCell>
                       <TableCell> <Image height={55} width={65} className='!h-[55px] !w-[55px] object-cover rounded' alt='Candidate image' src={candidate.image.link} /></TableCell>
                        <TableCell className='text-center'><p className=' text-sm text-wrap'>{candidate.name}</p></TableCell>
                        <TableCell>

                        <span className='flex items-center gap-3 justify-end'>
                        <Dialog>
                              <DialogTrigger asChild>
                              <Button onClick={() => handleEdit(candidate)} className='rounded bg-white border-[#0654B0] border-[1px] text-[#0654B0] w-[30%]'>Edit</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px] h-[75vh] overflow-y-auto no-scrollbar">
                                  <h1 className='text-center text-2xl'>Edit Candidate</h1>
                                  <p className='text-center'>Fill in the details below⚡</p>
                                  <aside className='mt-12 space-y-3'>
                                      {editingCandidate && (
                                        
                                        <>
                                        <label className='md:mx-[12%] mx-[8%] font-[Satoshi] flex flex-col gap-3 items-start '>
                                          Election post 
                                          <select value={editingCandidate.ElectionPost.title} className='outline-none w-[100%] h-[48px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] px-2' name="" id="">
                                          
                                              <option> {editingCandidate.ElectionPost.title}</option>
                                        
                                          </select>
                                        </label>
                                        <label className='font-[Satoshi] flex flex-col gap-3 items-start mx-[8%] md:mx-[12%]'>
                                          Name of candidate
                                          <input value={name} onChange={(e) => setName(e.target.value)} placeholder='John Doe' className='w-[100%] h-[48px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' type="text" />
                                        </label>
                                        <label className='font-[Satoshi] flex flex-col gap-3 items-start mx-[8%] md:mx-[12%] '>
                                          Image
                                          <div className="bg-[#EAEAEA] h-[48px] w-full flex justify-center items-center">
                                            {editingCandidate.image?.link ? (
                                              <>
                                              <Image height={15} width={35} className='!h-10 mx-auto !w-10 object-cover rounded-full' alt='Candidate image' src={editingCandidate.image.link} />
                                              <input className="opacity-0" onChange={handleFileChange} type="file" />
                                              </>
                                              ) : (
                                                <form className="flex justify-center items-center">
                                                <Upload size={35} className="ml-[45%] text-[#0654B0]" />
                                                <input className="opacity-0" onChange={handleFileChange} type="file" />
                                              </form>
                                            )}
                                          </div>
                                        </label>
                                        <label className='font-[Satoshi] flex flex-col gap-3 items-start mx-[8%] md:mx-[12%]'>
                                          Bio
                                          <textarea value={bio} onChange={(e) => setBio(e.target.value)} name="" className='w-[100%] h-[150px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' id=""></textarea>
                                          <Button onClick={submit} variant="ghost" type='button' className='bg-[#0654B0] text-white w-[100%]'>Continue</Button>
                                        </label>
                                        </>
                                      )}
                                  </aside>
                              </DialogContent>
                        </Dialog>
                          
                         <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline" className='rounded bg-[#B00505] text-white w-[40%]'>Delete</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete candidate
                                            and remove your data from our servers.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => deleteData(candidate.id)}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                            </AlertDialog>
                        </span>
                                    </TableCell>
                      
                    </TableRow>
                    ))}
                  </TableBody>
                  </Table>
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