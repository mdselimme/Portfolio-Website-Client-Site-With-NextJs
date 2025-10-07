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
                  <Button className="sm:inline-flex rounded-full mr-4">
                    Edit Project
                  </Button>
                  <Button className="sm:inline-flex rounded-full">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageProject;
