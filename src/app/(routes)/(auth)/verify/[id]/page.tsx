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
import { Rss } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Type inferred from the verification schema
type VerificationCodeData = z.infer<typeof verifySchema>;

function Page() {
  // UseParams for extracting username from the URL
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { mutate: verifyCode, isLoading } = useVerifyCode();

  // Setting up the form with React Hook Form and Zod schema
  const form = useForm<VerificationCodeData>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const input = {
        id,
        code: data.code,
      };
      console.log('this in input: ', {input})
      const res = await verifyCode(input);
      console.log('this is res in verifyCode page', res)
      toast({
        title: "Verification Code Submitted",
        description: `The verification code for ${id} has been successfully submitted.`,
      });
    } catch (error) {
      console.error("Error verifying the code", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      {/* Company title with color */}
      <h1 className="text-3xl font-bold mb-4 text-indigo-400 tracking-wider">
        MysteryFeedback
      </h1>

      {/* Subtitle with color */}
      <h2 className="text-lg font-medium text-gray-300 mb-6">
        <span className="text-indigo-400">Verify</span> Your Account
      </h2>

      {/* Description with color */}
      <p className="text-gray-400 text-center mb-8">
        Enter the <span className="text-indigo-400">verification code</span>{" "}
        sent to your email to verify your account and start enjoying our
        services.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 space-y-6 border border-gray-700"
        >
          <FormField
            name="code"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-indigo-400">
                  Verification Code <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter the 6-digit code"
                    className="border-gray-600 bg-gray-700 text-white rounded-md focus:border-gray-500 focus:ring focus:ring-gray-600"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black font-semibold text-white rounded-md py-2 hover:bg-gray-900 transition-all duration-200"
          >
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </form>
      </Form>

      {/* Footer message */}
      <p className="mt-8 text-gray-500 text-sm">
        Didn’t receive the code? Check your spam folder or{" "}
        <span className="text-indigo-400">request a new one</span>.
      </p>
    </div>
  );
}

export default Page;
