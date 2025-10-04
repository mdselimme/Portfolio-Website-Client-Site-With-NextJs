import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dateConvert } from "@/utils/convertDate";
import Image from "next/image";
import React from "react";

const ProjectDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_LINK}/project/${id}`
  );
  const { data } = await res.json();

  return (
    <div className="container mx-auto py-32">
      <div className="w-2/3 mx-auto">
        <Card>
          <CardHeader>
            <div className="flex gap-4 mb-3 items-center">
              <Avatar className="size-16">
                <AvatarImage
                  src={data?.user?.photo}
                  alt={`${data?.user?.name} img`}
                />
                <AvatarFallback>PF</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-muted-foreground">
                  {data?.user?.name} - {dateConvert(data?.createdAt)}
                </p>
              </div>
            </div>
            <div className="mb-8 w-full h-[350px] rounded-3xl border relative overflow-hidden">
              <Image
                src={data?.thumbnail || "/placeholder.png"}
                fill={true}
                alt={`${data?.title} image`}
                quality={75}
              />
            </div>
            <CardTitle className="text-3xl font-bold mb-2">
              {data?.title}
            </CardTitle>
            <CardDescription className="text-md font-medium mb-2">
              {data?.description}
            </CardDescription>
          </CardHeader>

          <CardFooter>
            <div className="flex gap-2 mb-3 items-center">
              <p className="text-lg font-semibold">Used Technology: </p>
              <ul className="flex gap-3">
                {data?.technologyUsed?.map((tag: string) => (
                  <li
                    className="capitalize text-sm bg-accent-foreground text-white py-2 px-4 rounded-full"
                    key={tag}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
