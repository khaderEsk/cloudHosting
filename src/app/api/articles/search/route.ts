import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
/**
 * @method GET
 * @route ~/api/articles/search
 * @description search Articles by title
 * @access public
 */


export async function GET(request: NextRequest) {
    try {
        const searchTitle = request.nextUrl.searchParams.get("searchTitle");
        let articles;
        if (searchTitle) {
            articles = await prisma.article.findMany({
                where: {
                    title: {
                        startsWith: searchTitle,
                        mode: "insensitive"
                    }
                }
            })
        } else {
            articles = await prisma.article.findMany({ take: 6 });
        }
        return NextResponse.json(articles, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error", error },
            { status: 500 }
        );
    }

}