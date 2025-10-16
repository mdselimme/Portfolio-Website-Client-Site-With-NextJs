"use client";

export const checkAuth = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/auth/refresh-token`, {
            method: "POST",
            credentials: "include", // send cookies
        });

        if (res.ok) {
            await res.json();
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error("Auth check error:", err);
        return false;
    }
};
