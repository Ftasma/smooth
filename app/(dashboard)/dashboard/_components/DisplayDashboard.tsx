import { Button } from '@/components/ui/button'
import { BASE_URL } from '@/lib/endpoints'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Loader2, Plus, Vote } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import vote from "../../../../public/Vector (1).png"
import React from 'react'
import Image from "next/image"
const DisplayDashboard = () => {
  const router = useRouter()

  const fetchData = async () => {
    const response = await axios.get(`${BASE_URL}/election`)
    return response.data
  }

  const { data, isLoading, isError } = useQuery({
    queryFn: fetchData,
    queryKey: ['elections'],
  })

  const eachElection = (id: any, name: any, election_date: any) => {
    localStorage.setItem('electionId', id)
    localStorage.setItem('electionName', name)
    localStorage.setItem('electionDate', election_date)
    console.log(id, name)
    router.push('/election-management-dashboard')
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
    <Loader2 className="animate-spin" size={48} />
  </div>
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen">
    <p>Error loading data</p>
  </div>
  }

  const elections = data?.data?.elections || []

  return (
    <section className='flex flex-col gap-16 h-[100%] md:h-[500vh] p-6'>
      <div className='place-self-end'>
        <Link href="/our-pricing">
          <Button variant="ghost" className='bg-[#0654B0] text-white font-satosh flex gap-2'>
            <span><Plus size={15} /></span>
            Create new election
          </Button>
        </Link>
      </div>
      <h1 className='text-[#57595A] text-3xl place-self-center font-satoshi'>Your elections</h1>
      <div className='grid md:grid-cols-3 grid-cols-2 place-self-center'>
        {Array.isArray(elections) && elections.length > 0 ? (
          elections.map((election: any) => (
            <div
              onClick={() => eachElection(election.id, election.name, election.election_date)}
              className='md:w-[15rem] w-[10rem] flex flex-col justify-center gap-3 items-center shadow-lg  m-2 py-2 px-3 md:h-[180px] h-[160px] cursor-pointer bg-white rounded-[5%]'
              key={election.id}
            >
              <Image src={vote} alt='Vote icon' height={20} width={20}/>
              <p className='max-h-10 text-md font-satosh'>{election.name}</p>
              {/* <p className='text-[#57595A]'>Starting:{election.election_date.split("")}</p> */}
            </div>
          ))
        ) : (
          <div>No elections found</div>
        )}
      </div>
    </section>
  )
}

export default DisplayDashboard
