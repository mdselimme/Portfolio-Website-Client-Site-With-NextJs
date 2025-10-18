"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { axiosBaseUrl } from "@/lib/axios";
import { validateTag } from "@/utils/validateTag";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
const DeleteBlogButton = ({ blogId }: { blogId: string }) => {
  const router = useRouter();

  const deleteBlog = async () => {
    try {
      const res = await axiosBaseUrl.delete(`/blog/${blogId}`);
      const data = await res.data;
      if (data?.success) {
        validateTag("BLOGS");
        router.push("/blogs");
        toast.success("Delete Blog Successfully.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Delete Blog Failed.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="sm:inline-flex rounded-full">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure ?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your blog
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteBlog}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBlogButton;
