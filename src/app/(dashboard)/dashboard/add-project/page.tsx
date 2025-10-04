import AddProjectForm from "@/components/modules/Project/AddProjectForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

const AddProjects = () => {
  return (
    <div className="w-full md:w-[780px] mx-auto mt-24">
      <div className={cn("flex flex-col gap-6")}>
        <Card>
          <CardHeader>
            <CardTitle className="text-center font-semibold capitalize text-2xl">
              Add Project
            </CardTitle>
          </CardHeader>
          <AddProjectForm />
        </Card>
      </div>
    </div>
  );
};

export default AddProjects;
