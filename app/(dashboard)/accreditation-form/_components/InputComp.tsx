import { Input } from '@/components/ui/input'
import { Trash } from 'lucide-react'
import React from 'react'
interface InputCompProps {
  id: number;
  onDelete: (id: number) => void;
}
const InputComp: React.FC<InputCompProps> = ({ id, onDelete }) => {
  return (
    <aside className=' h-[30%] flex flex-col  border-2 space-y-5 rounded px-6 py-3  '>
              <p className=' place-self-start text-[#1F2223]'>Label</p>
              <div className=' flex justify-between items-center'>
                <Input placeholder='Input your label e.g “Name”' className=' bg-[#EAEAEA] border-none w-[50%] rounded placeholder:text-[#57595A]'/>
                <div className='md:w-[30%] w-[45%] border-2'>
                <select name="" className='text-[#57595A] md:w-[30%] w-[45%] border-none' id="">
                  <option value="">Short Answer</option>
                </select>
                </div>
              </div>
                <div className=' flex justify-between'>
                  <span className='flex gap-3 items-center'><input type='checkbox' className='w-5 h-5'/><p>Required</p></span>
                  <button onClick={() => onDelete(id)} className='flex gap-1 border-[2px] p-1 border-[#A92323] text-[#A92323] items-center'><Trash className='' size={18}/><p className='text-[0.8rem] font-bold'>Delete</p></button>
                </div>
            </aside>
  )
}

export default InputComp