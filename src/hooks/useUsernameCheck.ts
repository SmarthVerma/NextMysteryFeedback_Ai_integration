import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

// Function to check the username
const usernameCheck = (username: string) => {
  const url = `/api/check-username?username=${username}`;
  return axios.get(url);
};

// Custom hook to check username availability
export const useUsernameCheck = ({ username }: { username: string }) => {
  const { toast } = useToast(); // Uncommented to use toast notifications
  return useQuery(["usernameCheck", username], () => usernameCheck(username), {
    onError: (err) => {
      console.error("Error fetching username:", err);

      if (axios.isAxiosError(err)) {
        // Check if the error response exists
        const errorMessage =
          err.response?.data?.message || "An unknown error occurred";
        toast({
          description: `Error: ${errorMessage}`, // Show error message in toast
        });
      } else {
        toast({
          description: `An unexpected error occurred`, // Handle unexpected errors
        });
      }
    },
    select: (data) => data.data, // Return only the data from the response
    enabled: !!username, // Only run the query if username is truthy
  });
};
