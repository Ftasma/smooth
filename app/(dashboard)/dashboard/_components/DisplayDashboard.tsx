import { Button } from '@/components/ui/button'
import { BASE_URL } from '@/lib/endpoints'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const DisplayDashboard = () => {
  const router = useRouter()
    const fetchData=()=>{
      
     
      return  axios.get(`${BASE_URL}/election`)
        
     }
     const query = useQuery({
      queryFn: fetchData,
      queryKey: ['next'],
     })
     const eachElection=(id:any, name:any, election_date:any)=>{
      localStorage.setItem('electionId',id);
      localStorage.setItem("electionName", name)
      localStorage.setItem("electionDate", election_date)
       console.log(id,name);
       router.push('/election-management-dashboard')
     }
     console.log(query?.data?.data?.data.elections);
  return (
    <section className='flex flex-col gap-16 h-[100%] md:h-screen p-6'>
        <div className=' place-self-end'>
             <Link href="/create-election"><Button variant="ghost" className='bg-[#0654B0] text-white flex gap-2'><span><Plus size={18}/></span>Create new election</Button></Link>
        </div>
        <h1 className='text-[#57595A] text-2xl font-bold place-self-center'>Your elections</h1>
        <div className='grid md:grid-cols-3 grid-cols-2 place-self-center'>{query?.data?.data?.data?.elections.map(
          (election:any)=>{
            return( 
    
            <div onClick={()=>eachElection(election.id, election.name, election.election_date)} className=' justify-around w-32 border-2 h-20 rounded border-gray-300 m-2 p-2 cursor-pointer' key={election.id}>{election.name}</div>
        )}
        
        )}</div>
      
    </section>
  )
}

export default DisplayDashboard