import { ROLE, TRole } from './types'
import { NextResponse, NextRequest } from 'next/server'

import { jwtVerify } from 'jose';
import { jwtSecret } from './config';
import { TUser } from './redux/features/auth/authSlice';


const JWT_SECRET = new TextEncoder().encode(jwtSecret);
async function getUserRoleFromToken(token: string): Promise<TRole | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return (payload?.user as TUser)?.role as TRole;
    } catch (error) {
        return null;
    }
}



export const privateItemsObject = {
    // home page
    "job-seekers": [ROLE.EMPLOYER, ROLE.EMPLOYEE,],
    notification: [ROLE.ADMIN, ROLE.EMPLOYER, ROLE.EMPLOYEE, ROLE.CANDIDATE],
    // training: [ROLE.CANDIDATE],
    // dashboard
    overview: [ROLE.EMPLOYER, ROLE.EMPLOYEE, ROLE.CANDIDATE],
    "personal-jobs": [ROLE.CANDIDATE, ROLE.EMPLOYEE, ROLE.EMPLOYER],
    "favorite-jobs": [ROLE.CANDIDATE],
    "job-alerts": [ROLE.CANDIDATE],
    "job-post": [ROLE.EMPLOYEE, ROLE.EMPLOYER],
    "saved-candidate": [ROLE.EMPLOYEE, ROLE.EMPLOYER],
    "plan-bills": [ROLE.EMPLOYER],
    settings: [ROLE.EMPLOYER, ROLE.CANDIDATE, ROLE.EMPLOYEE],
    admin: [ROLE.ADMIN]
};

const isPathAllowed = (role: TRole, pathname: string): boolean => {
    // console.log(pathname.split("/"))
    // console.log(privateItemsObject[pathname.split("/")[0]])
    return privateItemsObject[pathname.split("/")[1]].find((prefix: string) => role === prefix);
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value;
    // If no token, redirect to login
    if (!token) {
        return NextResponse.redirect(new URL(`/sign-in?redirect=${encodeURIComponent(pathname)}`, request.url));
    }
    const role: TRole | null = await getUserRoleFromToken(token);
    if (!role) {
        return NextResponse.redirect(new URL(`/sign-in?redirect=${encodeURIComponent(pathname)}`, request.url))
    }
    if (!isPathAllowed(role, pathname,)) {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/job-seekers/:path*',
        '/admin/:path*',
        "/overview/:path*",
        "/personal-jobs/:path*",
        "/favorite-jobs/:path*",
        "/job-alerts/:path*",
        "/job-post/:path*",
        "/saved-candidate/:path*",
        "/plan-bills/:path*",
        "/settings/:path*",
        "/notification/:path*",
        // "/training/:path*"
    ],
}