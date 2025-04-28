"use client"
import { DOMAIN } from '@/utils/constant';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { BiLogOut } from 'react-icons/bi';
import { toast } from 'react-toastify';
const LogoutButton = () => {
    const router = useRouter();
    const logoutHandler = async () => {
        try {
            await axios.get(`${DOMAIN}/api/user/logout`);
            router.push("/");
            router.refresh();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.warning(error)
        }
    }
    return (
        <button onClick={logoutHandler} className='bg-gray-700 text-gray-200 px-5 py-3 rounded'>
            <strong>Logout <BiLogOut className='inline' /></strong>
        </button>
    )
}

export default LogoutButton