import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IProject } from "@/types/project.types";
import { dateConvert } from "@/utils/convertDate";
import { getProjects } from "@/utils/getProjects";
import { SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_LINK}/project/${id}`
  );
  const { data }: { data: IProject } = await res.json();
  return {
    title: data?.title,
    description: data?.description,
  };
};

export const generateStaticParams = async () => {
  const data = await getProjects();

  return data.map((blog: IProject) => ({
    id: blog._id,
  }));
};

const ProjectDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_LINK}/project/${id}`
  );
  const { data }: { data: IProject } = await res.json();

  return (
    <div className="container mx-auto px-5 py-32">
      <div className="w-full md:w-2/3 mx-auto">
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
                  {data?.user?.name} -{" "}
                  {data?.createdAt
                    ? dateConvert(data?.createdAt)
                    : "No Publish Date"}
                </p>
              </div>
            </div>
            <div className="mb-8 w-full h-[350px] rounded-3xl border relative overflow-hidden">
              <Image
                src={data?.thumbnail || "/placeholder.png"}
                fill={true}
                alt={`${data?.title} image`}
                quality={75}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <CardTitle className="text-3xl font-bold mb-2">
              {data?.title}
            </CardTitle>
            <CardDescription className="text-md font-medium mb-2">
              {data?.description}
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex-col justify-start">
            <div className="flex gap-2 mb-3 items-center">
              <p className="text-lg font-semibold">Used Technology: </p>
              <ul className="flex gap-3 flex-wrap">
                {data?.technologyUsed?.map((tag: string) => (
                  <li
                    className="capitalize text-sm  bg-amber-200 text-chart-3 py-2 px-4 rounded-full"
                    key={tag}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              {data?.clientLiveLink ? (
                <Link
                  className="mr-2 flex items-center cursor-pointer"
                  href={data?.clientLiveLink || ""}
                  target="_blank"
                >
                  <Button className="mr-5">
                    Live Website
                    <SquareArrowOutUpRight />
                  </Button>
                </Link>
              ) : (
                ""
              )}
              {data?.clientCodeLink ? (
                <Link
                  className="mr-2 flex items-center cursor-pointer"
                  href={data?.clientCodeLink || ""}
                  target="_blank"
                >
                  <Button className="mr-5">
                    Client Code Link
                    <SquareArrowOutUpRight />
                  </Button>
                </Link>
              ) : (
                ""
              )}

              {data?.serverCodeLink ? (
                <Link
                  className="mr-2 flex items-center cursor-pointer"
                  href={data?.serverCodeLink || ""}
                  target="_blank"
                >
                  <Button className="mr-5">
                    Server Code Link
                    <SquareArrowOutUpRight />
                  </Button>
                </Link>
              ) : (
                ""
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
