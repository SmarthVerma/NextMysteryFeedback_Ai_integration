"use client";

import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { VerifyFirst_Error_Message } from "@/constants";
import { useMutation } from "react-query";
import { useResendVerificationCode } from "@/hooks/useResendCode";

export default function Signin() {
  const { toast } = useToast();
  const router = useRouter();
  const [loginLoader, setLoginLoader] = useState(false);
  const { mutate: resendCode, isLoading } = useResendVerificationCode();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setLoginLoader(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: data.username,
        password: data.password,
      });
      if (result?.url) {
        router.replace("/dashboard");
      }
      if (result?.error as string) {
        if (result?.error?.startsWith(VerifyFirst_Error_Message)) {
          const res = await resendCode(data.username)
          console.log('this is res',)
          router.replace(`/verify/${result?.error?.split('id:')[1].trim()}`);
        }
        toast({
          title: "Login failed",
          description: `${result?.error || "Invalid password or username"}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("ERROR IN CATCH in signin", error);
    } finally {
      setLoginLoader(false);
    }
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
            Welcome to <span className="tracking-wide">Anonymous Feedback</span>
          </h1>

          {/* Identifier Field (Username/Email) */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  Username or Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username or email"
                    {...field}
                    className="border-gray-300 bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition duration-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                    className="border-gray-300 bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition duration-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-[#1E293B] text-white py-3 rounded-md hover:bg-indigo-600 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            disabled={loginLoader}
          >
            {loginLoader ? (
              <>
                <Loader2 className="animate-spin mr-2" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>

          {/* Already have an account message */}
          <div className="text-center mt-4">
            <p className="text-gray-500">
              Don't have an account?{" "}
              <Link href="/sign-up" className="text-indigo-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}