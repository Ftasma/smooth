import { Button } from '@/components/ui/button'
import { ChevronLeft, CopyIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SendFunds = () => {
  return (
    <section className='h-screen'>
       <Link href='/our-pricing/calculate-price'><button className=' bg-gray-300  rounded-full p-1 text-gray-700 font-thin mt-[7%] ml-[7%]'><ChevronLeft/></button></Link> 
       <div className='dashboard-dimensions'>
       <h1 className='text-2xl font-semibold px-3 tracking-widest'>Billing and Payment</h1>
       <p className=' text-sm px-3'>The price of an election is based on the number of voters and <br /> duration of election process⚡</p>
       <div className='mt-4'>
          <p className='text-lg font-medium'>Wallet Balance: <span className='font-bold'>NGN 8,000.00</span></p>
        </div>
        <div className='mt-2 flex items-center justify-center'>
          <p className='text-3xl font-semibold text-center'>0983746768368</p>
          <CopyIcon size={24} className='ml-2 cursor-pointer' />
        </div>
        <div className='mt-8'>
          <p className='text-lg font-medium'>Account Name: <span className='font-semibold'>PRINCE OGBONNA</span></p>
          <p className='text-lg font-medium'>Account Bank: <span className='font-semibold'>Kredi Money MFB LTD</span></p>
          <p className='text-lg font-medium'>Amount to Pay: <span className='font-semibold'>NGN 27,000</span></p>
        </div>
        <div className='flex justify-center mt-6 gap-4'>
          <Link href="/payment/make-payment"><Button className='bg-[#0654B0] text-white px-6 py-2 rounded'>I've sent funds</Button></Link>
          <Button className='bg-[#EDF0F7] text-gray-600 px-6 py-2 rounded cursor-not-allowed' disabled>Make Payment</Button>
        </div>
       </div>
    </section>
  )
}

export default SendFunds