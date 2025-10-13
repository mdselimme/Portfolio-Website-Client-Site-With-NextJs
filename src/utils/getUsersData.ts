"use server"
import { tokenValueCheck } from "./tokenValueCheck";



export const getUserData = async () => {
    try {

        const accessToken = await tokenValueCheck("accessToken");

        let user = null;
        if (accessToken) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/user/me`, {
                headers: {
                    Authorization: `${accessToken}`,
                },
                cache: "force-cache",
            });
            if (!res.ok) {
                throw new Error("No user found.")
            }
            user = await res.json();
            return user?.data;
        } else {
            throw new Error("No access token found.")
        }
    } catch {
        return null
    }
}