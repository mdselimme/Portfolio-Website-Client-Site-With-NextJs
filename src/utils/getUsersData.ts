import { getAccessToken } from "./getAccessToken";

export const getUserData = async () => {
    try {
        const accessToken = await getAccessToken();
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/user/me`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${accessToken}`,
            },
            credentials: "include",
            next: {
                tags: ["PROFILE"]
            },
        });

        if (!res.ok) return undefined;
        const { data } = await res.json();
        return data || undefined;
    } catch {
        return undefined;
    }
};