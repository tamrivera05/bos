"use server";

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { checkAuthenticationStatus } from "@/lib/auth";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const isAuthenticated = await checkAuthenticationStatus();

  if (isAuthenticated) {
    redirect("/");
  }

  return (
    <div className=" mx-auto h-screen flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
