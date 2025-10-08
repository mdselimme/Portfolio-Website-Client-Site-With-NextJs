import UpdatePasswordForm from "@/components/modules/Auth/UpdatePasswordForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Dashboard - Update Password`,
  description: "Dashboard Update Password Page",
};

const UpdatePassword = async () => {
  return (
    <div>
      <div className="w-full md:w-[780px] mx-auto mt-24">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle className="text-center font-semibold capitalize text-2xl">
                Change Password
              </CardTitle>
            </CardHeader>
            <UpdatePasswordForm />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
