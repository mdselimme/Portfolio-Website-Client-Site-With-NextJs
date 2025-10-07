import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IProject } from "@/types/project";
import ProjectCard from "../Project/ProjectCard";

const HomeProjects = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/project`);
  const { data: projectsData } = await res.json();

  return (
    <div className="container mx-auto pt-10 pb-20">
      <h1 className="text-center font-bold text-3xl my-10">
        Our Latest Projects
      </h1>
      <div className="grid grid-cols-1 p-5 md:grid-cols-3 gap-20">
        {projectsData.slice(0, 3)?.map((data: IProject) => (
          <ProjectCard key={data?._id} data={data} />
        ))}
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
