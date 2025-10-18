import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/auth/refresh-token`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            cookie: req.headers.get("cookie") || "",
        },
        credentials: 'include'
    });
    const data = await res.json();
    const response = NextResponse.json(data, { status: res.status });
    const setCookie = res.headers.get("set-cookie");
    if (setCookie) {
        response.headers.set("set-cookie", setCookie);
    }
    return response;
};