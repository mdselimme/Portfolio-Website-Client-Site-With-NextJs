"use server";

import { IBlog } from "@/types/blog.type";
import { getAccessToken } from "@/utils/getAccessToken";
import { revalidateTag } from "next/cache";

// CREATE BLOG FUNCTION 
export async function createBlogAction(blogData: IBlog) {

    const accessToken = await getAccessToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/blog`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
        },
        body: JSON.stringify(blogData)
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        return error
        // throw new Error(error?.error || "Request failed.")
    }

    const data = await res.json();

    if (data?.success) {
        revalidateTag("BLOGS");
    }

    return {
        success: true
    }
};

// UPDATE BLOG FUNCTION 
export async function updateBlogAction(blogId: string, blogData: IBlog) {
    const accessToken = await getAccessToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/blog/${blogId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
        },
        body: JSON.stringify(blogData)
    })

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.error || "Request failed.")
    }

    const data = await res.json();

    if (data?.success) {
        revalidateTag("BLOGS");
    }

    return {
        success: true
    }
};



// DELETE BLOG FUNCTION 
export async function deleteBlogAction(blogId: string) {

    const accessToken = await getAccessToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/blog/${blogId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            Authorization: `${accessToken}`,
        }
    })

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.error || "Request failed.")
    }

    const data = await res.json();

    if (data?.success) {
        revalidateTag("BLOGS");
    }

    return {
        success: true
    }
};
