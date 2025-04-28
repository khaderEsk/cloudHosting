import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

import { JWTPayload } from "@/utils/types";



export function verifyToken(request: NextRequest): JWTPayload | null {
    try {
        const jwtToken = request.cookies.get("jwtToken");
        const token = jwtToken?.value as string;
        if (!token) { return null };
        const privateKey = process.env.JWT_SECRET as string;
        const payload = jwt.verify(token, privateKey);
        return payload;
    } catch (error) {
        console.log(error)
    }

}


export function verifyTokenForPage(token: string): JWTPayload | null {
    try {
        const privateKey = process.env.JWT_SECRET as string;
        const payload = jwt.verify(token, privateKey);
        if (!payload) { return null };
        return payload;
    } catch (error) {
        console.log(error)
    }

}