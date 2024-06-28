"use client"
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ElectionName = () => {
    const [electionName, setElectionName] = useState("");
    const pathname = usePathname();

    useEffect(() => {
        const electionId = localStorage.getItem('electionId');
        const name = localStorage.getItem('electionName');
        console.log(electionId, electionName);
        setElectionName(name as any);
    }, []);

    return (
        <div className='p-3'>
            <div className='flex'>
                <div className='place-self-start flex justify-between items-center gap-6 pl-4 pt-4'>
                    <Link href='/dashboard'>
                        <button className='bg-gray-300 rounded-full p-1 text-gray-700 font-thin mt-[7%] ml-[7%]'>
                            <ChevronLeft />
                        </button>
                    </Link>
                    <h1 className='text-3xl  font-satoshi '>{electionName}</h1>
                </div>
            </div>
            <div>
                <div className='flex justify-around items-center md:w-[50%] mt-7 gap-5 pl-4 pt-4'>
                    <Link href="/election-management-dashboard" className={`${pathname === '/election-management-dashboard' ? 'underline text-[#0654B0]' : 'text-[#B1B2B2]'} text-sm `}>Election info</Link>
                    <Link href="/election-management-dashboard/candidates" className={`${pathname === '/election-management-dashboard/candidates' ? 'underline text-[#0654B0]' : 'text-[#B1B2B2]'} text-sm`}>Candidates</Link>
                    <Link href="/election-management-dashboard/voters" className={`${pathname === '/election-management-dashboard/voters' ? 'underline text-[#0654B0]' : 'text-[#B1B2B2]'}  text-sm `}>Voters</Link>
                    <Link href="/election-management-dashboard/payment" className={`${pathname === '/election-management-dashboard/payment' ? 'underline text-[#0654B0]' : 'text-[#B1B2B2]'}  text-sm `}>Payment</Link>
                </div>
                <p className='opacity-0'>t</p>
            </div>
        </div>
    );
};

export default ElectionName;
