"use client";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { DOMAIN } from '@/utils/constant';
import axios from 'axios';
import { Article } from '@prisma/client';

interface EditArticleProps {
    article: Article;
}


const EditArticleForm = ({ article }: EditArticleProps) => {
    const [title, setTitle] = useState(article.title);
    const [description, setDescription] = useState(article.description);

    const router = useRouter();

    const fromSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title === "") return toast.error('title is required')
        if (description === "") return toast.error('description is required')
        try {
            await axios.put(`${DOMAIN}/api/articles/${article.id}`, { title, description });
            router.refresh();
            toast.success("Article updated");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.response?.data.message,)
        }
    }


    return (
        <form onSubmit={fromSubmitHandler} className='flex flex-col'>
            <input
                className='mb-4 border rounded p-2 text-xl'
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className='mb-4 p-2 lg:text-xl rounded resize-none'
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button type='submit' className='text-2xl text-white bg-green-700 hover:text-green-900 p-2 rounded-lg font-bold'>
                Edit

            </button>
        </form>
    )
}

export default EditArticleForm

