"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { loginSchema, type LoginFormValues } from "./log-in-schema";

export const LogInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginFormValues) {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log(values);
      // For demo purposes, hardcoded credentials check
      if (
        values.email === "admin@example.com" &&
        values.password === "password123"
      ) {
        // Successful login
        console.log("Login successful", values);
        // Navigate to dashboard
        router.push("/dashboard");
      } else {
        // Failed login
        console.error("Invalid credentials");
        form.setError("root", {
          message: "Invalid email or password",
        });
      }
      setIsLoading(false);
    }, 1000);
  }

  return (
    <div className="mx-auto flex w-full flex-col gap-10 md:px-14 lg:px-44">
      <div>
        <div className="text-2xl font-bold lg:text-4xl text-[#1F2937]">Login</div>
        <div className="pt-2 font-normal text-gray-600 lg:text-lg">
          Enter your email and password to access your account
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1F2937]">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1F2937]">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="link"
                className="px-0 font-normal"
                onClick={() => {}}
              >
                Forgot password?
              </Button>
            </div>
          </div>

          {form.formState.errors.root && (
            <div className="text-sm text-red-500">
              {form.formState.errors.root.message}
            </div>
          )}

          <Button type="submit" className="w-full bg-[#1F2937] " disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Button
              variant="link"
              type="button"
              className="p-0 font-normal"
              onClick={() => router.push("/sign-up")}
            >
              Sign up
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LogInForm;
