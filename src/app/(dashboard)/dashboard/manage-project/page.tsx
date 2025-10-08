import ProjectDeleteButton from "@/components/modules/Project/ProjectDeleteButton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IProject } from "@/types/project";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Dashboard - Manage Project`,
  description: "Selim Portfolio Dashboard Page",
};

const ManageProject = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/project`, {
    cache: "no-store",
  });
  const { data: projectData } = await res.json();

  return (
    <div className="container mx-auto mt-6">
      <h3 className="text-center font-bold capitalize text-2xl mb-10">
        Manage Projects
      </h3>
      {projectData === undefined ? (
        <h1 className="text-2xl font-extrabold">No product found</h1>
      ) : (
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Project Id</TableHead>
              <TableHead className="text-center">Project Title</TableHead>
              <TableHead className="text-center">Project Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectData === undefined ? (
              <TableRow>
                <TableCell className="font-medium text-center" colSpan={3}>
                  No Project published yet
                </TableCell>
              </TableRow>
            ) : (
              projectData?.map((project: IProject) => (
                <TableRow key={project?._id} className="text-center">
                  <TableCell>{project?._id}</TableCell>
                  <TableCell>{project?.title}</TableCell>
                  <TableCell>
                    <Link href={`/dashboard/manage-project/${project?._id}`}>
                      <Button className="sm:inline-flex rounded-full mr-2">
                        Edit
                      </Button>
                    </Link>
                    <ProjectDeleteButton projectId={project?._id as string} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ManageProject;
