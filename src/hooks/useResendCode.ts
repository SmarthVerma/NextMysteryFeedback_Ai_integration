import { useMutation } from "react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

// Function to resend the verification code
const resendVerificationCode = (username: string) => {
  const url = `/api/auth/resend-verifycode`; // Replace with your actual endpoint
  return axios.post(url, { username });
};

// Custom hook to resend verification code
export const useResendVerificationCode = () => {
  const { toast } = useToast(); // For toast notifications
  return useMutation(
    (username: string) => resendVerificationCode(username),
    {
      onSuccess: () => {
        toast({
          description: "Verification code resent successfully!",
          variant: "default",
        });
      },
      onError: (err: any) => {
        console.error("Error resending verification code:", err);

        if (axios.isAxiosError(err)) {
          const errorMessage =
            err.response?.data?.message || "An unknown error occurred";
          toast({
            description: `Error: ${errorMessage}`,
            variant: "destructive",
          });
        } else {
          toast({
            description: "An unexpected error occurred",
            variant: "destructive",
          });   
        }
      },
    }
  );
};