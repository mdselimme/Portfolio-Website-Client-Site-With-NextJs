import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IBlog } from "@/types/blog.type";
import { dateConvert } from "@/utils/convertDate";
import { getBlogs } from "@/utils/getBlogs";
import Image from "next/image";
import React from "react";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/blog/${id}`);
  const { data }: { data: IBlog } = await res.json();
  return {
    title: data?.title,
    description: data?.description,
  };
};

export const generateStaticParams = async () => {
  const data = await getBlogs();

  return data.map((blog: IBlog) => ({
    id: blog._id,
  }));
};

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/blog/${id}`);
  const { data }: { data: IBlog } = await res.json();

  return (
    <div className="container mx-auto py-32">
      {data === undefined ? (
        <h1 className="text-center font-bold text-2xl">No Data Found</h1>
      ) : (
        <div className="w-2/3 mx-auto">
          <Card>
            <CardHeader>
              <div className="flex gap-4 mb-3 items-center">
                <Avatar className="size-16">
                  <AvatarImage
                    src={data?.author?.photo}
                    alt={`${data?.author?.name} img`}
                  />
                  <AvatarFallback>PF</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-muted-foreground">
                    {data?.author?.name} -{" "}
                    {dateConvert(data?.createdAt as string)}
                  </p>
                  <p className="font-semibold text-muted-foreground flex gap-2 mt-2">
                    Views: {data?.views}
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
                <p className="text-lg font-semibold">Tags: </p>
                <ul className="flex gap-3">
                  {data?.tags?.map((tag: string) => (
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
      )}
    </div>
  );
};

export default BlogDetailsPage;
