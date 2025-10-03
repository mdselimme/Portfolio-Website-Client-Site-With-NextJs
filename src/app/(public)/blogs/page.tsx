import React from "react";
import { IBlog } from "@/types/blog";
import BlogCard from "@/components/modules/Blog/BlogCard";

const BlogsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/blog`);
  const { data: blogsData } = await res.json();

  return (
    <div className="container mx-auto py-20">
      <h1 className="text-center font-bold text-3xl my-10">Our All Blogs</h1>
      <div className="grid grid-cols-3 gap-20">
        {blogsData?.map((data: IBlog) => (
          <BlogCard data={data} key={data?._id} />
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
