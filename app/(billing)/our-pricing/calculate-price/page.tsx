"use client"
import { Button } from '@/components/ui/button'
import { ChevronLeft, InfoIcon, Loader2 } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from 'axios'
import { BASE_URL } from '@/lib/endpoints'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const CalculatePrice = () => {
    const [noOfVoters, setNoOfVoters] = useState<number>(0)
    const [noOfMonths, setNoOfMonths] = useState<number>(0)
    const [quote, setQuote] = useState<number>(0)
    const [balance, setBalance] = useState<number>(0)
    const router = useRouter()

    const sendCalculations = (payload: { noOfVoters: number, noOfMonths: number }) => {
        return axios.post(`${BASE_URL}/billing/quote`, {
            no_of_voters: payload.noOfVoters,
            no_of_months: payload.noOfMonths,
        })
    }

    const mutation = useMutation({
        mutationFn: sendCalculations,
        mutationKey: ["keyy"],
        onSuccess: (response) => {
            console.log(response?.data?.data?.quote);
            setQuote(response?.data?.data?.quote?.total)
        },
        onError: (e: any) => { alert("error") }
    })

    const submit = () => {
        mutation.mutate({ noOfVoters, noOfMonths })
    }

    const getWallet = async () => {
        const response = await axios.get(`${BASE_URL}/wallet`);
        return response.data.data.wallet;
    }

    const { data: wallet, isLoading: walletLoading } = useQuery({
        queryFn: getWallet,
        queryKey: ['wallet'],
    });

    useEffect(() => {
        if (wallet) {
            setBalance(wallet._balance);
        }
    }, [wallet]);

    const pay = () => {
        localStorage.setItem("noOfVoters", noOfVoters.toString())
        localStorage.setItem("noOfMonths", noOfMonths.toString())
        localStorage.setItem("quote", quote.toString())
        router.push("/payment/make-payment")
    }

    if (walletLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="animate-spin" size={48} />
            </div>
        );
    }

    return (
        <section className='h-screen'>
            <Link href='/our-pricing'><button className='bg-gray-300 rounded-full p-1 text-gray-700 font-thin mt-[7%] ml-[7%]'><ChevronLeft /></button></Link>
            <div className='dashboard-dimensions overflow-y-auto no-scrollbar'>
                <h1 className='text-2xl font-satoshi px-3'>Calculate Price</h1>
                <p className='text-sm px-3'>The price of an election is based on the number of voters and <br /> duration of election process⚡</p>
                <aside className='flex md:flex-row flex-col justify-around px-4 h-full w-full md:gap-0 gap-3 mt-6'>
                    <div className='leftSide border-[1px] border-[#D2D3D3] h-[69%] my-auto bg-[#F6F6F6] mx-auto w-[90%] md:w-[45%] rounded p-4 text-[#57595A] shadow-lg'>
                        <label className='w-full flex flex-col gap-2'>
                            <p className='text-start'>Number of voters</p>
                            <input value={noOfVoters} onChange={(e) => setNoOfVoters(e.target.valueAsNumber)} type="number" className='w-[98%] p-3 rounded border-[1px] border-[#D2D3D3] h-12' />
                        </label>
                        <label className='w-full flex flex-col mt-3 gap-2'>
                            <div className='flex items-center justify-between w-[98%]'>
                                <p className='text-start'>Duration of election process</p>
                                <InfoIcon size={18} className='' />
                            </div>
                            <div className='relative justify-start w-full'>
                                <input value={noOfMonths} onChange={(e) => setNoOfMonths(e.target.valueAsNumber)} type="number" min={1} max={24} className='w-[98%] p-3 rounded border-[1px] border-[#D2D3D3] h-12' />
                                <span className='absolute right-[50%] top-1/2 transform -translate-y-1/2'>months</span>
                            </div>
                        </label>
                        <Button onClick={submit} className='p-3 shadow-md text-white bg-[#0654B0] rounded mt-5 w-[98%] font-semibold px-12'>Calculate</Button>
                    </div>
                    <div className='rightSide border-[1px] border-[#D2D3D3] h-[69%] my-auto bg-[#F6F6F6] mx-auto w-[90%] md:w-[45%] rounded p-4 text-[#57595A] shadow-lg sm:overflow-y-auto no-scrollbar'>
                        <h2 className='mt-[15%] text-start font-satoshi text-2xl text-[#0654B0]'>Cart summary</h2>
                        <div className='flex justify-between text-[#363939] font-semibold tracking-widest mt-3'>
                            <p>Total</p>
                            <p>{quote}</p>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button disabled={!quote} className='py-5 shadow-md w-[98%] text-white bg-[#0654B0] mt-5 font-semibold rounded'>Make Payment</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className='text-2xl'>Make Payment</AlertDialogTitle>
                                    {balance > quote ? <AlertDialogDescription>
                                        You have NGN{balance} in your wallet, proceed to payment
                                    </AlertDialogDescription> : <AlertDialogDescription>
                                        You have NGN{balance} in your wallet, top-up to complete checkout
                                    </AlertDialogDescription>}
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    {balance > quote ? <AlertDialogAction onClick={pay} className='mx-auto'>Continue</AlertDialogAction> : <Link className='mx-auto' href="/payment/send-funds"><AlertDialogAction>Continue</AlertDialogAction></Link>}
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </aside>
            </div>
        </section>
    )
}

export default CalculatePrice
