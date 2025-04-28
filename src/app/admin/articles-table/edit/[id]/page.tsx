import { getArticleById } from '@/apiCalls/articlesApiCall';
import { verifyTokenForPage } from '@/utils/verifyToken';
import { Article } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import EditArticleForm from './EditFormArticleId';

interface EditArticlePageProps {
    params: Promise<{ id: string }>;
}

const EditArticlePage = async ({ params }: EditArticlePageProps) => {
    const token = cookies().get("jwtToken")?.value || "";
    if (!token) redirect("/")
    const user = verifyTokenForPage(token);
    if (user?.isAdmin === false) redirect("/")
    const article: Article = await getArticleById(params.id)
    return (
        <section className='fir-height flex items-center justify-center px-5 lg:px-20'>
            <div className='shadow p-4 bg-purple-200 rounded w-full'>
                <h2 className='text-2xl text-green-700 font-semibold mb-4'>
                    Edit Article
                </h2>
                <EditArticleForm article={article} />
            </div>
        </section>
    )
}

export default EditArticlePage