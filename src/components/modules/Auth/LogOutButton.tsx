"use client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import React from "react";
import { signOut } from "next-auth/react";

const LogOutButton = () => {
  const logOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <Button onClick={() => logOut()} className="mt-5">
      Log Out <LogOut />
    </Button>
  );
};

export default LogOutButton;
