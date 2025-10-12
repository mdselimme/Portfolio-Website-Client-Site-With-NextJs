"use server"

export const getBlogs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/blog`, {
        next: {
            tags: ["BLOGS"]
        },
    });
    const { data } = await res.json();
    return data;
};

