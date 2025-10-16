import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;
    const { pathname, search } = request.nextUrl;

    const protectedRoutes = ["/dashboard"];
    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // Only block if no tokens at all
    if (isProtected && !accessToken && !refreshToken) {
        return redirectToLogin(request, pathname, search);
    }

    // If logged in and visits /login
    if (pathname === "/login" && accessToken) {
        const dashboardUrl = new URL("/dashboard", request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
}

function redirectToLogin(request: NextRequest, pathname: string, search: string) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirect", pathname + search);
    return NextResponse.redirect(redirectUrl);
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
