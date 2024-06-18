import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Ourpricing = () => {
  return (
    <section className='h-screen'>
        <Link href='/dashboard'><button className=' bg-gray-300  rounded-full p-1 text-gray-700 font-thin mt-[7%] ml-[7%]'><ChevronLeft/></button></Link>
        <div className='dashboard-dimensions overflow-y-auto no-scrollbar'>
            <h1 className='text-2xl font-semibold'>Our Pricing</h1>
            <p className=' text-sm text-[]'>Explore our flexible pay per use pricing⚡</p>
            <aside className='flex md:flex-row flex-col justify-around px-4 h-full w-full md:gap-0 gap-3'>
                <div className='leftSide border-[1px] border-[#D2D3D3] h-[89%] bg-[#F6F6F6] mx-auto w-[90%] md:w-[45%] rounded p-4 text-[#57595A] shadow-lg sm:overflow-y-auto no-scrollbar'>
                    <div className='mt-[3%]'>
                    <h2 className=' text-2xl font-semibold tracking-wide'>Free Plan</h2>
                    <p className=' tracking-wide font-normal'>Ideal for demo election</p>
                    </div>
                    <ul className='list-disc list-inside text-start mt-[10%] text-xl tracking-wide'>
                        <li>Up to 5 voters</li>
                        <li>Candidate bios and photos</li>
                        <li>Basic security features</li>
                        <li>Basic analytics and reporting</li>
                    </ul>
                    <Link href="/create-election"><Button className='p-3 shadow-md border-2 border-[#0654B0] text-[#0654B0] bg-white rounded mt-[20%] font-semibold px-8'>Create demo election</Button></Link>
                </div>
                <div className='rightSide border-[1px] border-[#D2D3D3] h-[89%] bg-[#F6F6F6] mx-auto w-[90%] md:w-[45%] rounded p-4 text-[#57595A] shadow-lg sm:overflow-y-auto no-scrollbar'>
                <div className='mt-[3%]'>
                    <h2 className=' text-2xl font-semibold tracking-wide'>Paid Plan</h2>
                    <p className=' tracking-wide font-normal'>Perfect for standard election</p>
                    </div>
                    <ul className='list-disc list-inside text-start mt-[10%] text-xl tracking-wide'>
                        <li>Pay per voters</li>
                        <li>Access to standard analytical dashboard</li>
                        <li>Advanced security features</li>
                        <li>Real time monitoring and results</li>
                    </ul>
                    <Link href="/our-pricing/calculate-price"><Button className='p-3 shadow-md text-white bg-[#0654B0] rounded mt-[18%]  font-semibold px-8'>View Pricing Details</Button></Link>
                </div>
            </aside>
        </div>
    </section>
  )
}

export default Ourpricing