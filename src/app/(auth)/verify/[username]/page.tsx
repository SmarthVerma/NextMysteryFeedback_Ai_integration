"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useVerifyCode } from "@/hooks/useVerifyCode";
import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Type inferred from the verification schema
type VerificationCodeData = z.infer<typeof verifySchema>;

function Page() {
  // UseParams for extracting username from the URL
  const { username } = useParams<{ username: string }>();
  const {toast} = useToast()
  const { mutate: verifyCode, isLoading } = useVerifyCode();
  console.log(isLoading)
  // Setting up the form with React Hook Form and Zod schema
  const form = useForm<VerificationCodeData>({
    resolver: zodResolver(verifySchema),
  });

  // Function to handle form submission
  const onSubmit = (data: VerificationCodeData) => {
 try {
     verifyCode({ username, code: data.code });
 } catch (error) {
      console.log(`cant find the rrror`,)
 }
    toast({
      title: "Verification Code Submitted",
      description: `The verification code for ${username} has been submitted.`,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <h1 className="text-xl font-semibold mb-4 text-gray-800">
        Verify Your Account
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6 space-y-6 border border-gray-300"
        >
          <FormField
            name="code"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-gray-700">
                  Verification Code
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your code"
                    className="border-gray-400 rounded-md focus:border-gray-600 focus:ring focus:ring-gray-300"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition duration-200"
          >
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Page;
