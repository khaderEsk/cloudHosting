"use client"
import { DOMAIN } from '@/utils/constant';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

interface DeleteCommentButtonProps {
    commentId: number
}
const DeleteCommentButton = ({ commentId }: DeleteCommentButtonProps) => {
    const route = useRouter();


    const deleteCommentHandler = async () => {
        try {
            if (confirm("you sure comment delete")) {
                await axios.delete(`${DOMAIN}/api/articles/${commentId}`);
                route.refresh();
                toast.success("comment deleted");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.response?.data.message,)
        }
    }
    return (
        <div onClick={deleteCommentHandler} className='bg-red-600 text-white rounded-lg cursor-pointer inline-block text-center py-1 px-2 hover:bg-red-800 transition'>
            Delete <MdDelete className='inline-block' />
        </div>
    )
}


export default DeleteCommentButton