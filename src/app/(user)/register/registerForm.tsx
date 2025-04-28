/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState } from 'react';
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation';
import ButtonSpinner from '@/components/ButtonSpinner';
import { DOMAIN } from '@/utils/constant';
import axios from 'axios';

const registerForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const fromSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (firstName === "") return toast.error('user Name is required')
        if (email === "") return toast.error('Email is required')
        if (password === "") return toast.error('password is required')

        try {
            setLoading(true);

            await axios.post(`${DOMAIN}/api/user/register`, { email, password, firstName });
            router.replace("/");
            router.refresh();
            setLoading(false);// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                placeholder='Enter Your userName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                className='mb-4 border rounded p-2 text-xl'
                type="email"
                placeholder='Enter Your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className='mb-4 border rounded p-2 text-xl'
                type="password"
                placeholder='Enter Your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit' className='text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold'>
                {loading ? <ButtonSpinner /> : "Create"}
            </button>
        </form>
    )
}

export default registerForm

