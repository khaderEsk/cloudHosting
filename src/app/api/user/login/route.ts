import { NextRequest, NextResponse } from "next/server";

import prisma from "@/utils/db";
import { LoginUserDto } from "@/utils/dto";
import { LoginSchema } from "@/utils/validationSchema";
import bcrypt from "bcryptjs";
import { setCookie } from "@/utils/generateToken"
/**
 * @method POST
 * @route ~/api/user/login
 * @description Login
 * @access public
 */

export async function POST(request: NextRequest) {
    try {
        const user = (await request.json()) as LoginUserDto;
        const validation = LoginSchema.safeParse(user);

        if (!validation.success) {
            return NextResponse.json(
                { massage: validation.error.errors[0].message },
                { status: 500 }
            );
        }

        const oldUser = await prisma.user.findUnique({
            where: { email: user.email },
        });
        if (!oldUser) {
            return NextResponse.json(
                { message: "something went wrong{user not found}" },
                { status: 400 }
            );
        }

        const isMatch = await bcrypt.compare(user.password, oldUser.password);
        if (!isMatch) {
            return NextResponse.json(
                { message: "something went wrong" },
                { status: 400 }
            );
        }

        const cookie = setCookie({
            id: oldUser.id,
            isAdmin: oldUser.isAdmin,
            firstName: oldUser.firstName,
        });

        return NextResponse.json(
            { message: "Authenticated" },
            {
                status: 200,
                headers: { 'Set-Cookie': cookie }
            }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error", error },
            { status: 500 }
        );
    }
}
