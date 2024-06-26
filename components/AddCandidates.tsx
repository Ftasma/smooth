import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { BASE_URL } from '@/lib/endpoints';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from "uuid";
import { useRouter } from 'next/navigation';
import { fileUploadInstance } from './ClientSetup';
import { ChevronLeft, Upload } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const AddCandidates = ({ onClose, isVisible }: any) => {
  const { toast } = useToast();

  const sendData = (payload: any) => {
    return axios.post(`${BASE_URL}/election/candidate`, {
      ElectionPostId: payload.electionPostId,
      name: payload.name,
      image: payload.image,
      bio: payload.bio,
      ElectionId: payload.electionId
    });
  };

  const router = useRouter();
  const [electionPostId, setElectionPostId] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [electionId, setElectionId] = useState(0);
  const [file, setFile] = useState<any>();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [image, setImage] = useState(0);

  useEffect(() => {
    const storedElectionId = localStorage.getItem("electionId");
    const storedElectionPostId = localStorage.getItem("electionPostId");
    if (storedElectionId) setElectionId(Number(storedElectionId));
    if (storedElectionPostId) setElectionPostId(storedElectionPostId);
  }, []);

  function handleFileChange(e: any) {
    e.preventDefault();
    setFile(e.target.files[0]);
  }

  const fetchData = async () => {
    return await axios.get(`${BASE_URL}/election/posts?ElectionId=${electionId}`);
  };

  const { data, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: ['next', electionId],
    enabled: !!electionId, // Enable the query only if electionId is set
  });

  const mutation = useMutation({
    mutationFn: sendData,
    mutationKey: ["next"],
    onSuccess: (response) => {
      onClose();
      setTimeout(() => {
        toast({
          title: "Candidate added successfully",
        });
      }, 1000);
    },
    onError: (e: any) => {
      toast({
        variant: "destructive",
        title: "An error occurred",
      });
    }
  });

  const submit = async () => {
    const key = uuidv4();
    const response = await axios.get(`https://sbxapi.smoothballot.com/storage/url?key=${key}`);
    const signed_upload_url = response.data.data.url;
    await fileUploadInstance(signed_upload_url, file.type).put("", file);
    const file_url = `https://smooth-ballot.s3.eu-north-1.amazonaws.com/${key}`;
    const file_name_arr = file.name.split(".");
    const extension = file_name_arr[file_name_arr.length - 1];
    mutation.mutate({
      electionPostId,
      name,
      image: {
        "link": file_url,
        "id": key,
        "extension": extension,
      },
      bio,
      electionId
    } as any);
  };

  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") onClose();
  };

  if (!isVisible) return null;

  return (
    <div onClick={handleClose} id='wrapper' className='z-[9999] px-4 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center '>
      <div className='flex flex-col w-full'>
        <div className='bg-white h-[65vh] w-[100%] bg-opacity-100 space-y-3 mx-auto overflow-y-auto overflow-x-hidden py-4 rounded'>
          <button onClick={onClose} className='ml-[5%] opacity-100 p-1 rounded-full shadow-lg shadow-gray-500 text-gray-500'><ChevronLeft /></button>
          <h1 className='text-center text-2xl'>Add Candidate</h1>
          <p className='text-center'>Fill in the details below⚡</p>
          <aside className='mt-12 space-y-3'>
            {isLoading ? (
              <div className='text-center'>Loading...</div>
            ) : (
              <>
                <label className='md:mx-[12%] mx-[8%] font-[Satoshi] flex flex-col gap-3 items-start '>
                  Election post 
                  <select value={electionPostId} onChange={(e) => setElectionPostId(e.target.value)} className='outline-none w-[100%] h-[48px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] px-2' name="" id="">
                    <option value="">Select post</option>
                    {data?.data?.data?.election_posts?.map((post: any) => (
                      <option key={post.id} value={post.id}>{post.title}</option>
                    ))}
                  </select>
                </label>
                <label className='font-[Satoshi] flex flex-col gap-3 items-start mx-[8%] md:mx-[12%]'>
                  Name of candidate
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder='John Doe' className='w-[100%] h-[48px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' type="text" />
                </label>
                <label className='font-[Satoshi] flex flex-col gap-3 items-start mx-[8%] md:mx-[12%] '>
                  Image
                  <div className="bg-[#EAEAEA] h-[48px] w-full flex justify-center items-center">
                    <form className="flex justify-center items-center">
                      <Upload size={35} className="ml-[45%] text-[#0654B0]" />
                      <input className="opacity-0" onChange={handleFileChange} type="file" />
                    </form>
                  </div>
                </label>
                <label className='font-[Satoshi] flex flex-col gap-3 items-start mx-[8%] md:mx-[12%]'>
                  Bio
                  <textarea value={bio} onChange={(e) => setBio(e.target.value)} name="" className='w-[100%] h-[150px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' id=""></textarea>
                  <Button variant="ghost" type='button' onClick={submit} className='bg-[#0654B0] text-white w-[100%]'>Continue</Button>
                </label>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AddCandidates;
