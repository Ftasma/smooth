"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ArrowRight, ChevronLeft, Plus, ToggleLeftIcon,  ToggleRightIcon, Trash } from 'lucide-react'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import InputComp from './_components/InputComp'
import axios from 'axios'
import { BASE_URL } from '@/lib/endpoints'
import { useQuery } from '@tanstack/react-query'
const AccreditionForm = () => {
  const [accreditationForm, setAccreditationForm] = useState<any>(null)
  const [accreditationFormQuestions, setAccreditationFormQuestions] = useState<any>([])
  const [accreditationFormTitle, setAccreditationFormTitle] = useState<any>('')
  const [accreditationFormDescription, setAccreditationFormDescription] = useState<any>('')
  const [isEditing, setIsEditing] =useState<any>(true)
  const [inputs, setInputs] = useState<{ id: number }[]>([{ id: 0 }]);
  const timeoutId = useRef<any>()
  const timeoutDescription = useRef<any>()
  const fetchData = async () => {
    const electionId= localStorage.getItem("electionId")
    const response = await axios.get(`${BASE_URL}/election/accreditation/${electionId}`)
    // console.log(response.data.data.accreditation_form_and_questions)
    const accreditation_form = response.data.data.accreditation_form_and_questions;
    console.log(accreditation_form)
    setAccreditationForm(accreditation_form)
   
    setIsEditing(accreditation_form?.is_accepting_response ?? true)
    setAccreditationFormQuestions(response.data.data.accreditation_form_and_questions.AccreditationFormQuestions)
    const title = response.data.data.accreditation_form_and_questions.form_title
    const description = response.data.data.accreditation_form_and_questions.form_description
    setAccreditationFormTitle(title)
    setAccreditationFormDescription(description);
    return response
 }

 let accreditation_form: any;

 const query = useQuery({
  queryFn: fetchData,
  queryKey: ['query'],
 })





 const sendTitle= async(e:any)=>{

  const value = e.target.value;

  setAccreditationFormTitle(value);
  
  if( !timeoutId.current ) return timeoutId.current = setTimeout(()=> save_title(value), 1000);

  else {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(()=> save_title(value), 1000);
  }

 
  
 }

 function save_title(title: string){
 
  const electionId= localStorage.getItem("electionId")
  
  axios.patch(`${BASE_URL}/election/accreditation/form`,{
    form_title: title,
    ElectionId:electionId,
    is_accepting_response:isEditing,
    id:accreditation_form.id
  })

 }
// let mutate_description_timeout: any;
const sendDescription= async(e:any)=>{ 
  const value = e.target.value;

  setAccreditationFormDescription(value);
  
  if( !timeoutDescription.current ) return timeoutDescription.current = setTimeout(()=> save_description(value), 1000);

  else {
    clearTimeout(timeoutDescription.current);
    timeoutDescription.current = setTimeout(()=> save_description(value), 1000);
  }
}

 const save_description=(description:string)=>{
  const electionId= localStorage.getItem("electionId")
  
  axios.patch(`${BASE_URL}/election/accreditation/form`,{
    form_description: description,
    ElectionId:electionId,
    is_accepting_response:isEditing,
    id:accreditationForm.id
  })

 }

  if(query.data?.data.data){
   accreditation_form = query.data?.data.data.accreditation_form_and_questions
  }

  const toggleElection=()=>{
    const electionId= localStorage.getItem("electionId")
    axios.patch(`${BASE_URL}/election/accreditation/form`,{
      ElectionId:electionId,
      is_accepting_response:!isEditing,
      id:accreditationForm.id
    })
  }

  async function addMoreQuestions(e: any){

    const electionId= localStorage.getItem("electionId");

    axios.post(`${BASE_URL}/election/accreditation/form/question`, {
      "type": "short-answer",
      "AccreditationFormId": accreditation_form.id,
      "ElectionId": electionId
    }).then(()=> query.refetch())

  }

  // console.log(accreditation_form)

 
  const handleAddInput = () => {
    setInputs(prevInputs => [...prevInputs, { id: prevInputs.length }]);
  };
  const handleDeleteInput = (id: number) => {
    setInputs(prevInputs => prevInputs.filter(input => input.id !== id));
  };
  const toggleEdit =()=> {
    setIsEditing((current:boolean)=>!current)
    toggleElection()
  }
  return (
    <section className='h-[400vh] md:h-[250vh] w-full'>
         <Link href='/voters-acquisition'><button className=' bg-gray-300  rounded-full p-1 text-gray-700 font-thin mt-[7%] ml-[7%]'><ChevronLeft/></button></Link>
         <div className='dashboard-dimensions px-5 md:overflow-y-auto no-scrollbar'>
            <h1 className=' text-2xl font-medium'>Create Accreditation Form</h1>
            <p className='text-sm text-gray-500'>Personalize your accreditation form</p>
            <div className={cn('mt-3 h-10 flex justify-between px-5 w-full bg-white md:bg-[#F6F6F6]', !isEditing&&"bg-[#C92929] md:bg-[#C92929] !text-white")}>
              <p className=' opacity-0'>ss</p>
              <span className=' flex items-center gap-3'>{isEditing&&(
               <p className='text-[#2D3648]'> Accepting Response</p>
              )}{!isEditing&&(
                <p className='text-white'>Not Accepting Response</p>
              )} {isEditing&&(
                <ToggleRightIcon onClick={toggleEdit} size={35} className=' text-[#0654B0]'/>
              )}{!isEditing&&(
                <ToggleLeftIcon onClick={toggleEdit} size={35} />
              )}</span>
            </div>
            <aside className=' h-[15%] border-2 space-y-2 rounded px-6 py-3'>
                <Input value={accreditationFormTitle} onChange={sendTitle} placeholder='Form title' className=' bg-[#EAEAEA] border-none rounded placeholder:text-[#57595A]'/>
                <Input value={accreditationFormDescription} onChange={sendDescription} placeholder='Form Description' className='h-[5rem] bg-[#EAEAEA] border-none rounded placeholder:text-[#57595A]'/>
            </aside>
                 {(accreditation_form?.AccreditationFormQuestions ?? []).map((input: any) => (
                <InputComp key={input.id} accreditationFormQuestion={input} refetch={query.refetch}  />
                     ))}
                <Button onClick={addMoreQuestions} className='place-self-start border-2 border-[#0654B0] gap-x-2 text-[#0654B0] rounded'><Plus size={17}/>Add more questions</Button>
                <Button variant="ghost" className=' place-self-center bg-[#0654B0] gap-x-2 text-white mt-3 w-[85%] rounded'>Get link <ArrowRight size={17}/></Button>
         </div>
    </section>
  )
}

export default AccreditionForm