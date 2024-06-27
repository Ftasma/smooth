"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { BASE_URL } from '@/lib/endpoints'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ChevronLeft, CopyIcon, CreditCard, Loader2, Plus } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Wallet = () => {
    const [balance, setBalance] = useState<number>(0)

    const getWallet = async () => {
        const response = await axios.get(`${BASE_URL}/wallet`);
        return response.data.data.wallet;
    }

    const getWalletTransactions = async () => {
        const response = await axios.get(`${BASE_URL}/wallet/transactions`);
        return response.data.data.wallet_transactions;
    }

    const { data: wallet, isLoading: walletLoading } = useQuery({
        queryFn: getWallet,
        queryKey: ['wallet'],
    });

    const { data: walletTransactions, isLoading: transactionsLoading } = useQuery({
        queryFn: getWalletTransactions,
        queryKey: ['walletTransactions'],
    });
    
    useEffect(() => {
        if (wallet) {
            setBalance(wallet._balance);
        }
    }, [wallet]);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
        };
        return new Date(dateString).toLocaleString(undefined, options);
    }

    if (walletLoading || transactionsLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="animate-spin" size={48} />
            </div>
        );
    }

    return (
        <section className='w-full flex flex-col pt-10 pl-8 px-3'>
            <aside className='flex gap-8 md:mb-10 mb-6'>
                <Link href='/dashboard'>
                    <button className='bg-gray-300 rounded-full p-1 text-gray-700 font-thin mt-[7%] ml-[7%]'>
                        <ChevronLeft />
                    </button>
                </Link>
                <h1 className='font-bold text-2xl'>My Wallet</h1>
            </aside>
            <div className='dashboard-dimensions !w-[95%] md:shadow-md md:px-10 !h-[80vh]'>
                <div className='flex flex-col place-self-start mt-7 gap-3 items-start'>
                    <p className='text-[#363939] text-[1.2rem]'>Your Wallet Balance</p>
                    <p className='font-semibold text-[1.7rem]'>NGN <span>{balance}</span></p>
                    <Dialog>
                        <DialogTrigger>
                            <Button className='bg-[#0654B0] text-white w-[13rem] flex gap-2 text-sm' variant="ghost">
                                <Plus size={20} />Add cash
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='!rounded'>
                            <h1 className='text-center text-2xl font-semibold'>
                                Add Cash
                            </h1>
                            <p>Make transfer to the account below to top-up your wallet⚡</p>
                            <div className='mt-2 flex items-center justify-center'>
                                <p className='text-3xl font-semibold text-center'>{wallet?.account_number}</p>
                                <CopyIcon size={24} className='ml-2 cursor-pointer' />
                            </div>
                            <div className='mt-8 text-center'>
                                <p className='text-lg font-medium'>Account Name: <span className='font-semibold'>{wallet?.account_name}</span></p>
                                <p className='text-lg font-medium'>Account Bank: <span className='font-semibold'>{wallet?.bank_name}</span></p>
                            </div>
                            <div className='mx-auto'>
                                <Button className='bg-[#0654B0] rounded text-white w-[15rem]'>I&apos;ve sent funds</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                <aside>
                    <div className='flex justify-between mt-7'>
                        <p className='text-[#363939] font-semibold'>Wallet Transaction</p>
                        <p className='text-[#0654B0]'>View all</p>
                    </div>
                    {walletTransactions.map((transaction:any)=>(
                        <div key={transaction.id}>
                        <div className='flex justify-between mt-6' >
                            <div className='flex gap-5 items-center max-w-[55%]'>
                                <CreditCard size={28}/>
                                <div className='flex flex-col items-start'>
                                    <p className='text-[1rem] md:text-[1.2rem] font-semibold'>{transaction?.description}</p>
                                    <p className='text-sm'>{formatDate(transaction?.createdAt)}</p>
                                </div>
                            </div>
                            <div className='max-w-[40%]'>
                                <p className='text-sm md:text-[1.2rem] font-semibold'>NGN <span>{transaction?.amount}</span></p>
                            </div>
                        </div>
                            <hr className='border-[1px] mt-2' />
                        </div>
                    ))}
                </aside>
            </div>
        </section>
    )
}

export default Wallet
