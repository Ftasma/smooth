import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AccreditionForm = () => {
  return (
    <section className='h-[100vh] w-full'>
         <Link href='/voters-acquisition'><button className=' bg-gray-300  rounded-full p-1 text-gray-700 font-thin mt-[7%] ml-[7%]'><ChevronLeft/></button></Link>
         <div>
          
         </div>
    </section>
  )
}

export default AccreditionForm