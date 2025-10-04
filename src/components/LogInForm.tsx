/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import Password from "./password";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { axiosBaseUrl } from "@/lib/axios";
import { signIn } from "next-auth/react";

const logInFormSchema = z.object({
  email: z.email().min(2, {
    message: "must be a valid email",
  }),
  password: z
    .string({ error: "give a valid password." })
    .min(1, { error: "password field could not empty." }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  // Define Login Form
  const form = useForm<z.infer<typeof logInFormSchema>>({
    resolver: zodResolver(logInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Login Function
  // async function onSubmit(values: z.infer<typeof logInFormSchema>) {
  //   const toastId = toast.loading("logging ....");
  //   try {
  //     const res = await axiosBaseUrl.post("/auth/login", values);
  //     const data = await res.data;

  //     if (data?.success) {
  //       toast.success("Login Successfully.", { id: toastId });
  //       router.push("/");
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //     toast.error(error?.response?.data?.message || "Login failed", {
  //       id: toastId,
  //     });
  //   }
  // }

  async function onSubmit(values: z.infer<typeof logInFormSchema>) {
    const toastId = toast.loading("logging ....");
    console.log({ ...values });
    try {
      signIn("credentials", {
        ...values,
        callbackUrl: "/dashboard",
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login failed", {
        id: toastId,
      });
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center font-semibold capitalize text-xl">
            Login to your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="write your email here"
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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Password {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
