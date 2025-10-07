import EditBlogForm from "@/components/modules/Blog/EditBlog";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

const EditBlogPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_LINK}/blog/${blogId}`
  );
  const { data: blogData } = await res.json();
  return (
    <div className="w-full md:w-[780px] mx-auto mt-24">
      <div className={cn("flex flex-col gap-6")}>
        <Card>
          <CardHeader>
            <CardTitle className="text-center font-semibold capitalize text-2xl">
              Edit Blog Data
            </CardTitle>
          </CardHeader>
          {blogData === undefined ? (
            <h1 className="text-center text-2xl">Blog Load Failed</h1>
          ) : (
            <EditBlogForm blog={blogData} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default EditBlogPage;
