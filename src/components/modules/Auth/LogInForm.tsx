/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { axiosBaseUrl } from "@/lib/axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Password from "@/components/password";
import { useAuth } from "@/context/AuthContext";

const logInFormSchema = z.object({
  email: z.email().min(2, {
    message: "must be a valid email",
  }),
  password: z
    .string({ error: "give a valid password." })
    .min(1, { error: "password field could not empty." }),
});

export function LoginForm({
  redirectPath = "/dashboard",
  className,
  ...props
}: React.ComponentProps<"div"> & { redirectPath?: string }) {
  const router = useRouter();
  const { setAccessToken } = useAuth();
  // Define Login Form
  const form = useForm<z.infer<typeof logInFormSchema>>({
    resolver: zodResolver(logInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof logInFormSchema>) {
    try {
      const res = await axiosBaseUrl.post("/auth/login", values, {
        withCredentials: true,
      });
      const data = await res.data;
      if (data?.success) {
        const { accessToken, refreshToken } = data?.data;
        if (accessToken) {
          Cookies.set("accessToken", accessToken, {
            expires: 2,
            secure: true,
            sameSite: "None",
          });
          setAccessToken(accessToken);
        }
        if (refreshToken) {
          Cookies.set("refreshToken", refreshToken, {
            expires: 30,
            secure: true,
            sameSite: "None",
          });
        }
        router.push(`${redirectPath}`);
        setAccessToken(data?.data?.accessToken);
        toast.success("Login Successful.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="email"
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
