"use client"
import lightlogo from "../../../public/logolight.png"
import Image from "next/image"
import Link from "next/link"
import PinInput from 'react-pin-input';
import { useMutation} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const Otp = () => {
    const fetchData=(payload:any)=>{
        return axios.post("https://sbxapi.smoothballot.com/user/auth/sign-up/verify",{
            otp:payload.otp,
        })
     }
     const router = useRouter()
     const [error, setError]= useState("")
     const [otp, setOtp]= useState("")
     const mutation= useMutation({
        mutationFn:fetchData,
        mutationKey:["next"],
        onSuccess:()=>{
            console.log("succes");
            router.push("/dashboard")
        },
        onError:(e:any)=>{
            toast.error(e?.response?.data?.message)
        }
    })
    const submit=()=>{
        mutation.mutate({otp})
        console.log({otp});
    }
    return ( 
    <div className=" w-full">
        <section className="md:w-[70%] w-[90%] mx-auto items-start flex gap-2 flex-col">
             <header><Image className=" w-[110px] h-[110px]" src={lightlogo} alt="logo"/></header>
             <h1 className=" text-2xl text-[#1F2223] font-satoshi">Verify your e-mail</h1>
             <p className=" text-[#545454] font-satosh">Kindly input the 6 digit code that was sent to the e-mail provided below⚡</p>
             <div className=" ml-[-1rem]">
             <PinInput 
                length={6} 
                initialValue={otp}
                secret
                secretDelay={100} 
                onChange={(value, index) => {setOtp(value)}}
                type="numeric" 
                inputMode="number"
                style={{padding: '10px'}}  
                inputStyle={{borderColor: 'grey', borderRadius:"7px", margin:"5px"}}
                inputFocusStyle={{borderColor: 'blue'}}
                onComplete={(value, index) => {}}
                autoSelect={true}
                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                />
             </div>
                <p className=" text-red-500 text-sm">{error}</p>
                <p className=" text-sm text-[#0654B0] font-satosh">Resend code</p>
                <button onClick={submit} className=" widthMd text-white bg-[#0654B0] h-10 rounded-md font-satosh">Verify</button>
                <p className="mt-2 text-[#1F2223] text-sm font-satosh">Wrong Email?<Link href="/sign-up" ><span className="pl-1 text-[#0654B0]">Go back</span></Link></p>
        </section>
    </div>
     );
}
 
export default Otp;