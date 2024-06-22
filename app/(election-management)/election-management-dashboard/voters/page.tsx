"use client"
import { BASE_URL } from '@/lib/endpoints'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const fetchData=(payload:any)=>{
    const electionId= localStorage?.getItem("electionId")
    return axios.post(`${BASE_URL}/election/voter/filter`,{
        ElectionId:payload.electionId,
        page:payload.page,
        per_page:payload.perPage
    })
 }
 const mutation = useMutation({
    mutationFn:fetchData,
    mutationKey:["next"],
    onSuccess:(response)=>{
        console.log(response);
    },
    onError:(e:any)=>{
        console.log(e);
    }
 })
//  useEffect(()=>{
//   mutation.mutate({electionId, page:1, perPage:50})
//  },[])
  
  return (
    <div className='h-screen'>page</div>
  )
}

export default Page