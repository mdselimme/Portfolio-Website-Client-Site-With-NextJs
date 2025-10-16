// utils/getUserData.ts


export const getUserData = async (cookiesHeader?: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/user/me`, {
            cache: "no-store",
            credentials: "include",
            headers: {
                Cookie: cookiesHeader || "", // forward cookies to backend
            },
        });
        if (!res.ok) return undefined;

        const { data: userData } = await res.json();
        return userData || undefined;
    } catch {
        return undefined;
    }
};
