import { Input } from '@/components/ui/input'
import { BASE_URL } from '@/lib/endpoints';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Trash } from 'lucide-react'
import React, { useState } from 'react'

interface InputCompProps {
  id: number;
  onDelete: (id: number) => void;
}

const InputComp: React.FC<InputCompProps> = ({ id, onDelete }) => {
  const [accreditationForm, setAccreditationForm] = useState<any>(null)
  const [accreditationFormQuestions, setAccreditationFormQuestions] = useState<any>([])
  const fetchData = async () => {
    const electionId= localStorage.getItem("electionId")
    const response = await axios.get(`${BASE_URL}/election/accreditation/${electionId}`)

    setAccreditationForm(response.data.data.accreditation_form_and_questions)
    setAccreditationFormQuestions(response.data.data.accreditation_form_and_questions.AccreditationFormQuestions)
 }
 const query = useQuery({
  queryFn: fetchData,
  queryKey: ['something'],
  
 })
 
 
  const [optionType, setOptionType] = useState('');
  const [options, setOptions] = useState<string[]>(['Option 1']);

  const handleOptionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOptionType(event.target.value);
    if (event.target.value !== 'Multiple choice') {
      setOptions([]);
    } else {
      setOptions(['Option 1']);
    }
  };

  const addOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const handleDeleteOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <aside className='md:h-[13rem] flex flex-col border-2 space-y-5 rounded px-6 py-3 overflow-y-auto'>
      <p className='place-self-start text-[#1F2223]'>Label</p>
      <div className='flex justify-between items-center'>
        <Input
          placeholder='Input your label e.g “Name”'
          className='bg-[#EAEAEA] border-none w-[50%] rounded placeholder:text-[#57595A]'
        />
        <div className='md:w-[30%] w-[45%] border-2 h-10 rounded'>
          <select
            name=""
            className='text-[#57595A] bg-inherit md:w-[30%] w-[45%] border-none h-10 rounded-lg outline-none'
            id=""
            value={optionType}
            onChange={handleOptionTypeChange}
          >
            <option value="" >Short Answer</option>
            <option value="Multiple choice" >Multiple choice</option>
          </select>
        </div>
      </div>
      {optionType === 'Multiple choice' && (
        <div className='space-y-3'>
          {options.map((option, index) => (
            <div key={index} className='flex items-center space-x-3'>
              <Input
                placeholder={`Option ${index + 1}`}
                className='bg-[#EAEAEA] border-none w-[50%] rounded placeholder:text-[#57595A]'
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              <button
                type='button'
                onClick={() => handleDeleteOption(index)}
                className='text-[#A92323]'
              >
                <Trash size={18} />
              </button>
            </div>
          ))}
          <button
            type='button'
            onClick={addOption}
            className='text-white bg-[#0654B0] rounded p-2'
          >
            Add another option
          </button>
        </div>
      )}
      <div className='flex justify-between'>
        <span className='flex gap-3 items-center'>
          <input type='checkbox' className='w-5 h-5' />
          <p>Required</p>
        </span>
        <button
          onClick={() => onDelete(id)}
          className='flex gap-1 border-[2px] p-1 border-[#A92323] text-[#A92323] items-center'
        >
          <Trash size={18} />
          <p className='text-[0.8rem] font-bold'>Delete</p>
        </button>
      </div>
    </aside>
  )
}

export default InputComp
