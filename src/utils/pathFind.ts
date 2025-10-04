"use client"
import { usePathname } from "next/navigation";


const usePathFind = () => {
    const path = usePathname();
    return path;
};

export default usePathFind;