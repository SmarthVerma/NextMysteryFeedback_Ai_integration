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
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-700"
        >
          {/* Heading with color */}
          <h1 className="text-center text-2xl font-bold mb-4 text-indigo-400">
            Welcome to{" "}
            <span className="tracking-wider">Anonymous Feedbacks</span>
          </h1>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-indigo-400 font-medium">
                  Username <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    {...field}
                    className="border-gray-600 bg-gray-700 text-white rounded-md focus:border-gray-500 focus:ring focus:ring-gray-600"
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
                      className={`font-semibold ${
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
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-indigo-400 font-medium">
                  Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                    className="border-gray-600 bg-gray-700 text-white rounded-md focus:border-gray-500 focus:ring focus:ring-gray-600"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-indigo-400 font-medium">
                  Password <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                    className="border-gray-600 bg-gray-700 text-white rounded-md focus:border-gray-500 focus:ring focus:ring-gray-600"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-all duration-200"
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
              <Link href="/login" className="text-indigo-400 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
