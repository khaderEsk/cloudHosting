import { NextRequest, NextResponse } from "next/server";
import { CreateCommentDto } from "@/utils/dto";
import { createCommentSchema } from "@/utils/validationSchema";
import { verifyToken } from "@/utils/verifyToken";
import prisma from "@/utils/db";


/**
 * @method POST
 * @route ~/api/comments
 * @description create new comment
 * @access private
 */
export async function POST(request: NextRequest) {
    try {

        const user = verifyToken(request);
        if (!user) {
            return NextResponse.json({ message: "login first,access denied" }, { status: 401 });
        }
        const body = await request.json() as CreateCommentDto;
        const validation = createCommentSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
        }

        const newComment = await prisma.comment.create({
            data: {
                text: body.text,
                articleId: body.articleId,
                userId: user.id
            }
        })
        return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error", error },
            { status: 500 }
        );
    }
}


/**
 * @method GET
 * @route ~/api/comments
 * @description Get All Comments
 * @access private
 */


export async function GET(request: NextRequest) {
    try {
        const user = verifyToken(request);
        if (user === null || user.isAdmin === false) {
            return NextResponse.json(
                { message: "only admin, access denied" },
                { status: 403 }
            );
        }
        const comments = await prisma.comment.findMany();
        return NextResponse.json(
            comments,
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error", error },
            { status: 500 }
        );
    }
}