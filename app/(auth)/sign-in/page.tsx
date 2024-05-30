"use client"
import Image from "next/image"
import lightlogo from "../../../public/logolight.png"
import picture from "../../../public/Rectangle 1.png"
import Link from "next/link"
import { useMutation} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"
import { useCookies } from "react-cookie"
import { BASE_URL } from "@/lib/endpoints"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"

const SignIn = () => {
    const [ cookie, setCookie ] = useCookies();
    const fetchData=(payload:any)=>{
        return axios.post(`${BASE_URL}/user/auth/login`,{
            email:payload.email,
            password:payload.password,
        })
     }
     const router = useRouter()
     const [email, setEmail]= useState("")
     const [password, setPassword]= useState("")
     const [error, setError]= useState("")
     const [isAuth, setIsAuth]= useState(false)
     const [isLoading, setIsloading]= useState(false)
     const mutation= useMutation({
        mutationFn:fetchData,
        mutationKey:["next"],
        onSuccess:(response)=>{
            setIsloading(true)
            const token= response.data.data.token
            console.log(token);
            setCookie("token", token, {
                path: "/",
                maxAge: 3600,
                sameSite: false,
              });
            console.log("succes");
            setTimeout(()=>{  
                setIsloading(false)
               router.push("/dashboard")
            },3000)
        },
        onError:(e:any)=>{
            toast.error(e?.response?.data?.message)
            console.log(e?.response?.data?.message);
        }
    })
    const submit=()=>{
        mutation.mutate({email,password})
        console.log({email,password});
    }
    return (
    <div className="flex  w-full">
       <section className="pt-6 px-6 md:ml-16 flex w-full flex-col gap-4 md:w-[50%]">
            <header><Image className=" w-[110px] h-[110px]" src={lightlogo} alt="logo"/></header>
            <div className="flex flex-col gap-3 w-full mx-auto">
            <h1 className=" text-[#1F2223]  text-2xl">Welcome back!</h1>
            <p className="w-[80%]  text-[#57595A]  text-sm ">Please enter your credentials to access your account</p>
            <aside className=" flex flex-col gap-3">
                <label className=" flex flex-col gap-2">
                    <p>Email</p>
                    <input required value={email} onChange={(e)=>setEmail(e.target.value)} className="widthMd bg-[#EAEAEA] focus:outline-none placeholder:pl-2 pl-2 md:w-[70%] w-[80%] h-10 border-2 border-[#E5E5E5] rounded-md" type="email" placeholder="Johnismydoe@gmail.com"/>
                </label>
                <label className=" flex flex-col gap-2">
                    <p>Password</p>
                    <input required value={password} onChange={(e)=>setPassword(e.target.value)} className="widthMd bg-[#EAEAEA] focus:outline-none placeholder:pl-2 pl-2 md:w-[70%] w-[80%] h-10 border-2 border-[#E5E5E5] rounded-md" type="password"/>
                </label>
                <p className=" text-red-500 text-sm">{error}</p>
                <Link href="/forgot-password"><p className="my-1 text-sm text-[#0654B0]">Forgot password?</p></Link>
                 <button disabled={isLoading} onClick={submit} className={cn("widthMd w-[80%] md:w-[70%] text-white bg-[#0654B0] h-10 rounded-md",isLoading&&"bg-opacity-40")}>{
                     isLoading?(
                        <div className='flex items-center justify-center'>
                        <Loader2 size={20} className='animate-spin'/>
                       
                        </div>
                      ):"Login"
                 }</button>
                <p className=" text-sm">Don't have an account? <Link href="/sign-up"> <span className=" text-[#0654B0]">Create one</span></Link></p>
            </aside>
            </div>
       </section>
       <section className="w-[50%] hidden md:block">
            <Image className=" object-cover" src={picture} alt="right image"/>
       </section>
    </div>
     );
}
export default SignIn;