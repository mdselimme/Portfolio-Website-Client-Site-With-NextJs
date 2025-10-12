"use server"

import { revalidateTag } from "next/cache";

export const validateTag = async (tag: string) => {
    revalidateTag(tag);
};

