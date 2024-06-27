"use client"
import Image from "next/image"
import { BASE_URL } from '@/lib/endpoints'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useRouter } from "next/navigation"
import { ChevronDown, FileTerminal, Filter, FilterIcon, FilterX, Loader2, Plus, Scale } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import teamImage from "../../../../public/man-uploading-data 1.png"

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
  const [votersCount, setVotersCount] = useState<number>(0);
  const [newVoter, setNewVoter] = useState<{ [key: string]: any }>({});
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const router = useRouter()
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
      const voterC = response?.data?.data?.count;
      setVotersCount(voterC);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVoter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddVoter = () => {
    const electionId = localStorage.getItem("electionId");
    const { email, ...data } = newVoter;
    const payload = {
      ElectionId: electionId,
      email,
      data,
    };

    axios.post(`${BASE_URL}/election/voter`, payload)
      .then(() => {
        toast({
          title: "Voter added successfully",
        });
        setIsDialogOpen(false);
        mutation.mutate({ page: 1, perPage: 50 });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error adding voter",
          description: error.message,
        });
      });
  };

  const deleteData = (voterId: string) => {
    try {
      const electionId = localStorage.getItem("electionId")
      axios.delete(`${BASE_URL}/election/voter/${voterId}/${electionId}`)
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
  const disableVoter = async (voter: Voter) => {
    const electionId = localStorage.getItem("electionId");
    try {
      await axios.patch(`${BASE_URL}/election/voter`, {
        ElectionId: electionId,
        voter_id: voter.id,
        is_suspended: true
      });
      setVoters((prevVoters) => 
        prevVoters.map((v) => (v.id === voter.id ? { ...v, is_suspended: true } : v))
      );
      setFilteredVoters((prevFiltered) =>
        prevFiltered.map((v) => (v.id === voter.id ? { ...v, is_suspended: true } : v))
      );
      toast({
        title: "Voter disabled"
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message
      });
    }
  }
  const enableVoter = async (voter: Voter) => {
    const electionId = localStorage.getItem("electionId");
    try {
      await axios.patch(`${BASE_URL}/election/voter`, {
        ElectionId: electionId,
        voter_id: voter.id,
        is_suspended: false
      });
      setVoters((prevVoters) => 
        prevVoters.map((v) => (v.id === voter.id ? { ...v, is_suspended: false } : v))
      );
      setFilteredVoters((prevFiltered) =>
        prevFiltered.map((v) => (v.id === voter.id ? { ...v, is_suspended: false } : v))
      );
      toast({
        title: "Voter Enabled"
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message
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
                {voters[index]?.is_suspended?(<Button onClick={() => enableVoter(voters[index])} className='flex items-center gap-3 w-full p-2 px-3 border-[#CBD2E0] border rounded'>
                    Enable
                    </Button>):(
                    <Button onClick={() => disableVoter(voters[index])} className='flex items-center gap-3 w-full p-2 px-3 border-[#CBD2E0] border rounded'>
                    Disable
                    </Button>
                    )}
                  
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
          <div className='dashboard-dimensions  !w-full md:!w-[90%]  px-4 md:px-8 no-scrollbar !h-[95%]'>
            <div className='flex justify-between w-full md:mt-9'>
              <Input className='md:w-[400px] w-[50%] rounded' placeholder="Search voters" />
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className='bg-[#0654B0] text-white flex p-3 gap-2 rounded'><Plus size={16} />Add New Voters</Button>
                </DialogTrigger>
                <DialogContent className="h-[80%] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Voter</DialogTitle>
                  </DialogHeader>
                  <div className='flex flex-col gap-4'>
                    <Input
                      placeholder="Email"
                      name="email"
                      onChange={handleInputChange}
                    />
                    {filteredVoters.length > 0 && Object.keys(filteredVoters[0]).map((key) => (
                      key !== 'S/N' && key !== 'email' && (
                        <Input
                          key={key}
                          placeholder={key}
                          name={key}
                          onChange={handleInputChange}
                        />
                      )
                    ))}
                  </div>
                  <DialogFooter>
                    <Button className="bg-[#0654B0] text-white rounded" onClick={handleAddVoter}>Add Voter</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className='flex justify-between mt-5'>
              <label className='flex items-center gap-3'>
                <input type="checkbox" className='w-5 h-5' />
                <p>Select all {votersCount} Accredited Voters</p>
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
            </div>
              <Button onClick={()=>router.push("/voters-acquisition")} className="flex gap-1 place-self-center bg-[#0654B0] text-white rounded"><Plus size={15}/>Add voters</Button>
          </div>
        )
      )}
    </section>
  );
};

export default Page;
