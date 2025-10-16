"use server"


export const getProjects = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/project`, {
        next: {
            tags: ["PROJECTS"]
        }
    });
    if (!res.ok) return undefined;
    const { data } = await res.json();

    return data || undefined;
};
