import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserDto } from "@/utils/dto";
import bcrypt from "bcryptjs"
import { UpdateUserSchema } from "@/utils/validationSchema";

interface Props {
    params: {
        id: string;
    };
}
/**
 * @method DELETE
 * @route ~/api/user/profile/:id
 * @description delete profile
 * @access private
 */


export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(params.id) }, // Use the destructured `id`
            include: {
                comment: true
            }
        });
        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }
        const userFromToken = verifyToken(request);

        if (userFromToken !== null && userFromToken.id === user.id) {
            await prisma.user.delete({ where: { id: parseInt(params.id) } });

            const commentsIds: number[] = user?.comment.map(comment => comment.id);
            await prisma.comment.deleteMany({
                where: { id: { in: commentsIds } }
            })

            return NextResponse.json(
                { message: 'User deleted successfully' },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { message: 'Forbidden: You are not authorized to delete this user' },
            { status: 403 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error", error },
            { status: 500 }
        );
    }
}



/**
 * @method GET
 * @route ~/api/user/profile/:id
 * @description Get profile By Id
 * @access private
 */


export async function GET(request: NextRequest, { params }: Props) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(params.id) },
            select: {
                id: true,
                firstName: true,
                email: true,
                isAdmin: true
            }
        })
        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            )
        }
        const userFromToken = verifyToken(request);
        if (userFromToken === null || userFromToken.id !== user.id) {
            return NextResponse.json(
                { message: 'Forbidden: You are not authorized to view this user' },
                { status: 403 }
            )
        }
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error", error },
            { status: 500 }
        );
    }
}



/**
 * @method PUT
 * @route ~/api/user/profile/:id
 * @description Update profile By Id
 * @access private
 */


export async function PUT(request: NextRequest, { params }: Props) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(params.id) },
            select: {
                id: true,
                firstName: true,
                email: true,
                isAdmin: true
            }
        })
        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            )
        }
        const userFromToken = verifyToken(request);
        if (userFromToken === null || userFromToken.id !== user.id) {
            return NextResponse.json(
                { message: 'Forbidden: You are not authorized to view this user' },
                { status: 403 }
            )
        }
        const body = (await request.json()) as UpdateUserDto;
        const validation = UpdateUserSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.errors[0].message },
                { status: 400 }
            )
        }
        if (body.password) {
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password, salt);
        }
        const updateUser = await prisma.user.update({
            where: { id: parseInt(params.id) },
            data: {
                firstName: body.firstName,
                email: body.email,
                password: body.password
            },
            // select:{
            //     id:true,
            //     firstName:true,
            //     email:true,
            //     isAdmin:true,
            // }
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, createdAt, updatedAt, ...other } = updateUser;
        return NextResponse.json({
            message: 'User updated successfully',
            data: { ...other }
        }, { status: 200 });


    } catch (error) {
        return NextResponse.json(
            { message: "internal server error", error },
            { status: 500 }
        );
    }
}