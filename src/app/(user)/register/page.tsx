import React from 'react'
import RegisterForm from './registerForm'
import type { Metadata } from "next";
const registerPage = () => {
    return (
        <section className='fix-height container m-auto px-7 flex items-center justify-center'>
            <div className='m-auto bg-white rounded-lg p-5 w-full md:w-2/3'>
                <h1 className='text-3xl font-bold text-gray-800 mb-5'>
                    Create New Account
                </h1>
                <RegisterForm />
            </div>
        </section>
    )
}

export default registerPage

export const metadata: Metadata = {
    title: "Register Page",
    description: "Create new user",
};