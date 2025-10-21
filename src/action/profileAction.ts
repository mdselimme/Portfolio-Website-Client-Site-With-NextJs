"use server"
import { IUpdatePassword, IUser } from "@/types/user.type";
import { getAccessToken } from "@/utils/getAccessToken";
import { revalidateTag } from "next/cache";





// UPDATE PROFILE FUNCTION 
export async function updateProfileAction(updateData: Partial<IUser>) {
    const accessToken = await getAccessToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/user`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
        },
        body: JSON.stringify(updateData)
    })

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.error || "Request failed.")
    }

    const data = await res.json();

    if (data?.success) {
        revalidateTag("PROFILE");
    }

    return {
        success: true
    }
};

// UPDATE PASSWORD FUNCTION 
export async function updatePasswordAction(passData: IUpdatePassword) {
    const accessToken = await getAccessToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/auth/reset-password`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
        },
        body: JSON.stringify(passData)
    })

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.error || "Request failed.")
    }

    const data = await res.json();

    if (data?.success) {
        revalidateTag("PROFILE");
    }

    return {
        success: true
    }
};