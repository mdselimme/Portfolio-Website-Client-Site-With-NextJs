"use server";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserData } from "@/utils/getUsersData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Profile = async () => {
  const user = await getUserData();
  return (
    <div className=" md:col-span-2">
      {user === undefined ? (
        <h1 className="text-center font-bold text-2xl border p-5 rounded-xl">
          No Profile data Found
        </h1>
      ) : (
        <Card className="w-full p-10">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Profile Details
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div>
              <Avatar className="size-22">
                <Image
                  src={user?.photo || "/placeholder.png"}
                  fill={true}
                  alt={`${user?.name} image`}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={10}
                />
                <AvatarFallback>Profile Image</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-xl mt-2">{user?.name}</h3>
              <p className="mt-2">
                <span className="font-medium">Email</span>: {user?.email}
              </p>
              <p className="mt-2">
                <span className="font-medium">Phone</span>: {user?.phone}
              </p>
              <p className="mt-2">
                <span className="font-medium">Role</span>: {user?.role}
              </p>
              <p className="mt-2">
                <span className="font-medium">Verified</span>:{" "}
                {user?.isVerified ? (
                  <span className="text-green-800 font-bold">Verified</span>
                ) : (
                  <span className="text-red-800 font-bold">Not Verified</span>
                )}
              </p>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Link href={"/dashboard/edit-profile"}>
              {" "}
              <Button className="sm:inline-flex rounded-full">
                Edit Profile
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Profile;
