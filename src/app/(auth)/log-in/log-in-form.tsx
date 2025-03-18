"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/user-store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { loginSchema, type LoginFormValues } from "./log-in-schema";

export const LogInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    form.clearErrors(); // Clear previous errors

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: values.login,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        toast("Login successful");
        localStorage.setItem("authToken", data.data.authorization.token);
        useUserStore.getState().setUser(data.data.user);
        router.push("/directory");
      } else {
        // Login failed
        console.log("Login failed", data);
        form.setError("root", {
          message:
            data.error?.message ||
            "Login failed. Please check your credentials.",
        });
      }
    } catch (error) {
      console.log("Login error:", error);
      form.setError("root", {
        message:
          "Login failed. Please check your credentials and network connection.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col gap-10 md:px-14 lg:px-44">
      <div>
        <div className="text-2xl font-bold text-[#1F2937] lg:text-4xl">
          Login
        </div>
        <div className="pt-2 font-normal text-gray-600 lg:text-lg">
          Enter your username and password to access your account
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1F2937]">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
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
                onClick={() => router.push("/forgot-password")}
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

          <Button
            type="submit"
            className="w-full bg-[#1F2937]"
            disabled={isLoading}
          >
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
