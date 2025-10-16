export const getUserData = async (cookieHeader?: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/user/me`, {
            headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
            credentials: cookieHeader ? undefined : "include",
            cache: "no-store",
        });

        if (!res.ok) return undefined;
        const { data } = await res.json();
        return data || undefined;
    } catch {
        return undefined;
    }
};