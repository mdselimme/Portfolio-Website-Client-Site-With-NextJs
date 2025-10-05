"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";



export const getUserData = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/user/me`);
        const data = await res.json();
        if (!res.ok) {
            throw new Error("User can't found");
        }
        return data?.data;
    } catch (error: any) {
        toast.error(error?.response?.data?.message || "get user failed");
    }
}