"use server";
import React from "react";
import { IBlog } from "@/types/blog";
import BlogCard from "../Blog/BlogCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomeBlog = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/blog`, {
    next: {
      revalidate: 60,
    },
  });
  const { data: blogsData } = await res.json();

  return (
    <div className="container mx-auto pb-10 pt-10">
      <h1 className="text-center font-bold text-3xl my-10">Our Latest Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 p-5">
        {blogsData === undefined ? (
          <h1 className="text-center font-bold text-2xl my-10">
            No Blog Post Yet
          </h1>
        ) : (
          blogsData
            .slice(0, 3)
            ?.map((data: IBlog) => <BlogCard key={data?._id} data={data} />)
        )}
      </div>
      <div className="text-center my-8">
        <Link href={"/blogs"}>
          <Button>See All Blogs</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeBlog;
