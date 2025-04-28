"use client";

import Link from "next/link";

const NotFoundPage = () => {
    return (
        <section className="fix-height flex justify-center items-center flex-col">
            <h1 className="text-7xl text-gray-800 font-bold">
                404
            </h1>
            <p className="text-gray-500 text-3xl mt-2 mb-5">page Not Found</p>
            <Link className="text-xl underline text-blue-700 block mt-6" href='/'>
                Go To home
            </Link>
        </section>
    )
}

export default NotFoundPage;

// "use client";

// import Link from 'next/link'
// const NotFoundPage = () => {
//     return (
//         <section className="flex justify-center items-start flex-col">
//             <h1 className="text-7xl text-gray-800 font-bold">
//                 404
//             </h1>
//             <p className="text-gray-500 text-3xl mt-2 mb-5">page Not Found</p>
//             <Link className="text-xl underline text-blue-700 block mt-6" href='/'>
//                 Go To home
//             </Link>
//         </section>
//     )
// }
