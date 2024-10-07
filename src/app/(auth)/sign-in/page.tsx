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

export default function Page() {
  const { toast } = useToast();
  const router = useRouter();
  const [loginLoader, setLoginLoader] = useState(false);

  // React Hook Form setup
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

      console.log("this the result of signIn from nextAuth", result);

      if (result?.url) {
        router.replace("/dashboard");
      }
      if (result?.error) {
        toast({
          title: "Login failed",
          description: `Incorrect username or password, ${result.error}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("ERROR IN CATCH", error);
    } finally {
      setLoginLoader(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-700"
        >
          {/* Heading */}
          <h1 className="text-center text-2xl font-bold mb-4 text-indigo-400">
            Welcome to <span className="tracking-wider">Anonymous Feedbacks</span>
          </h1>

          {/* Identifier Field (Username/Email) */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-indigo-400 font-medium">
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username or email"
                    {...field}
                    className="border-gray-600 bg-gray-700 text-white rounded-md focus:border-gray-500 focus:ring focus:ring-gray-600"
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
                <FormLabel className="text-indigo-400 font-medium">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                    className="border-gray-600 bg-gray-700 text-white rounded-md focus:border-gray-500 focus:ring focus:ring-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-all duration-200"
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
              <Link href="/signup" className="text-indigo-400 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}