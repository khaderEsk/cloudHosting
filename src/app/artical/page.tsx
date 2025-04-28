import { Article } from '@prisma/client';
import ArticleItem from '@/components/articles/ArticleItem';
import type { Metadata } from "next";
import SearchArticleText from '@/components/articles/SearchArticleText';
import Pagination from '@/components/articles/Pagination';
import { getArticles, getArticlesCount } from '@/apiCalls/articlesApiCall';
import { ARTICLE_PER_PAGE } from '@/utils/constant';



interface ArticlesPageNProps {
    searchParams: { pageNumber: string }
}

const articalPage = async ({ searchParams }: ArticlesPageNProps) => {
    const { pageNumber } = searchParams;
    const articles: Article[] = await getArticles(pageNumber);
    const count: number = await getArticlesCount();
    const pages = Math.ceil(count / ARTICLE_PER_PAGE);
    return (
        <section className="container m-auto px-5">
            <SearchArticleText />
            <div className="flex items-center justify-center flex-wrap gap-7">
                {articles.slice(0, 6).map(item =>
                    <ArticleItem article={item} key={item.id} />
                )}
            </div>
            <Pagination pageNumber={parseInt(pageNumber)} route='/artical' pages={pages} />
        </section>
    )
}
export default articalPage

export const metadata: Metadata = {
    title: "Article Page",
    description: "Article about Programming",
};