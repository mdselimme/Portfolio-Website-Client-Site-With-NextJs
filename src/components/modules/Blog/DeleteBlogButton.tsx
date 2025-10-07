"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { axiosBaseUrl } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeleteBlogButton = ({ blogId }: { blogId: string }) => {
  const router = useRouter();

  const deleteBlog = async () => {
    try {
      const res = await axiosBaseUrl.delete(`/blog/${blogId}`);
      const data = await res.data;
      if (data?.success) {
        router.push("/blogs");
        toast.success("Delete Blog Successfully.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Delete Blog Failed.");
    }
  };

  return (
    <Button onClick={deleteBlog} className="sm:inline-flex rounded-full">
      Delete
    </Button>
  );
};

export default DeleteBlogButton;
