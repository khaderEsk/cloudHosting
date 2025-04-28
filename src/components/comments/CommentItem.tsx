"use client"
import { CommentWithUser } from '@/utils/types'
import { FaEdit, FaTrash } from 'react-icons/fa'
import UpdateCommentModel from './UpdateCommentModel';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { DOMAIN } from '@/utils/constant';


interface SingleArticlePageProps {
    comment: CommentWithUser;
    userId: number | undefined;
}

const CommentItem = ({ comment, userId }: SingleArticlePageProps) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const commentHandlerDelete = async () => {

        try {
            if (confirm("you want delete Comment, Are you sure?")) {
                await axios.delete(`${DOMAIN}/api/comments/${comment.id}`);
                router.refresh();
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.response?.data.message,)
        }
    }

    return (
        <div className='mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300'>
            <div className='flex items-center justify-between mb-2'>
                <strong className='text-gray-800 uppercase'>
                    {comment.User.firstName}
                </strong>
                <span className='bg-yellow-700 px-1 rounded-lg text-white'>
                    {new Date(comment.createdAt).toLocaleDateString('en-US')}
                </span>
            </div>
            <p className='text-gray-800 mb-2'>
                {comment.text}
            </p>
            {userId && userId === comment.userId && (<div className='flex justify-end items-center'>
                <FaEdit className='text-green-600 text-xl cursor-pointer me-3' onClick={() => setOpen(true)} />
                <FaTrash onClick={commentHandlerDelete} className='text-red-600 cursor-pointer' />
            </div>)}
            {open && <UpdateCommentModel
                setOpen={setOpen}
                commentId={comment.id}
                text={comment.text}
            />}

        </div>
    )
}

export default CommentItem