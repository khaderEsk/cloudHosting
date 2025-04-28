import { NextResponse } from "next/server";
import { cookies } from "next/headers";
/**
 * @method GET
 * @route ~/api/user/logout
 * @description Logout
 * @access public
 */

export async function GET() {
    try {
        (await cookies()).delete("jwtToken");
        return NextResponse.json({ message: "logout" },
            {
                status: 200
            })
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error", error },
            { status: 500 }
        );
    }
}