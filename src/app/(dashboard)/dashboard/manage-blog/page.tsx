import DeleteBlogButton from "@/components/modules/Blog/DeleteBlogButton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IBlog } from "@/types/blog";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: `Dashboard - Manage Blog`,
  description: "Dashboard Manage Blog Page",
};

const ManageBlog = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/blog`, {
    cache: "no-store",
  });
  const { data: blogsData } = await res.json();

  return (
    <div className="container mx-auto mt-6">
      <h3 className="text-center font-bold capitalize text-2xl mb-10">
        Manage Blogs
      </h3>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Blog Id</TableHead>
            <TableHead className="text-center">Blog Title</TableHead>
            <TableHead className="text-center">Blog Views</TableHead>
            <TableHead className="text-center">Blog Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogsData === undefined ? (
            <TableRow>
              <TableCell className="font-medium text-center" colSpan={4}>
                No blog published yet
              </TableCell>
            </TableRow>
          ) : (
            blogsData?.map((blog: IBlog) => (
              <TableRow key={blog?._id} className="text-center">
                <TableCell>{blog?._id}</TableCell>
                <TableCell>{blog?.title}</TableCell>
                <TableCell>{blog?.views}</TableCell>
                <TableCell>
                  <Link href={`/dashboard/manage-blog/${blog?._id}`}>
                    <Button className="sm:inline-flex rounded-full mr-2">
                      Edit
                    </Button>
                  </Link>
                  <DeleteBlogButton blogId={blog?._id} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageBlog;
