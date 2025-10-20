import React from "react";
import { IBlog } from "@/types/blog.type";
import BlogCard from "@/components/modules/Blog/BlogCard";
import { Metadata } from "next";
import { getBlogs } from "@/utils/getBlogs";

export const metadata: Metadata = {
  title: `Selim Portfolio - Blogs`,
  description: "Selim Portfolio Blogs Page",
};

const BlogsPage = async () => {
  const blogsData = await getBlogs();

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-center font-bold text-3xl my-10">Our All Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
        {blogsData === undefined ? (
          <h1 className="text-center font-bold text-2xl">No Blogs Found</h1>
        ) : (
          blogsData?.map((data: IBlog) => (
            <BlogCard data={data} key={data?._id} />
          ))
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
