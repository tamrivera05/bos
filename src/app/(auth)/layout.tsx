"use server";

import { cookies } from "next/headers";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (authToken) {
    redirect("/");
  }

  return <div className="container mx-auto px-4 h-screen flex items-center justify-center">
    {children}
  </div>;
};

export default AuthLayout;
