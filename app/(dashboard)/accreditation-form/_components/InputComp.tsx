import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input'
import { BASE_URL } from '@/lib/endpoints';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Trash } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

interface InputCompProps {
  refetch: any;
  accreditationFormQuestion: any
}

const InputComp: React.FC<InputCompProps> = ({ refetch, accreditationFormQuestion }) => {
  const [accreditationFormQuestionLabel, setAccreditationFormQuestionLabel] = useState<any>(accreditationFormQuestion.label ?? "")
  const [accreditationFormQuestionType, setAccreditationFormQuestionType] = useState<any>(accreditationFormQuestion.type ?? "short-answer");
  const [accreditationFormQuestionOptions, setAccreditationFormQuestionOptions] = useState<any>( accreditationFormQuestion.options ?? [""]);
  const [accreditationFormReqired, setAccreditationFormRequired] = useState<any>(accreditationFormQuestion.is_required ?? false)
  const [required, setRequired] = useState<any>(null)
  
  

  const fetchData = async () => {
    const electionId= localStorage.getItem("electionId")
    const response = await axios.get(`${BASE_URL}/election/accreditation/${electionId}`)

    // setAccreditationForm(response.data.data.accreditation_form_and_questions)
    // setAccreditationFormQuestions(response.data.data.accreditation_form_and_questions.AccreditationFormQuestions)
 }
 const query = useQuery({
  queryFn: fetchData,
  queryKey: ['something'],
  
 })

 console.log(accreditationFormQuestion)

 const electionId= localStorage.getItem("electionId");

 const timeoutId = useRef<any>();

 function save_question_label( label: string ){
  
  axios.post(`${BASE_URL}/election/accreditation/form/question`, {
    id: accreditationFormQuestion.id,
    "type": accreditationFormQuestionType,
    "AccreditationFormId": accreditationFormQuestion.AccreditationFormId,
    ...( accreditationFormQuestionType === "multiple-choice" ? { options: accreditationFormQuestionOptions } : {} ),
    label,
    "ElectionId": electionId
  }).then(()=> refetch())

 }

 const sendLabel= async(e:any)=>{

  const value = e.target.value;

  setAccreditationFormQuestionLabel(value);
  
  if( !timeoutId.current ) return timeoutId.current = setTimeout(()=> save_question_label(value), 1000);

  else {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(()=> save_question_label(value), 1000);
  }

 
  
 }
 
 
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
    // setOptions([...options, `Option ${options.length + 1}`]);
    // alert("options")
    setAccreditationFormQuestionOptions( (options: any) => [...options, ""]);

    axios.post(`${BASE_URL}/election/accreditation/form/question`, {
      id: accreditationFormQuestion.id,
      "AccreditationFormId": accreditationFormQuestion.AccreditationFormId,
      options: [...accreditationFormQuestionOptions, ""],
      "ElectionId": electionId
    }).then(()=> refetch())

  };

  const handleDeleteOption = (index: number) => {

    if(accreditationFormQuestionOptions.length === 1 ) return

    setAccreditationFormQuestionOptions( (options: string[]) => options.filter((_, i)=> i !== index));

    axios.post(`${BASE_URL}/election/accreditation/form/question`, {
      id: accreditationFormQuestion.id,
      "AccreditationFormId": accreditationFormQuestion.AccreditationFormId,
      options: accreditationFormQuestionOptions.filter((_: string, i: number) => index !== i ),
      "ElectionId": electionId
    }).then(()=> refetch())


  };

  const handleOptionChange = (index: number, value: string) => {

    const options = accreditationFormQuestionOptions;

    options[index] = value;

    setAccreditationFormQuestionOptions(options);

    // const newOptions = [...options];
    // setOptions(newOptions);
    setAccreditationFormQuestionOptions( (options: any) => {
      options[index] = value;
      if( !timeoutId.current ) timeoutId.current = setTimeout(()=> save_options(options), 1000);
      else {
        clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(()=> save_options(options), 1000)
      }
      return options
    })
  };

  async function save_options(options: any){

    axios.post(`${BASE_URL}/election/accreditation/form/question`, {
      id: accreditationFormQuestion.id,
      "AccreditationFormId": accreditationFormQuestion.AccreditationFormId,
      options,
      "ElectionId": electionId
    }).then(()=> refetch())

  }

  async function changeFormQuestionType( type: string ){

    setAccreditationFormQuestionType(type)

    axios.post(`${BASE_URL}/election/accreditation/form/question`, {
      id: accreditationFormQuestion.id,
      "AccreditationFormId": accreditationFormQuestion.AccreditationFormId,
      type,
      ...( type === "multiple-choice" ? { options: accreditationFormQuestionOptions } : {} ),
      "ElectionId": electionId
    }).then(()=> refetch())
  }
 const sendRequired=()=>{
  axios.post(`${BASE_URL}/election/accreditation/form/question`, {
    id: accreditationFormQuestion.id,
    "AccreditationFormId": accreditationFormQuestion.AccreditationFormId,
    is_required: !accreditationFormReqired,
    "ElectionId": electionId
  }).then(()=> refetch())
  setAccreditationFormRequired(!accreditationFormReqired)
  localStorage.setItem("is_required",accreditationFormReqired);
 
  // console.log(accreditationFormReqired
 }
 const deleteFormQuestion=()=>{
  axios.delete(`${BASE_URL}/election/accreditation/form/question/${accreditationFormQuestion.id}`).then(()=> refetch())
  
 }
  return (
    <aside className='md:h-[13rem] flex flex-col border-2 space-y-5 rounded px-6 py-3 overflow-y-auto'>
      <p className='place-self-start text-[#1F2223]'>Label</p>
      <div className='flex justify-between items-center'>
        <Input
          placeholder='Input your label e.g “Name”'
          className='bg-[#EAEAEA] border-none w-[50%] rounded placeholder:text-[#57595A]'
          value={accreditationFormQuestionLabel}
          onChange={sendLabel}
        />
        <div className='md:w-[30%] w-[45%] border-2 h-10 rounded'>
          <select
            name=""
            className='text-[#57595A] bg-inherit md:w-[30%] w-[45%] border-none h-10 rounded-lg outline-none'
            id=""
            value={accreditationFormQuestionType}
            onChange={(e)=>changeFormQuestionType(e.target.value)}
          >
            <option value="short-answer" >Short Answer</option>
            <option value="multiple-choice" >Multiple choice</option>
          </select>
        </div>
      </div>
      {accreditationFormQuestionType === 'multiple-choice' && (
        <div className='space-y-3'>
          {accreditationFormQuestionOptions.map((option: string, index: number) =>
           (
            <QuestionOption option={option} index={index} setterFn={ handleOptionChange } deleteFn={handleDeleteOption} />
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
          <input value={required} checked={accreditationFormReqired} onChange={sendRequired} type='checkbox' className='w-5 h-5' />
          <p>Required</p>
        </span>
        <Dialog>
          <DialogTrigger>
              <button
              className='flex gap-1 border-[2px] p-1 border-[#A92323] text-[#A92323] items-center'
              >
              <Trash size={18} />
              <p className='text-[0.8rem] font-bold'>Delete</p>
            </button></DialogTrigger>
           <DialogContent className='text-center'>
            This action is irreversible, are you sure you want to delete this question?
            <Button
              onClick={deleteFormQuestion}
              className='flex gap-1 border-[2px] p-1 border-[#A92323] text-[#A92323] items-center'
              >
              Delete
            </Button>
          </DialogContent>
          </Dialog>
      </div>
    </aside>
  )
}

export default InputComp;

function QuestionOption({
  option,
  index,
  setterFn,
  deleteFn
}: { option: string, setterFn: Function, deleteFn: Function, index: number }){

  const [optionState, setOptionState] = useState(option);

  return(
    <div key={index} className='flex items-center space-x-3'>
              <Input
                placeholder={`Option ${index + 1}`}
                className='bg-[#EAEAEA] border-none w-[50%] rounded placeholder:text-[#57595A]'
                value={optionState}
                onChange={(e) => {
                  setOptionState(e.target.value)
                  setterFn(index, e.target.value);
                }}
              />
              
              <button
                type='button'
                onClick={() => deleteFn(index)}
                className='text-[#A92323]'
              >
                <Trash size={18} />
              </button>
            </div>
  )

}
