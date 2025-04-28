import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { RegisterUserDto } from "@/utils/dto";
import { RegisterSchema } from "@/utils/validationSchema";
import bcrypt from 'bcryptjs'
import { setCookie } from "@/utils/generateToken";
/**
 * @method POST
 * @route ~/api/user/register
 * @description Sing Up | register
 * @access public
 */

export async function POST(request: NextRequest) {
    try {
        const user = (await request.json()) as RegisterUserDto;
        const validation = RegisterSchema.safeParse(user);


        if (!validation.success) {
            return NextResponse.json(
                { massage: validation.error.errors[0].message },
                { status: 500 }
            );
        }


        const oldUser = await prisma.user.findUnique({
            where: { email: user.email },
        });

        if (oldUser) {
            return NextResponse.json(
                { message: "this user already register" },
                { status: 500 }
            );
        }
        const salt = await bcrypt.genSalt(10); // Use genSalt instead of getSalt
        const hashPassword = await bcrypt.hash(user.password, salt);

        const newUser = await prisma.user.create({
            data: {
                firstName: user.firstName,
                email: user.email,
                password: hashPassword
            },
            select: {
                id: true,
                firstName: true,
                email: true,
                isAdmin: true,
            }
        });
        const cookie = setCookie({
            id: newUser.id,
            isAdmin: newUser.isAdmin,
            firstName: newUser.firstName,
        });
        return NextResponse.json(
            { ...newUser, message: "Register Authenticated" },
            {
                status: 201,
                headers: { 'Set-Cookie': cookie }
            });
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error", error },
            { status: 500 }
        );
    }
}
