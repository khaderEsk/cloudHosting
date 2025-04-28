"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
const SearchArticleText = () => {
    const route = useRouter();
    const [searchText, setSearch] = useState("");

    const fromSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ searchText })
        route.replace(`/artical/search?searchText=${searchText}`);
    }

    return (
        <form onSubmit={fromSubmitHandler} className='my-5 w-full md:w-2/3 m-auto relative' >
            <input
                className='w-full p-3 rounded text-xl border-none text-gray-900'
                type="search"
                placeholder='Search for articles'
                value={searchText}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className='absolute inset-y-0 right-10 flex items-center pl-3 pointer-events-none'>
                <FaSearch className='h-6 w-6 text-gray-500' />
            </div>
        </form>
    )
}

export default SearchArticleText

