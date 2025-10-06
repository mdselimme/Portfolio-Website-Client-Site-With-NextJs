import { cookies } from "next/headers";
/* eslint-disable @typescript-eslint/no-explicit-any */




export const getUserData = async () => {
    try {
        const cookieStore = cookies();
        const accessToken = (await cookieStore).get("accessToken")?.value;

        let user = null;
        if (accessToken) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/user/me`, {
                headers: {
                    Authorization: `${accessToken}`,
                },
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error("No user found.")
            }
            user = await res.json();
            return user?.data;
        }
    } catch (error: any) {
        console.log(error)
    }
}