import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {

    const accessToken = request.cookies.get("accessToken")?.value;

    const { pathname, search } = request.nextUrl;

    // Protected routes
    const protectedRoutes = ["/dashboard", "/dashboard/:path*"];

    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

    // If route is protected and no token
    if (isProtected && !accessToken) {
        const redirectUrl = new URL("/login", request.url);
        // add original path to redirect query param
        redirectUrl.searchParams.set("redirect", pathname + search);
        return NextResponse.redirect(redirectUrl);
    }

    if (pathname === "/login" && accessToken) {
        const dashboardUrl = new URL("/dashboard", request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    //Otherwise allow request
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
    ],
};

