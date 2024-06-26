"use client"
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from "next/image"
import rocket from "@/public/image 1.png"
import axios from 'axios'
import { BASE_URL } from '@/lib/endpoints'
import { useQuery } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'
const MakePayment = () => {
  const {toast}= useToast()
  const [balance, setBalance] = useState<any>(0)
  const [noOfVoters, setNoOfVoters]= useState<any>()
  const [noOfMonths, setNoOfMonths]= useState<any>()
  const [quote, setQuote]= useState<any>()
  const [showDialog, setShowDialog]= useState(false)
  useEffect(()=>{
   const noOfVoters=  localStorage.getItem("noOfVoters")
   const noOfMonths=  localStorage.getItem("noOfMonths")
   const quote = localStorage.getItem("quote")
   setNoOfVoters(noOfVoters)
   setNoOfMonths(noOfMonths)
   setQuote(quote)
  },[])
  console.log(quote, noOfMonths, noOfVoters);
  const getWallet = async () => {
    return await axios.get(`${BASE_URL}/wallet`);
}
const walletQuery = useQuery({
  queryFn: getWallet,
  queryKey: ['next'],
});
const wallet = walletQuery?.data?.data?.data?.wallet;
useEffect(() => {
  if (wallet) {
      setBalance(wallet._balance);
  }
}, [wallet]);
const sendPayment =(payload:any)=>{
  try {
    console.log(noOfVoters,noOfMonths);
    
    axios.post(`${BASE_URL}/billing`,{
      type:"paid",
      no_of_voters: noOfVoters,
    no_of_months: noOfMonths
  }).then(()=>{
    toast({
      title:"payment sucessful"
    })
  })
  } catch (error) {
    
  }
}
  return (
    <section className='h-screen'>
      <Link href='/payment/send-funds'><button className=' bg-gray-300  rounded-full p-1 text-gray-700 font-thin mt-[7%] ml-[7%]'><ChevronLeft/></button></Link>
      <div className='dashboard-dimensions !h-[50%] !my-auto'>
          <h1 className='text-2xl font-satoshi px-3 tracking-widest'>Billing and Payment</h1>
          <p className=' text-sm px-3'>The price of an election is based on the number of voters and <br /> duration of election process⚡</p>
          <div className='mt-4'>
             <p className='text-lg font-satoshi'>Wallet Balance: <span className='font-satosh'>NGN {balance}</span></p>
             <p className='text-lg mt-3 font-satoshi'>Amount to Pay: <span className='font-satosh'>{quote}</span></p>
        </div>  
        <div className='flex justify-center mt-6 gap-4'>
          <Button className='bg-[#EDF0F7] text-gray-600 px-6 py-2 rounded' disabled>I've sent funds</Button>
          <Dialog>
          <DialogTrigger><Button onClick={sendPayment} className=' bg-[#0654B0] text-white  px-6 py-2 rounded cursor-pointer' >Make Payment</Button></DialogTrigger>
          <DialogContent className='text-center'>
            <div className='w-full'>
            <Image className='mx-auto object-cover' src={rocket} alt='rocket' height={300} width={300}/>
            </div>
              <h1 className='-mt-6 text-2xl font-semibold'>Wohoo!</h1>
              <p className='text-sm'>Subscription Successful, You can now proceed to create and <br /> manage election!</p>
              <Link href="/create-election"><Button className='bg-[#0654B0] text-white px-5 w-[60%] py-2 rounded m}x-auto'>Create Election</Button></Link>
          </DialogContent>
          </Dialog>

        </div>
      </div>
    </section>
  )
}

export default MakePayment