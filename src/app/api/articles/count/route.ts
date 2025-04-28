import { NextResponse } from "next/server";
import prisma from "@/utils/db";
/**
 * @method GET
 * @route ~/api/articles/search
 * @description search Articles by title
 * @access public
 */

export async function GET() {
    try {
        const count = await prisma.article.count();
        return NextResponse.json({ count }, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error", error },
            { status: 500 }
        );
    }
}