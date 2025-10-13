"use server"
import { cookies } from "next/headers";




export const tokenValueCheck = async (tokenName: string) => {
    const cookieStore = cookies();
    const value = (await cookieStore).get(tokenName)?.value;
    return value
};

