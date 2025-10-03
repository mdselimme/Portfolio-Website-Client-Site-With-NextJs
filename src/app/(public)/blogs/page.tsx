import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BlogsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/blog`);
  const { data: blogsData } = await res.json();
  console.log(blogsData);

  return (
    <div className="container mx-auto py-20">
      <h1 className="text-center font-bold text-3xl my-10">All Blogs</h1>
      <div className="grid grid-cols-3 gap-20">
        {blogsData?.map((data) => (
          <Card key={data?._id}>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
              <CardAction>Card Action</CardAction>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
