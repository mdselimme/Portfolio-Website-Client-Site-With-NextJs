"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { axiosBaseUrl } from "@/lib/axios";
import { validateTag } from "@/utils/validateTag";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ProjectDeleteButton = ({ projectId }: { projectId: string }) => {
  const router = useRouter();

  const deleteProject = async () => {
    try {
      const res = await axiosBaseUrl.delete(`/project/${projectId}`);
      const data = await res.data;
      if (data?.success) {
        validateTag("PROJECTS");
        router.push("/projects");
        toast.success("Delete Project Successfully.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Delete Project Failed.");
    }
  };

  return (
    <Button onClick={deleteProject} className="sm:inline-flex rounded-full">
      Delete
    </Button>
  );
};

export default ProjectDeleteButton;
