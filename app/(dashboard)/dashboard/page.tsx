"use client"
import FirstTimeDisplay from '@/components/FirstTimeDisplay'
import { BASE_URL } from '@/lib/endpoints'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const Dashboard = () => {
  const fetchData=()=>{
    return  axios.get(`${BASE_URL}/election`)
    
 }
 const query = useQuery({
  queryFn: fetchData,
  queryKey: ['next'],
 })
//  console.log(query?.data?.data?.data);
 
const isElection = query?.data?.data?.data?.elections[0]?.name
console.log(isElection);
// console.log(isElection[0]);




  return (
    <section>
     {isElection ? (
        <div>{query?.data?.data?.data?.elections.map(
          (election:any)=>{
            return <div key={election.id}>{election.name}</div>
          }
        
        )}</div>
      ) : (
        <FirstTimeDisplay />
      )}
    </section>
  )
}

export default Dashboard