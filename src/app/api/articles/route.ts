import { NextRequest, NextResponse } from "next/server";
import { ArticleSchema } from "@/utils/validationSchema";
import { CreateArticleDto } from "@/utils/dto";
import prisma from "@/utils/db";
import { Article } from "@prisma/client";
import { ARTICLE_PER_PAGE } from "@/utils/constant";
import { verifyToken } from "@/utils/verifyToken";
/**
 * @method GET
 * @route ~/api/articles
 * @description Get Articles by pageNumber
 * @access private
 */
export async function GET(request: NextRequest) {
  try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
    const articles = await prisma.article.findMany({
      skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1),
      take: ARTICLE_PER_PAGE,
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}

/**
 * @method POST
 * @route ~/api/articles
 * @description Create New Article
 * @access private
 */
export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (user === null || user?.isAdmin === false) {
      return NextResponse.json({ message: "only admin can create article" }, { status: 403 });
    }
    const body = (await request.json()) as CreateArticleDto;
    const validation = ArticleSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}
