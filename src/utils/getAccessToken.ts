"use server";
import { cookies } from "next/headers";

export const getAccessToken = async () => {
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get("accessToken")?.value;
    return accessToken;
}