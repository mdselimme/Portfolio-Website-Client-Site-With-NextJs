/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { axiosBaseUrl } from "@/lib/axios";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const LogOutButton = () => {
  const router = useRouter();

  const logOut = async () => {
    try {
      const res = await axiosBaseUrl.post("/auth/logout");
      const data = await res.data;
      if (data?.success) {
        router.push("/");
        toast.success("LogOut Successful.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <Button onClick={() => logOut()} className="mt-5">
      Log Out <LogOut />
    </Button>
  );
};

export default LogOutButton;
