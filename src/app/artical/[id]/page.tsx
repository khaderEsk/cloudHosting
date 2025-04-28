import { getArticleById } from "@/apiCalls/articlesApiCall";
import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { SingleArticle } from "@/utils/types";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";

interface SingleArticlePageProps {
    params: {
        id: string
    }
}
const SingleArticlePage = async ({ params }: SingleArticlePageProps) => {
    const token = (await cookies()).get("jwtToken")?.value || "";
    const user = verifyTokenForPage(token);
    const article: SingleArticle = await getArticleById(params.id);

    return (
        <section className="fix-height container m-auto w-full px-5 pt-8 md:w-3/4">
            <div className="bg-white p-7 rounded-lg mb-7">
                <h1 className="text-3xl font-bold text-gray-700 mb-2">
                    {article.title}
                </h1>
                <div className="text-gray-400">
                    {new Date(article.createdAt).toLocaleDateString('en-US')}
                </div>
                <p className="text-gray-800 text-xl mt-5">{article.description}</p>
            </div>
            <div>
                {user ? (
                    <AddCommentForm articleId={article.id} />
                ) : (
                    <p className="text-gray-600 text-xl mt-5">You need to login to comment on this article</p>
                )}
            </div>
            <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
                Comments
            </h4>
            {article.comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} userId={user?.id} />
            )
            )}
        </section>
    )
}

export default SingleArticlePage