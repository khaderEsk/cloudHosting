"use client"
import { DOMAIN } from '@/utils/constant';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

interface DeleteArticleButtonProps {
    articleId: number
}


const DeleteArticleButton = ({ articleId }: DeleteArticleButtonProps) => {
    const route = useRouter();
    const deleteArticleHandler = async () => {
        try {
            if (confirm("you sure article delete")) {
                await axios.delete(`${DOMAIN}/api/articles/${articleId}`);
                route.refresh();
                toast.success("article deleted");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.response?.data.message,)
        }

    }
    return (
        <div onClick={deleteArticleHandler} className='bg-red-600 text-white rounded-lg cursor-pointer inline-block text-center py-1 px-2 hover:bg-red-800 transition'>
            Delete <MdDelete className='inline-block' />
        </div>
    )
}

export default DeleteArticleButton