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
import { validateTag } from "@/utils/validateTag";

const blogSchema = z.object({
  title: z.string({ error: "Title is required" }).min(10, {
    message: "minimum 10 character long.",
  }),
  description: z.string({ error: "Description is required" }).min(50, {
    message: "minimum 50 character long.",
  }),
  thumbnail: z.url({ error: "Must be valid url." }),
  tags: z.string({ error: "tag is required" }).min(1, {
    message: "minimum 1 tag required.",
  }),
  isFeatured: z.string(),
});

const AddBlogForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      tags: "",
      isFeatured: "",
    },
  });

  async function onSubmit(values: z.infer<typeof blogSchema>) {
    try {
      const addBlogData = {
        title: values.title,
        description: values.description,
        thumbnail: values.thumbnail,
        tags: values.tags
          .toString()
          .split(",")
          .map((tag) => tag.trim()),
        isFeatured: values.isFeatured.toLowerCase() === "yes" ? true : false,
      };
      const res = await axiosBaseUrl.post("/blog", addBlogData);
      const data = await res.data;
      if (data?.success) {
        validateTag("BLOGS");
        router.push("/blogs");
        toast.success("Add Blog Successfully.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Add Blog failed");
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
                    <FormLabel>Blog Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="write your blog title here"
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
                    <FormLabel>Blog Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="write your blog description here"
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
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="write blogs tags separated by comma"
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
                    <FormLabel>Blog Image</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="give a blog related image url link"
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
                name="isFeatured"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Is Featured</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="If Blog is featured type (yes or no)"
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
                Add Blog
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </CardContent>
  );
};

export default AddBlogForm;
