/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { IProject } from "@/types/project.types";
import { updateProjectAction } from "@/action/projectAction";

const editProjectSchema = z.object({
  title: z.string({ error: "project title required." }).optional(),
  thumbnail: z
    .url({ error: "thumbnail link is required and give a valid link." })
    .optional(),
  description: z.string({ error: "description required." }).optional(),
  technologyUsed: z
    .string({ error: "technologyUsed is required" })
    .min(1, {
      message: "minimum 1 technology required.",
    })
    .optional(),
  clientLiveLink: z
    .url({ error: "client live link is not valid link." })
    .optional(),
  serverLiveLink: z
    .url({ error: "server live link is not valid link." })
    .optional(),
  clientCodeLink: z
    .url({ error: "client code link is not valid link." })
    .optional(),
  serverCodeLink: z
    .url({ error: "server code link is not valid link." })
    .optional(),
});

const EditProjectFrom = ({ project }: { project: IProject }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof editProjectSchema>>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      title: project?.title,
      description: project?.description,
      thumbnail: project?.thumbnail,
      technologyUsed: project?.technologyUsed?.join(", ") ?? "",
      clientLiveLink: project?.clientLiveLink,
      serverLiveLink: project?.serverLiveLink,
      clientCodeLink: project?.clientCodeLink,
      serverCodeLink: project?.serverCodeLink,
    },
  });

  async function onSubmit(values: z.infer<typeof editProjectSchema>) {
    try {
      const editProjectData = {
        title: values.title,
        description: values.description,
        thumbnail: values.thumbnail,
        technologyUsed: (values?.technologyUsed ?? "")
          .toString()
          .split(",")
          .map((tag) => tag.trim()),
        clientLiveLink: values?.clientLiveLink,
        serverLiveLink: values?.serverLiveLink,
        clientCodeLink: values?.clientCodeLink,
        serverCodeLink: values?.serverCodeLink,
      };
      const result = await updateProjectAction(
        project?._id as string,
        editProjectData
      );
      if (result?.success) {
        router.push("/projects");
        toast.success("Update Project Successfully.");
      }
    } catch (error: any) {
      toast.error(error?.message || "Update Project Failed.");
    }
  }
  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="write your project title here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="write your project description here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="technologyUsed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Technology</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="write project technology used separated by comma"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Image</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="give a project related image url link"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="clientLiveLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Client Live Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="give project client live url link"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="serverLiveLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Server Live Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="give project server live url link"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="clientCodeLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Client Code Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="give project client code url link"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="serverCodeLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Server Code Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="give project server code url link"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full">
                Edit Submit
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </CardContent>
  );
};

export default EditProjectFrom;
