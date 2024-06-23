"use client"
import Image from "next/image"
import { BASE_URL } from '@/lib/endpoints'
import { useQuery, useMutation, } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ChevronDown, Loader2, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import teamImage from "../../../../public/man-uploading-data 1.png"
import Link from "next/link"

interface Voter {
  [key: string]: any;
  data?: {
    [key: string]: any;
  };
}

interface FetchDataPayload {
  page: number;
  perPage: number;
}

const Page: React.FC = () => {
  const { toast } = useToast()
  const [voters, setVoters] = useState<Voter[]>([]);
  const [filteredVoters, setFilteredVoters] = useState<Voter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fieldsToExclude = ["Timestamp", "is_suspended", "_job_id", "createdAt", "updatedAt", "id", "ElectionId", "UserId", "password", "data"];

  const fetchData = (payload: FetchDataPayload) => {
    const electionId = localStorage.getItem("electionId");
    return axios.post(`${BASE_URL}/election/voter/filter`, {
      ElectionId: electionId,
      page: payload.page,
      per_page: payload.perPage,
    });
  };

  const mutation = useMutation({
    mutationFn: fetchData,
    mutationKey: ["next"],
    onSuccess: (response) => {
      const votersData: Voter[] = response?.data?.data?.voters || [];
      setVoters(votersData);
      console.log(votersData);

      const filteredData: Voter[] = votersData.map((voter) => {
        const filteredVoter: Voter = Object.keys(voter)
          .filter(key => !fieldsToExclude.includes(key))
          .reduce((obj: Voter, key) => {
            obj[key] = voter[key];
            return obj;
          }, {});

        if (voter.data) {
          Object.entries(voter.data)
            .filter(([key]) => key !== "Timestamp")
            .forEach(([key, value]) => {
              filteredVoter[key] = value;
            });
        }

        return filteredVoter;
      });

      setFilteredVoters(filteredData);
      setIsLoading(false);
    },
    onError: (e) => {
      console.log(e);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    setIsLoading(true);
    mutation.mutate({ page: 1, perPage: 50 });
  }, []);

  const deleteData = (voterId: string) => {
    try {
      axios.delete(`${BASE_URL}/election/voter/${voterId}`)
        .then(() => {
          setVoters((prevVoters) => prevVoters.filter((voter) => voter.id !== voterId));
          setFilteredVoters((prevFiltered) => prevFiltered.filter((voter) => voter.id !== voterId));
          window.location.reload();
          toast({
            title: "Voter deleted"
          });
        });

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error
      });
    }
  }

  const renderHeaders = () => {
    if (filteredVoters.length === 0) return null;
    return (
      <>
        <TableHead></TableHead>
        <TableHead>S/N</TableHead>
        {Object.keys(filteredVoters[0]).map((key) => (
          <TableHead key={key}>{key}</TableHead>
        ))}
        <TableHead>Action</TableHead>
      </>
    );
  };

  const renderRows = () => {
    return filteredVoters.map((voter, index) => (
      <TableRow key={index}>
        <TableCell>
          <input className='w-5 h-5 -mr-7' type="checkbox" />
        </TableCell>
        <TableCell>{index + 1}</TableCell>
        {Object.entries(voter).map(([key, value]) => (
          <TableCell key={key}>
            {value !== undefined && value !== null ? (typeof value === 'object' ? JSON.stringify(value) : String(value)) : ''}
          </TableCell>
        ))}
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='flex items-center gap-3 p-2 px-3 border-[#CBD2E0] border rounded'>
                Menu<ChevronDown size={15} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[10rem] mr-3 bg-white">
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Button onClick={() => deleteData(voters[index].id)} className='flex items-center gap-3 p-2 px-3 w-full bg-[#B00505] text-white border rounded'>
                    Delete
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button className='flex items-center gap-3 w-full p-2 px-3 border-[#CBD2E0] border rounded'>Disable</Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

        </TableCell>
      </TableRow>
    ));
  };

  return (
    <section className='h-screen px-2'>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" size={48} />
      </div>
      ) : (
        voters.length !== 0 ? (
          <div className='dashboard-dimensions !w-[95%] md:px-8 no-scrollbar !h-[95%]'>
            <div className='flex justify-between w-full md:mt-9'>
              <Input className='md:w-[400px] w-[50%] rounded' placeholder="Search voters" />
              <Button className='bg-[#0654B0] text-white flex p-3 gap-2 rounded'><Plus size={16} />Add New Voters</Button>
            </div>
            <div className='flex justify-between mt-5'>
              <label className='flex items-center gap-3'>
                <input type="checkbox" className='w-5 h-5' />
                <p>Select all {voters?.length} Accredited Voters</p>
              </label>
              <Button className='flex items-center gap-3 p-2 px-3 border-[#CBD2E0] border rounded'>Menu<ChevronDown size={15} /></Button>
            </div>
            <Table className=''>
              <TableHeader className='border-[2px] rounded border-black'>
                <TableRow>
                  {renderHeaders()}
                </TableRow>
              </TableHeader>
              <TableBody className='text-start'>
                {renderRows()}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className='dashboard-dimensions'>
            <div className='md:pt-4 pt-[6rem] px-6 text-center'>
              <Image className='object-cover mx-auto' src={teamImage} alt='team image' />
              <h1 className='text-2xl'>Ready to start election<br />Upload voters!</h1>
              <Button variant="ghost" className='mt-5 flex items-center justify-center gap-3 text-[#F6F6F6] bg-[#0654B0] widthMd h-[58px] mx-auto px-6'><span className='-mt-1 text-2xl text'>&#43;</span>Add New Voters</Button>
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default Page;
