"use client";

import { useToast } from "@/hooks/use-toast";
import { useUsernameCheck } from "@/hooks/useUsernameCheck";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceValue } from "usehooks-ts";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import { Button } from "@/components/ui/button";
import { useSignup } from "@/hooks/useSignup";
import { useRouter } from "next/navigation";
import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Link from "next/link"; // Import Link for navigation

export default function Page() {
  const [username, setUsername] = useState("");
  const [debouncedUsername] = useDebounceValue(username, 300);
  const { toast } = useToast();
  const router = useRouter();

  // Username check API call
  const {
    data: userChecker,
    isLoading: userCheckLoader,
    isError: isUserError,
    error,
  } = useUsernameCheck({ username: debouncedUsername });

  useEffect(() => {
    if (debouncedUsername && userChecker) {
      toast({ title: "Username checked!" });
    }
  }, [debouncedUsername, userChecker, toast]);

  // React Hook Form setup
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutate: signup, isLoading: signUpLoader } = useSignup();

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    await signup(data);
    router.replace(`/verify/${data.username}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        >
          {/* Heading */}
          <h1 className="text-center text-2xl font-bold mb-4 text-gray-800">
            Welcome to Anonymous Feedbacks
          </h1>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-bold">
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    {...field}
                    className="border border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => {
                      field.onChange(e);
                      setUsername(e.target.value);
                    }}
                  />
                </FormControl>
                <div className="flex items-center space-x-2 mt-1">
                  {userCheckLoader ? (
                    <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                  ) : (
                    <span
                      className={`text-gray-700 font-semibold ${
                        userChecker?.data.message === "Username is unique"
                          ? "text-green-500"
                          : "text-red-400"
                      }`}
                    >
                      {userChecker?.data.message}
                    </span>
                  )}
                  {isUserError && (
                    <span className="text-red-500 font-semibold">
                      {error.response?.data?.message}
                    </span>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-bold">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                    className="border border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-bold">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                    className="border border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            disabled={signUpLoader}
          >
            {signUpLoader ? (
              <>
                {" "}
                <Loader2 className="animate-spin" /> "Submitting..."{" "}
              </>
            ) : (
              "Submit"
            )}
          </Button>

          {/* Already have an account message */}
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
