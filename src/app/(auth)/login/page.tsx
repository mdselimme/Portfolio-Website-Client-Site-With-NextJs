import { LoginForm } from "@/components/modules/Auth/LogInForm";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: `Selim Portfolio - Log In`,
  description: "Selim Portfolio Login Page",
};

const LogInPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
};

export default LogInPage;
