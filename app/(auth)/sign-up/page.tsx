"use client"
import Image from "next/image"
import lightlogo from "../../../public/logolight.png"
import picture from "../../../public/Rectangle 1.png"
import Link from "next/link"
import { useMutation} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
const SignUp = () => {
    const fetchData=(payload:any)=>{
        return axios.post("https://sbxapi.smoothballot.com/user/auth/sign-up",{
            name:payload.name,
            email:payload.email,
            password:payload.password,
        })
     }
     const router = useRouter()
     const [name, setName]= useState("")
     const [email, setEmail]= useState("")
     const [error, setError]= useState("")
     const [password, setPassword]= useState("")
     const mutation= useMutation({
        mutationFn:fetchData,
        mutationKey:["next"],
        onSuccess:()=>{
            console.log("succes");
            router.push("/otp")
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
        mutation.mutate({name,email,password})
        console.log({name,email,password});
    }
    return ( 
    <div className="flex  w-full">
       <section className="pt-6 px-6 md:ml-16 flex w-full flex-col gap-4 md:w-[50%]">
            <header><Image className=" w-[110px] h-[110px]" src={lightlogo} alt="logo"/></header>
            <div className="flex flex-col gap-3 w-full mx-auto">
            <h1 className=" text-[#1F2223] text-2xl">Create an account</h1>
            <p className="w-[80%] pt-2 text-[#57595A]  text-sm ">We just need a little information from you to get started✨</p>
            <aside className="pt-3 flex flex-col gap-3">
                <label className=" flex flex-col gap-2">
                    <p>Name</p>
                    <input required value={name} onChange={(e)=>setName(e.target.value)} className="widthMd bg-[#EAEAEA] focus:outline-none placeholder:pl-2 pl-2 md:w-[70%] h-10 border-2 border-[#E5E5E5] rounded-md" type="text" placeholder="John Doe"/>
                </label>
                <label className=" flex flex-col gap-2">
                    <p>Email</p>
                    <input required value={email} onChange={(e)=>setEmail(e.target.value)} className="widthMd bg-[#EAEAEA] focus:outline-none placeholder:pl-2 pl-2 md:w-[70%] h-10 border-2 border-[#E5E5E5] rounded-md" type="email" placeholder="Johnismydoe@gmail.com"/>
                </label>
                <label className=" flex flex-col gap-2">
                    <p>Password</p>
                    <input required value={password} onChange={(e)=>setPassword(e.target.value)} className="widthMd bg-[#EAEAEA] focus:outline-none placeholder:pl-2 pl-2 md:w-[70%]  h-10 border-2 border-[#E5E5E5] rounded-md" type="password"/>
                </label>
                <p className=" text-red-500 text-sm">{error}</p>
                <button onClick={submit} className="w-[min(100%,38rem)]  md:w-[70%] text-white bg-[#0654B0] h-10 rounded-md">Get Started</button>
                <p className=" text-sm">Already have an account? <Link href="/sign-in"><span className=" text-[#0654B0]">Login here</span></Link> </p>
            </aside>
            </div>
       </section>
       <section className="w-[50%] hidden md:block">
            <Image className=" object-cover" src={picture} alt="right image"/>
       </section>
    </div>
     );
}
 
export default SignUp;