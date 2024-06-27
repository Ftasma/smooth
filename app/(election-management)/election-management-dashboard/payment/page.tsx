"use client"
import { BASE_URL } from '@/lib/endpoints'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

const Payment: React.FC = () => {
  const [electionId, setElectionId] = useState<string | null>(null);

  useEffect(() => {
    setElectionId(localStorage.getItem("electionId"));
  }, []);

  const fetchData = async () => {
    const response = await axios.get(`${BASE_URL}/billing/${electionId}`);
    return response.data.data.billing;
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryFn: fetchData,
    queryKey: ['billingData', electionId],
    enabled: !!electionId, 
  });

  useEffect(() => {
    if (electionId) {
      refetch();
    }
  }, [electionId, refetch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{`Error: ${error.message}`}</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col items-center  py-8 px-4'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6'>Billing Information</h1>
      <div className='md:bg-white  shadow-lg rounded-lg p-6 w-full max-w-md'>
        {data ? (
          <>
            <div className='mb-4'>
              <p className='text-gray-600'><strong>Amount:</strong> {data.amount}</p>
            </div>
            <div className='mb-4'>
              <p className='text-gray-600'><strong>Created At:</strong> {new Date(data.createdAt).toLocaleString()}</p>
            </div>
            <div className='mb-4'>
              <p className='text-gray-600'><strong>Expires At:</strong> {new Date(data.expires_at).toLocaleString()}</p>
            </div>
            <div className='mb-4'>
              <p className='text-gray-600'><strong>No. of Months:</strong> {data.no_of_months}</p>
            </div>
            <div className='mb-4'>
              <p className='text-gray-600'><strong>No. of Voters:</strong> {data.no_of_voters}</p>
            </div>
            <div className='mb-4'>
              <p className='text-gray-600'><strong>Status:</strong> {data.status}</p>
            </div>
            <div className='mb-4'>
              <p className='text-gray-600'><strong>Type:</strong> {data.type}</p>
            </div>
          </>
        ) : (
          <p className='text-gray-600'>No billing information available.</p>
        )}
      </div>
    </div>
  );
}

export default Payment;
