"use client"
import Image from "next/image"
import lightlogo from "../../../../public/logolight.png"
import { useMutation} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
const NewPassword = () => {
    const fetchData=(payload:any)=>{
        return axios.post("https://sbxapi.smoothballot.com/user/auth/forgot-password",{
            password:payload.password,
            session_id:localStorage.getItem("session")
        })
     }
     const router = useRouter()
     const [password, setPassword]= useState("")
     const [error, setError]= useState("")
     const mutation= useMutation({
        mutationFn:fetchData,
        mutationKey:["next"],
        onSuccess:()=>{
            console.log("succes");
            router.push("/sign-in")
        },
        onError:(e:any)=>{
            console.log(e?.response?.data?.message);
            setError(e?.response?.data?.message)
                setTimeout(()=>{
                    setError("")
                },3000)
        }
    })
    const submit=()=>{
        mutation.mutate({password})
        console.log({password});
    }
    return (
    <div className="flex h-screen w-full">
       <section className="pt-6  px-6 flex flex-col gap-4 mx-auto w-full">
            <header><Image className=" w-[110px] h-[110px]" src={lightlogo} alt="logo"/></header>
            <h1 className=" text-[#1F2223] text-2xl">Create new password</h1>
            <p className="w-[80%] pt-2 text-[#57595A]  text-sm ">Make it memorable</p>
            <aside className="pt-3 flex flex-col gap-3">
                <label>
                    <p>Password</p>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} className=" bg-[#EAEAEA] focus:outline-none placeholder:pl-2 pl-2 widthMd h-10 border-2 border-[#E5E5E5] rounded-md" type="password" placeholder="********"/>
                </label>
                <label>
                    <p>Confirm Password</p>
                    <input className=" bg-[#EAEAEA] focus:outline-none placeholder:pl-2 pl-2 widthMd h-10 border-2 border-[#E5E5E5] rounded-md" type="password" placeholder="********"/>
                </label>
                <p className=" text-red-500 text-sm">{error}</p>
                <button onClick={submit} className="widthMd text-white bg-[#0654B0] h-10 rounded-md">Submit</button>
            </aside>
       </section>
    </div>
     );
}
 
export default NewPassword;