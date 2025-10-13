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
import { IUser } from "@/types/user.type";
import { axiosBaseUrl } from "@/lib/axios";
import { useRouter } from "next/navigation";

const updateUserZodSchema = z.object({
  photo: z.url({ error: "url is not valid." }),
  phone: z
    .string()
    .min(11, "Phone number is too short")
    .max(14, "Phone number is too long")
    .regex(
      /^(01|\+8801)\d{9}$/,
      "Invalid Bangladeshi phone number. It must start with '01' or '+8801' and be 11 or 13 digits long respectively."
    )
    .optional(),
});

const EditProfileForm = ({ data }: { data: IUser }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof updateUserZodSchema>>({
    resolver: zodResolver(updateUserZodSchema),
    defaultValues: {
      photo: data?.photo,
      phone: data?.phone,
    },
  });

  async function onSubmit(values: z.infer<typeof updateUserZodSchema>) {
    try {
      const updateData = {
        phone: values.phone,
        photo: values.photo,
      };
      const res = await axiosBaseUrl.patch("/user", updateData);
      const data = await res.data;
      if (data?.success) {
        router.push("/dashboard");
        toast.success("Update User Successfully.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Update Profile Failed");
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Photo</FormLabel>
                    <FormControl>
                      <Input {...field} />
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

export default EditProfileForm;
