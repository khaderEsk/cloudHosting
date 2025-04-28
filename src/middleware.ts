import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    const jwtToken = request.cookies.get("jwtToken");
    const token = jwtToken?.value as string;

    if (!token) {
        if (request.nextUrl.pathname.startsWith('/api/user/profile/')) {
            return NextResponse.json(
                { message: 'Unauthorized: Missing token, access denied' },
                { status: 401 }
            );
        }
    } else {
        if (
            request.nextUrl.pathname === '/login' ||
            request.nextUrl.pathname === '/register'
        ) {
            return NextResponse.redirect(new URL("/", request.url))
        }
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/api/user/profile/:path*', '/login', '/register'],
}