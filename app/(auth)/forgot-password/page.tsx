"use client"
import Image from "next/image"
import lightlogo from "../../../public/logolight.png"
import picture from "../../../public/Rectangle 1.png"
import Link from "next/link"
import { useMutation} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"
const ForgotPassword = () => {
    const fetchData=(payload:any)=>{
        return axios.post("https://sbxapi.smoothballot.com/user/auth/forgot-password/init",{
            email:payload.email,
        })
     }
     const router = useRouter()
     const [email, setEmail]= useState("")
     const [error, setError]= useState("")
     const mutation= useMutation({
        mutationFn:fetchData,
        mutationKey:["next"],
        onSuccess:()=>{
            console.log("succes");
            router.push("/otp/forgot-password-otp")
        },
        onError:(e:any)=>{
            toast.error(e?.response?.data?.message)
        }
    })
    const submit=()=>{
        mutation.mutate({email})
        console.log({email});
    }
    return ( 
    <div className=" h-screen flex  w-full">
       <section className="pt-6  px-6 flex flex-col gap-4 w-full mx-auto">
            <header><Image className=" w-[110px] h-[110px]" src={lightlogo} alt="logo"/></header>
            <h1 className=" text-[#1F2223] text-2xl font-satoshi">Forgot password</h1>
            <p className="w-[80%] pt-2 text-[#57595A]  text-sm font-satosh">Kindly input your e-mail below</p>
            <aside className="pt-3 flex flex-col gap-3">
                <label>
                    <p className="font-satoshi">Email</p>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} className="widthMd bg-[#EAEAEA] focus:outline-none placeholder:font-satosh placeholder:pl-2 pl-2 md:w-[21rem] w-[80%] h-10 border-2 border-[#E5E5E5] rounded-md" type="email" placeholder="Johnismydoe@gmail.com"/>
                </label>
                <p className=" text-red-500 text-sm">{error}</p>
                <button onClick={submit} className="widthMd w-[80%] md:w-[21rem] text-white bg-[#0654B0] h-10 rounded-md font-satosh">Submit</button>
            </aside>
       </section>
    </div>
     );
}
 
export default ForgotPassword;