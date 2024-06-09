"use client";

import { BASE_URL } from '@/lib/endpoints';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import DisplayDashboard from './_components/DisplayDashboard';
import FirstTimeDisplay from './_components/FirstTimeDisplay';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const fetchData = async () => {
    return await axios.get(`${BASE_URL}/election`);
  };

  const query = useQuery({
    queryFn: fetchData,
    queryKey: ['next'],
  });

  const isElection = query?.data?.data?.data?.elections[0]?.name;
  console.log(isElection);

  if (query.isLoading) {
    return (<div className="flex justify-center items-center h-screen">
    <Loader2 className="animate-spin" size={48} />
  </div>)
  }

  if (query.isError) {
    return <div>Error loading data</div>;
  }

  return (
    <section>
      {isElection ? (
        <DisplayDashboard />
      ) : (
        <FirstTimeDisplay />
      )}
    </section>
  );
};

export default Dashboard;
