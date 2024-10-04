"use client";

import { useToast } from "@/hooks/use-toast";
import { useUsernameCheck } from "@/hooks/useUsernameCheck";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceValue } from "usehooks-ts";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import { Button } from "@/components/ui/button";
import { useSignup } from "@/hooks/useSignup";

export default function page() {
  const [username, setUsername] = useState("");
  const [debouncedUsername] = useDebounceValue(username, 2500);
  const { toast } = useToast();

  const { data, isLoading } = useUsernameCheck({
    username: debouncedUsername,
  });

  useEffect(() => {
    if (debouncedUsername && data) {
      toast({ title: "Username checked!" });
    }
  }, [debouncedUsername, data, toast]);

  // React Hook Form setup
  const form = useForm<z.infer<typeof signUpSchema>>({
    // jo resolver dega wo yeh infer walli hi hogi
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof signUpSchema>) => {
    const { mutate: signup, isLoading, isError } = useSignup();
    signup(data)
  };

  return (
    <div>
      <form>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username"
        />
      </form>
      <Button
        onClick={() => {
          toast({
            // variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
          console.log("this is being clicked");
        }}
      >
        What happens{" "}
      </Button>
    </div>
  );
}
