
import { DOMAIN } from '@/utils/constant';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { toast } from 'react-toastify';

interface UpdateCommentModelProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  text: string;
  commentId: number
}


const UpdateCommentModel = ({ setOpen, text, commentId }: UpdateCommentModelProps) => {

  const [updateText, setUpdateText] = useState(text);
  const router = useRouter();



  const fromSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (updateText === "") return toast.info('Email is required')

    try {
      await axios.put(`${DOMAIN}/api/comments/${commentId}`, { text: updateText });
      router.refresh();
      setUpdateText("");
      setOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data.message,)
    }
  }



  return (
    <div className='fixed left-0 right-0 top-0 bottom-0 z-10 bg-black bg-opacity-40 flex items-center justify-center'>
      <div className='w-11/12 lg:w-2/4 bg-white rounded-lg p-3'>
        <div className='flex justify-end items-start mb-5'>
          <IoMdCloseCircleOutline onClick={() => setOpen(false)} className='text-red-500 cursor-pointer text-3xl' />
        </div>
        <form onSubmit={fromSubmitHandler}>
          <input
            type="text"
            placeholder='Edit Comment... '
            className='text-xl rounded-lg p-2 w-full bg-white mb-2'
            value={updateText}
            onChange={(e) => setUpdateText(e.target.value)}
          />
          <button type='submit' className='bg-green-700 w-full text-white mt-2 p-1 text-xl rounded-lg hover:bg-green-900 transition'>
            Edit
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateCommentModel