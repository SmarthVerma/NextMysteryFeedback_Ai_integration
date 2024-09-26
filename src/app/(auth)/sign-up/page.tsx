"use client";

import { useUsernameCheck } from "@/hooks/useUsernameCheck";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceValue } from "usehooks-ts";

export default function page() {
  const [username, setUsername] = useState("");
  const [debouncedUsername, setValue] = useDebounceValue(username, 500);

  console.log("Debounced Username:", debouncedUsername);

 const { data, isLoading } = useUsernameCheck({ username: 'Smarth'});
  console.log({data, isLoading})
  useEffect(() => {
    if (debouncedUsername) {
      console.log({ data, isLoading });
    }
  }, [debouncedUsername]);

  // React Hook Form setup
  const form = useForm();

  return (
    <div>
      <form>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username"
        />
      </form>
    </div>
  );
}
