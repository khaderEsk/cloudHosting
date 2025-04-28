import { NextRequest, NextResponse } from "next/server";
import { UpdateCommentDto } from "@/utils/dto";
import { verifyToken } from "@/utils/verifyToken";
import prisma from "@/utils/db";

interface Props {
    params: {
        id: string;
    };
}


/**
 * @method PUT
 * @route ~/api/comments:id
 * @description Update comment By Id
 * @access private
 */



export async function PUT(request: NextRequest, { params }: Props) {
    try {
        const user = verifyToken(request);

        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(params.id) }
        })
        if (!comment) {
            return NextResponse.json(
                { message: "comment not found" },
                { status: 404 }
            );
        }
        if (user === null || user.id !== comment.userId) {
            return NextResponse.json({ message: "access denied" }, { status: 403 });
        }

        const body = (await request.json()) as UpdateCommentDto;

        const updatedComment = await prisma.comment.update({
            where: { id: parseInt(params.id) },
            data: {
                text: body.text
            }
        })
        return NextResponse.json(updatedComment, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error", error },
            { status: 500 }
        );
    }
}



export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(params.id) }
        })
        if (!comment) {
            return NextResponse.json(
                { message: "comment not found" },
                { status: 404 }
            )
        }
        const user = verifyToken(request);
        if (user?.isAdmin || user?.id === comment.userId) {
            await prisma.comment.delete({
                where: { id: parseInt(params.id) }
            })
            return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
        }

        return NextResponse.json(
            { message: "you are not allowed, access denied" },
            { status: 403 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error", error },
            { status: 500 }
        );
    }
}