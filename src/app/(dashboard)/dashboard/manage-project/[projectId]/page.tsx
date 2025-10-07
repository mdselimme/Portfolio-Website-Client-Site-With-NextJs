import EditProjectFrom from "@/components/modules/Project/EditProjectForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

const EditProjectPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_LINK}/project/${projectId}`
  );
  const { data: projectData } = await res.json();
  return (
    <div className="w-full md:w-[780px] mx-auto mt-24">
      <div className={cn("flex flex-col gap-6")}>
        <Card>
          <CardHeader>
            <CardTitle className="text-center font-semibold capitalize text-2xl">
              Edit Project Data
            </CardTitle>
          </CardHeader>
          {projectData === undefined ? (
            <h1 className="text-center text-2xl">Project Load Failed</h1>
          ) : (
            <EditProjectFrom project={projectData} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default EditProjectPage;
