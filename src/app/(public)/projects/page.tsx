import ProjectCard from "@/components/modules/Project/ProjectCard";
import { IProject } from "@/types/project.types";
import { getProjects } from "@/utils/getProjects";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Selim Portfolio - Project`,
  description: "Selim Portfolio Projects Page",
};

const ProjectsPage = async () => {
  const projectsData = await getProjects();

  return (
    <div className="container mx-auto py-20">
      <h1 className="text-center font-bold text-3xl my-10">Our All Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 px-5">
        {projectsData === undefined ? (
          <h1 className="text-center font-bold text-2xl">No Blogs Found</h1>
        ) : (
          projectsData?.map((data: IProject) => (
            <ProjectCard data={data} key={data?._id} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
