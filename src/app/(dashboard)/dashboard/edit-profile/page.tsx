import EditProfileForm from "@/components/modules/Dashboard/EdifProfileForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getUserData } from "@/utils/getUsersData";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

export const metadata: Metadata = {
  title: `Dashboard - Edit Profile`,
  description: "Dashboard Edit Profile Page",
};

const EditProfile = async () => {
  const cookieHeader = cookies().toString();
  const user = await getUserData(cookieHeader);
  return (
    <div>
      <div className="w-full md:w-[780px] mx-auto mt-24">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle className="text-center font-semibold capitalize text-2xl">
                Edit Profile
              </CardTitle>
            </CardHeader>
            <EditProfileForm data={user} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
