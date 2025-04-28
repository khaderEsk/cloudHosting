import { DOMAIN } from "@/utils/constant";
import { SingleArticle } from "@/utils/types";
import { Article } from "@prisma/client";
import { notFound } from "next/navigation";


export async function getArticles(pageNumber: string | undefined): Promise<Article[]> {
    const response = await fetch(`${DOMAIN}/api/articles?pageNumber=${pageNumber}`, {
        cache: 'no-store'
    });
    if (!response.ok) {
        throw new Error('Failed to fetch articles')
    }
    return response.json();
}



export async function getArticlesCount(): Promise<number> {
    const response = await fetch(
        `${DOMAIN}/api/articles/count`,
        { cache: 'no-store' }
    );
    if (!response.ok) {
        throw new Error('Failed to fetch articles')
    }
    const { count } = await response.json() as { count: number };
    return count;
}

export async function getArticleById(articleId: string): Promise<SingleArticle> {
    const response = await fetch(
        `${DOMAIN}/api/articles/${articleId}`,
        { cache: 'no-store' }
    );
    if (!response.ok) {
        notFound();
    }
    return response.json();
}
