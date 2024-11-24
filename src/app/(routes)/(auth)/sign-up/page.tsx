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
// import { useRouter } from "next/navigation";
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

export default function Signup() {
  const [username, setUsername] = useState("");
  const [debouncedUsername] = useDebounceValue(username, 300);
  const { toast } = useToast();
  // const router = useRouter();

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
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200"
        >
          {/* Heading */}
          <h1 className="text-center text-3xl font-bold mb-6 text-[#1E293B]">
            Welcome to{" "}
            <span className="tracking-wide">Anonymous Feedback</span>
          </h1>

          {/* Username Field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1E293B] font-medium">
                  Username <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    {...field}
                    className="border-gray-300 bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition duration-300"
                    onChange={(e) => {
                      field.onChange(e);
                      setUsername(e.target.value);
                    }}
                  />
                </FormControl>
                <div className="flex items-center space-x-2 mt-1">
                  {userCheckLoader ? (
                    <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
                  ) : (
                    <span
                      className={`font-semibold ${userChecker?.data.message === "Username is unique"
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
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1E293B] font-medium">
                  Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                    className="border-gray-300 bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition duration-300"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1E293B] font-medium">
                  Password <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                    className="border-gray-300 bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition duration-300"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-[#1E293B] text-white py-3 rounded-md hover:bg-indigo-600 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            disabled={signUpLoader}
          >
            {signUpLoader ? (
              <>
                <Loader2 className="animate-spin mr-2" /> Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>

          {/* Already have an account message */}
          <div className="text-center mt-4">
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-indigo-500 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
