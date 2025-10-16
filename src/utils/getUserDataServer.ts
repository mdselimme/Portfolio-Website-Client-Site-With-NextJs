import { getUserData } from "./getUsersData";



export const getUserDataServer = async (cookieHeader?: string) => {
    return await getUserData(cookieHeader);
};