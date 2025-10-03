import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IBlog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { dateConvert } from "@/utils/convertDate";

const BlogsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/blog`);
  const { data: blogsData } = await res.json();

  return (
    <div className="container mx-auto py-20">
      <h1 className="text-center font-bold text-3xl my-10">Our All Blogs</h1>
      <div className="grid grid-cols-3 gap-20">
        {blogsData?.map((data: IBlog) => (
          <Link key={data?._id} href={`/blogs/${data?._id}`}>
            <Card>
              <div className="p-5">
                <Image
                  src={data?.thumbnail || "/placeholder.png"}
                  width={100}
                  height={350}
                  alt={`${data?.title} image`}
                  className="w-fit h-[350px] rounded-3xl"
                />
              </div>
              <CardHeader>
                <CardTitle>{data?.title}</CardTitle>
                <CardDescription>{data?.description}</CardDescription>
              </CardHeader>

              <CardFooter>
                <div className="flex gap-4 mb-3 items-center">
                  <Avatar className="size-10">
                    <AvatarImage
                      src={data?.author.photo}
                      alt={`${data?.author?.name} img`}
                    />
                    <AvatarFallback>PF</AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-normal text-muted-foreground">
                      {data?.author?.name}
                    </p>
                    <p className="font-normal text-muted-foreground">
                      {dateConvert(data?.createdAt)}
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
