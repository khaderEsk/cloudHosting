import { verifyTokenForPage } from '@/utils/verifyToken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'
import { Article } from '@prisma/client';
import { getArticles, getArticlesCount } from '@/apiCalls/articlesApiCall';
import { ARTICLE_PER_PAGE } from '@/utils/constant';
import Link from 'next/link';
import Pagination from '@/components/articles/Pagination';
import DeleteArticleButton from './DeleteArticleButton';
import { BiEdit } from 'react-icons/bi';
import { MdOutlineReadMore } from 'react-icons/md';

interface AdminProps {
    searchParams: { pageNumber: string }
}

const AdminArticlesTable = async ({ searchParams }: AdminProps) => {
    const token = (await cookies()).get("jwtToken")?.value || "";
    if (!token) redirect("/")
    const user = verifyTokenForPage(token);
    if (!user?.isAdmin) redirect("/")

    const articles: Article[] = await getArticles(searchParams.pageNumber);
    const count: number = await getArticlesCount();
    const pages = Math.ceil(count / ARTICLE_PER_PAGE);
    return (
        <section className='p-5'>
            <h1 className='mb-7 text-2xl font-semibold text-gray-700'>Article</h1>
            <table className='table w-full text-left'>
                <thead className='border-t-2 border-b-2 border-gray-500 lg:text-xl'>
                    <tr>
                        <th className='p-1 lg:p-2'>Title</th>
                        <th className='hidden lg:inline-block'>Created At</th>
                        <th>Action</th>
                        <th className='hidden lg:inline-block'></th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map(article => (
                        <tr key={article.id} className='border-b border-t border-gray-300'>
                            <td className='p-3 text-gray-700'>{article.title}</td>
                            <td className='hidden lg:inline-block text-gray-700 font-normal p-3'>
                                {new Date(article.createdAt).toLocaleDateString('en-US')}
                            </td>
                            <td className='p-3'>
                                <Link href={`/admin/articles-table/edit/${article.id}`}
                                    className='bg-green-600 text-white rounded-lg py-1 px-2 inline-block text-center mb-2 me-2 lg:me-3 hover:bg-green-800 transition'
                                >
                                    Edit <BiEdit className='inline-block' />
                                </Link>
                                <DeleteArticleButton articleId={article.id} />
                            </td>
                            <td className='hidden lg:inline-block'>
                                <Link href={`/artical/${article.id}`} className='text-white bg-blue-600 rounded-lg p-2 hover:bg-blue-800'>
                                    Read More <MdOutlineReadMore className='inline-block'/>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                pageNumber={parseInt(searchParams.pageNumber)}
                pages={pages}
                route='/admin/articles-table'
            />
        </section>
    )
}

export default AdminArticlesTable