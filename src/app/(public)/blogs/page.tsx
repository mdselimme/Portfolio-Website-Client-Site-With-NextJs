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
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
