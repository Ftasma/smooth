import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
const page = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className=' flex flex-col w-full'>
        <button className=' place-self-end opacity-100 pr-3 text-gray-500'>hbhbh</button>
        <div className=' bg-white h-[65vh] w-[80%] bg-opacity-100 space-y-3 mx-auto overflow-y-auto  py-4 rounded'>
            <h1 className=' text-center text-2xl'>Add Candidate</h1>
            <p className=' text-center'>Fill in the details below⚡</p>
            <aside className=' mt-12 space-y-3'>
                <label className=' md:mx-[12%] mx-[8%] font-[Satoshi] flex flex-col gap-3 items-start '>
                    Election post 
                    
                    {/* <select className=' outline-none w-[100%] h-[48px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] px-2' name="" id="">
                    {query?.data?.data?.data?.election_posts.map(
                        (post:any)=>{
                            return <option key={post.id} value={post.id}>{post.title}</option>
                            
                            
                        }
                    
                    )}
                    </select> */}
                    
                </label>
                <label className=' font-[Satoshi] flex flex-col gap-3 items-start mx-[8%] md:mx-[12%]'>
                    Name of candidate
                    <input  placeholder='John doe' className='w-[100%] h-[48px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' type="text"/>
                </label>
                <label className=' font-[Satoshi] flex flex-col gap-3 items-start mx-[8%] md:mx-[12%]'>
                    Image
                    {/* <input  placeholder='Johnismydoe@gmail.com' className='w-[100%] h-[48px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' type="file"/>
                     */}
                        <div className="App">
                        <form >
                            <input  type="file" />
                            
                        </form>
                        </div>
                </label>
                <label className=' font-[Satoshi] flex flex-col gap-3 items-start mx-[8%] md:mx-[12%]'>
                    Bio
                    <textarea  name="" className='w-[100%] h-[150px] border-[#E5E5E5] rounded-md bg-[#EAEAEA] focus:outline-none px-2 placeholder:text-[#57595A]' id=""></textarea>
                    <Button variant="ghost" type='button'  className='bg-[#0654B0] text-white w-[100%]'>Continue</Button>
                    
                </label>
            </aside>
        </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
  
}

export default page