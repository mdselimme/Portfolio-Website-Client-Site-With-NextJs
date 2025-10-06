import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { getAccessToken } from "@/utils/getAccessToken";
import Profile from "@/components/modules/Dashboard/Profile";

const DashboardHome = async () => {
  const accessToken = await getAccessToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/stats`, {
    headers: {
      Authorization: `${accessToken}`,
    },
    cache: "no-store",
  });
  const { data: totalStats } = await res.json();
  console.log(totalStats);
  return (
    <div className="container mx-auto">
      <h1 className="text-center font-extrabold text-2xl my-4">
        Dashboard Home
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Total Upload Project
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center font-extrabold text-3xl">
              {totalStats?.totalProjects}
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <Link className="underline" href={"/dashboard/manage-project"}>
              Go to Project Management
            </Link>
          </CardFooter>
        </Card>
        <Card className="w-full text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Total Upload Blog
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center font-extrabold text-3xl">
              {totalStats?.totalBlogs}
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <Link className="underline" href={"/dashboard/manage-blog"}>
              Go to Blogs Management
            </Link>
          </CardFooter>
        </Card>
        <Profile />
      </div>
    </div>
  );
};

export default DashboardHome;
