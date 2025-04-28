"use client";
import { DOMAIN } from '@/utils/constant';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify'

interface AddCommentFormProps {
    articleId: number
}


const AddCommentForm = ({ articleId }: AddCommentFormProps) => {
    const router = useRouter();
    const [text, setText] = useState("");

    const fromSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (text === "") return toast.error('please write something ')
        try {
            await axios.post(`${DOMAIN}/api/comments`, { text, articleId });
            router.refresh();
            setText("");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.response?.data.message,)
        }
    }
    return (
        <form onSubmit={fromSubmitHandler}>
            <input
                className='rounded-lg text-xl p-2 w-full bg-white focus:shadow-md'
                type="text"
                placeholder='Add a comment...'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type='submit' className='bg-green-700 text-white mt-2 p-1 w-min text-xl rounded-lg hover:bg-gray-900 transition'>
                Comment
            </button>
        </form>
    )
}

export default AddCommentForm
