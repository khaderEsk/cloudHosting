import { NextRequest, NextResponse } from "next/server";
import { UpdateArticleDto } from "@/utils/dto";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

interface Props {
  params: {
    id: string;
  };
}

/**
 * @method GET
 * @route ~/api/articles/:id
 * @description Get single Articles by id
 * @access private
 */

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        comments: {
          include: {
            User: {
              select: {
                firstName: true
              }
            }
          },
          orderBy: {
            createdAt: "asc"
          }
        }
      }
    });
    if (!article)
      return NextResponse.json(
        { message: "Article not found" },
        { status: 400 }
      );
    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route ~/api/articles/:id
 * @description Update single Articles by id
 * @access public
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    if (user === null || user?.isAdmin === false) {
      return NextResponse.json({ message: "only admin can update article" }, { status: 403 });
    }
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!article)
      return NextResponse.json(
        { message: "Article not found" },
        { status: 400 }
      );
    const body = (await request.json()) as UpdateArticleDto;
    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(updatedArticle, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route ~/api/articles/:id
 * @description Delete single Articles by id
 * @access public
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {

    const user = verifyToken(request);
    if (user === null || user?.isAdmin === false) {
      return NextResponse.json({ message: "only admin can delete article" }, { status: 403 });
    }
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        comments: true
      }
    });
    if (!article)
      return NextResponse.json(
        { message: "Article not found" },
        { status: 400 }
      );
    await prisma.article.delete({
      where: { id: parseInt(params.id) }
    });
    const commentsIds: number[] = article?.comments.map(comment => comment.id);
    await prisma.comment.deleteMany({
      where: { id: { in: commentsIds } },
    })
    return NextResponse.json({ message: "Article deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}
