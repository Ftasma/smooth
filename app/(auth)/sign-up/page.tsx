"use client"
import Image from "next/image"
import lightlogo from "../../../public/logolight.png"
import picture from "../../../public/Rectangle 1.png"
import Link from "next/link"
import { useMutation} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/lib/endpoints"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"
const SignUp = () => {
    const fetchData=(payload:any)=>{
        return axios.post(`${BASE_URL}/user/auth/sign-up`,{
            name:payload.name,
            email:payload.email,
            password:payload.password,
        })
     }
     const router = useRouter()
     const [name, setName]= useState("")
     const [email, setEmail]= useState("")
     const [password, setPassword]= useState("")
     const [isLoading, setIsloading]= useState(false)
     const [showPassword, setShowPassword] = useState(false)
     const mutation= useMutation({
        mutationFn:fetchData,
        mutationKey:["next"],
        onSuccess:(respose)=>{
            setIsloading(true)
            console.log(respose);
            setTimeout(()=>{  
                setIsloading(false)
                router.push("/otp")
            },3000)
        },
        onError:(e:any)=>{
            toast.error(e?.response?.data?.message)
        }
    })
    const submit=()=>{
        mutation.mutate({name,email,password})
        console.log({name,email,password});
    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return ( 
    <div className="flex  w-full">
       <section className="pt-6 md:px-16 px-8 flex w-full flex-col gap-4 md:w-[50%]">
            <header><Image className=" w-[110px] h-[110px]" src={lightlogo} alt="logo"/></header>
            <div className="flex flex-col gap-3 w-full mx-auto">
            <h1 className=" text-[#1F2223] text-2xl font-satoshi">Create an account</h1>
            <p className="w-[80%] pt-2 text-[#57595A]  text-sm font-satosh">We just need a little information from you to get started✨</p>
            <aside className="pt-3 flex flex-col gap-3">
                <label className=" flex flex-col gap-2">
                    <p className="font-satoshi">Name</p>
                    <input required value={name} onChange={(e)=>setName(e.target.value)} className="widthMd bg-[#EAEAEA] focus:outline-none placeholder:font-satosh placeholder:pl-2 pl-2 md:w-full h-10 border-2 border-[#E5E5E5] rounded-md" type="text" placeholder="John Doe"/>
                </label>
                <label className=" flex flex-col gap-2">
                    <p className="font-satoshi">Email</p>
                    <input required value={email} onChange={(e)=>setEmail(e.target.value)} className="widthMd bg-[#EAEAEA] focus:outline-none placeholder:font-satosh placeholder:pl-2 pl-2 md:w-full h-10 border-2 border-[#E5E5E5] rounded-md" type="email" placeholder="Johnismydoe@gmail.com"/>
                </label>
                <label className=" flex flex-col gap-2">
                    <p className="font-satoshi">Password</p>
                    <div className="relative widthMd md:w-[100%] w-[80%]">
                    <input required placeholder="********" value={password} onChange={(e)=>setPassword(e.target.value)} className="widthMd bg-[#EAEAEA] focus:outline-none placeholder:font-satosh placeholder:pl-2 pl-2 md:w-full  h-10 border-2 border-[#E5E5E5] rounded-md" type={showPassword ? "text" : "password"}/>
                    <button
                                type="button"
                                onClick={toggleShowPassword}
                                className="absolute  right-2 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none"
                                >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                    </div>
                </label>
                <button disabled={isLoading} onClick={submit} className={cn("widthMd w-[80%] md:w-full text-white bg-[#0654B0] h-10 rounded-md font-satosh",isLoading&&"bg-opacity-40")}>{
                     isLoading?(
                        <div className='flex items-center justify-center'>
                        <Loader2 size={20} className='animate-spin'/>
                       
                        </div>
                      ):"Sign-up"
                 }</button>
                <p className=" text-sm font-satosh">Already have an account? <Link href="/sign-in"><span className=" text-[#0654B0]">Login here</span></Link> </p>
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