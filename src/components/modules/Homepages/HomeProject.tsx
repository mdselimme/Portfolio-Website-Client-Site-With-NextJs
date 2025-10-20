"use server";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IProject } from "@/types/project.types";
import ProjectCard from "../Project/ProjectCard";
import { getProjects } from "@/utils/getProjects";

const HomeProjects = async () => {
  const projectsData = await getProjects();

  return (
    <div className="container mx-auto pt-10 pb-20">
      <h1 className="text-center font-bold text-3xl mb-10">
        Our Latest Projects
      </h1>
      <div className="grid grid-cols-1 p-5 md:grid-cols-3 gap-20">
        {projectsData === undefined ? (
          <h1 className="text-center font-bold text-2xl">No Blogs Found</h1>
        ) : (
          projectsData
            .slice(0, 3)
            ?.map((data: IProject) => (
              <ProjectCard key={data?._id} data={data} />
            ))
        )}
      </div>
      <div className="text-center my-8">
        <Link href={"/projects"}>
          <Button>See All Projects</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeProjects;
