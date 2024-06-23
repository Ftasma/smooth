"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import axios from 'axios'
import { BASE_URL } from '@/lib/endpoints'
import { AlertCircle, ChevronLeft, Upload, X } from 'lucide-react'
import { useRouter } from 'next/navigation';
import papa from "papaparse";
import { v4 as uuidv4 } from "uuid";
import z from "zod";
import { useToast } from "@/components/ui/use-toast"
import { fileUploadInstance } from '@/components/ClientSetup'
import { useMutation } from '@tanstack/react-query'

const VotersAcquisition = () => {
  const [file, setFile] = useState<any>();
  const [isFileSelected, setIsFileSelected] = useState(false);
  const { toast } = useToast()
  const router = useRouter()

  const sendData = async (payload: any) => {
    const electionId = localStorage.getItem("electionId")
    axios.patch(`${BASE_URL}/election`, {
      id: electionId,
      voters_acquisition_channel: 'form',
    }).then((res) => {
      router.push('/accreditation-form')
    })
  }

  const sendCsvData = async (payload: any) => {
    const electionId = localStorage.getItem("electionId")
    axios.patch(`${BASE_URL}/election`, {
      id: electionId,
      voters_acquisition_channel: 'csv',
      csv_file: payload.csv_file
    }).then(() => {
      toast({
        title: "CSV Uploaded successfully",
      })
    }).then(()=>{
      router.push("/dashboard")
    })
  }

  function handleChange(e: any) {
    console.log(e.target.files[0])
    papa.parse(e.target.files[0], {
      header: true,
      complete: (results) => {
        const possible_email_headers = ["email", "e-mail", "Email", "E-mail", "EMAIL", "E-MAIL"];
        const first_data = Object.keys(results.data[0] as any);

        const filtered_result = results.data.filter((_: any) => Object.values(_).every((_: any) => ![undefined, ""].includes(_)));

        console.log(filtered_result)
        // 1st check
        if (!first_data.some(_ => possible_email_headers.includes(_))) {
          toast({
            variant: "destructive",
            title: "CSV doesn't contain Email field",
          })
          return;
        }
        console.log(first_data);
        console.log(results);
        setFile(e.target.files[0]);
        setIsFileSelected(true);
        const email_text = first_data.find(field => ["email", "e-mail", "Email", "E-mail", "EMAIL", "E-MAIL", "electronic mail", "ELECTRONIC MAIL", "electronic-mail", "ELECTRONIC-MAIL"].includes(field));
        console.log(email_text);

        const email_error_index = filtered_result.findIndex((_: any) => z.string().email().safeParse(_[email_text as any]).error);

        if (email_error_index !== -1) {
          toast({
            variant: "destructive",
            title: `Invalid email at row ${email_error_index + 2} showing ${(filtered_result as any)[email_error_index][email_text as any]}`,
          })
        }
      }
    })
  }

  const mutation = useMutation({
    mutationFn: sendCsvData,
    mutationKey: ["this"],
  })

  const submitCsv = async () => {
    const key = uuidv4();
    const response = await axios.get(`https://sbxapi.smoothballot.com/storage/url?key=${key}`);
    const signed_upload_url = response.data.data.url;
    await fileUploadInstance(signed_upload_url, file.type).put("", file);
    const file_url = `https://smooth-ballot.s3.eu-north-1.amazonaws.com/${key}`;
    const electionId = localStorage.getItem("electionId");
    const fileSize = file.size; 
    mutation.mutate({
      id: electionId,
      csv_file: {
        "link": file_url,
        "id": key,
        "size": fileSize, 
      },
    } as any);
    setIsFileSelected(false);
    setFile(null);
    console.log({
      id: electionId,
      csv_file: {
        "link": file_url,
        "id": key,
        "size": fileSize, 
      },
    } as any);
  }

  return (
    <section className='h-[100vh] w-full'>
      <Link href='/create-election-2'><button className='bg-gray-300 rounded-full p-1 text-gray-700 font-thin mt-[7%] ml-[7%]'><ChevronLeft /></button></Link>
      <aside className='dashboard-dimensions sm:overflow-y-auto no-scrollbar'>
        <h1 className='text-[#1F2223] text-2xl font-bold '>Voters Acquisition</h1>
        <p className='text-[#57595A]'>Choose one of the following options⚡</p>
        <div className='flex justify-around'>
          <span className='z-50 rounded-full flex items-center justify-center bg-[#0654B0] p-3 px-6 w-9 text-white'><p className='place-self-center'>1</p></span>
          <span className='z-50 rounded-full flex items-center justify-center bg-[#0654B0] p-3 px-6 w-9 text-white'><p className='place-self-center'>2</p></span>
          <span className='z-50 rounded-full flex items-center justify-center bg-[#0654B0] p-3 px-6 w-9 text-white'><p className='place-self-center'>3</p></span>
          <span className='z-50 rounded-full flex items-center justify-center bg-[#0654B0] p-3 px-6 w-9 text-white'><p className='place-self-center'>4</p></span>
        </div>
        <div className='border-[#BCBCBC] border w-[75%] mx-auto border-dotted -mt-8' />
        <aside className='mt-12 space-y-3'>
          <div className={`original-border mx-auto !h-[12rem] !w-[80%] !border-[#BCBCBC] gap-3 flex flex-col justify-center items-center relative ${isFileSelected ? 'border-dashed' : 'border-solid'}`}>
            {isFileSelected ? (
              <div className='flex flex-col items-center'>
                <p className='text-[#1F2223]'>File Selected: {file.name}</p>
                <X className='cursor-pointer text-[#FF0000] mt-2' onClick={() => { setFile(null); setIsFileSelected(false); }} />
              </div>
            ) : (
              <>
                <Input accept="text/csv" onChange={handleChange} id="file" className='opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer' type="file" />
                <Upload className='text-[#0654B0] text-sm' />
                <p className='text-[#1F2223]'>Import .csv file</p>
              </>
            )}
          </div>
          <div className='original-border mx-auto !h-[58px] !w-[80%] !border-[#BCBCBC] justify-center items-center flex gap-4'>
            <p>Or create <span onClick={sendData} className='text-[#0654B0] cursor-pointer'>accreditation form</span></p>
          </div>
        </aside>
          <p className='mx-auto px-6 flex gap-1 mt-2 text-[#EE9322]'><AlertCircle size={22}/>Only one option must be used, Using both will lead to loss of voter’s data</p>
        <Button onClick={submitCsv} variant="ghost" className='mt-5 text-[#F6F6F6] bg-[#0654B0] w-[80%] h-[58px] mx-auto' disabled={!isFileSelected}>Continue</Button>
      </aside>
    </section>
  )
}

export default VotersAcquisition
