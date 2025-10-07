import { LoginForm } from "@/components/modules/Auth/LogInForm";
import React from "react";

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
