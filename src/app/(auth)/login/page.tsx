import { LoginForm } from "@/components/modules/Auth/LogInForm";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: `Selim Portfolio - Log In`,
  description: "Selim Portfolio Login Page",
};

const LogInPage = ({
  searchParams,
}: {
  searchParams: { redirect?: string };
}) => {
  const redirect = searchParams.redirect || "/dashboard";
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm redirectPath={redirect} />
      </div>
    </div>
  );
};

export default LogInPage;
