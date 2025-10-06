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
import { axiosBaseUrl } from "@/lib/axios";
import { useRouter } from "next/navigation";

const addProjectSchema = z.object({
  title: z.string({ error: "Title is required" }).min(10, {
    message: "minimum 10 character long.",
  }),
  description: z.string({ error: "Description is required" }).min(50, {
    message: "minimum 50 character long.",
  }),
  thumbnail: z.url({ error: "Must be valid url." }),
  technologyUsed: z.string({ error: "technologyUsed is required" }).min(1, {
    message: "minimum 1 technology required.",
  }),
});

const AddProjectForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof addProjectSchema>>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      technologyUsed: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addProjectSchema>) {
    try {
      const addProjectData = {
        title: values.title,
        description: values.description,
        thumbnail: values.thumbnail,
        technologyUsed: values.technologyUsed
          .toString()
          .split(",")
          .map((tag) => tag.trim()),
      };
      const res = await axiosBaseUrl.post("/project", addProjectData);
      const data = await res.data;
      if (data?.success) {
        router.push("/projects");
        toast.success("Add Project Successfully.");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Add Project Failed.");
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

            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full">
                Add Project
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </CardContent>
  );
};

export default AddProjectForm;
