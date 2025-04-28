"use client";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ButtonSpinner from '@/components/ButtonSpinner';
import { DOMAIN } from '@/utils/constant';
import axios from 'axios';

const AddArticleForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const fromSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title === "") return toast.error('title is required')
        if (description === "") return toast.error('description is required')
        try {
            setLoading(true);
            await axios.post(`${DOMAIN}/api/articles`, { title, description });
            router.replace("/");
            router.refresh();
            setLoading(false);
            toast.success("New article Added");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.response?.data.message,)
            setLoading(false);
        }
    }


    return (
        <form onSubmit={fromSubmitHandler} className='flex flex-col'>
            <input
                className='mb-4 border rounded p-2 text-xl'
                type="text"
                placeholder='Enter Your title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className='mb-4 p-2 lg:text-xl rounded resize-none'
                rows={5}
                placeholder='Enter Article Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button type='submit' className='text-2xl text-white bg-blue-700 hover:text-blue-900 p-2 rounded-lg font-bold'>
                {loading ? <ButtonSpinner /> : "Add Article"}
            </button>
        </form>
    )
}

export default AddArticleForm

