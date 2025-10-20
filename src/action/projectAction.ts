"use server";

import { IProject } from "@/types/project.types";
import { getAccessToken } from "@/utils/getAccessToken";
import { revalidateTag } from "next/cache";

// CREATE PROJECT FUNCTION 
export async function createProjectAction(projectData: IProject) {

    const accessToken = await getAccessToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/project`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
        },
        body: JSON.stringify(projectData)
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.error || "Request failed.")
    }

    const data = await res.json();

    if (data?.success) {
        revalidateTag("PROJECTS");
    }

    return {
        success: true
    }
};

// UPDATE PROJECT FUNCTION 
export async function updateProjectAction(projectId: string, projectData: IProject) {
    const accessToken = await getAccessToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/project/${projectId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
        },
        body: JSON.stringify(projectData)
    })

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.error || "Request failed.")
    }

    const data = await res.json();

    if (data?.success) {
        revalidateTag("PROJECTS");
    }

    return {
        success: true
    }
};



// DELETE PROJECT FUNCTION 
export async function deleteProjectAction(projectId: string) {

    const accessToken = await getAccessToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/project/${projectId}`, {
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
        revalidateTag("PROJECTS");
    }

    return {
        success: true
    }
};
