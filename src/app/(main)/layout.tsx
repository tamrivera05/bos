"use client";

import type React from "react";
import { MainNav } from "../../components/MainNav/mainNav";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body className="relative flex min-h-screen flex-col">
          <MainNav />
          <main className="flex-1">{children}</main>
        </body>
    </html>
  );
}
