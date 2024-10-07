import { useMutation, UseMutationResult } from "react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { signInSchema } from "@/schemas/signInSchema"; // Update with SignIn schema
import type { z } from "zod";
import { useRouter } from "next/navigation";
import { ApiResult, ApiError } from "@/schemas/oneForAll_ApiResponse";

type SignInSchemaType = z.infer<typeof signInSchema>; // Define type for Sign-In schema

// Define the async function to call the sign-in API
const signin = async <T> (data: SignInSchemaType): Promise<ApiResult<T>> => {
  const url = `/api/signin`; // Update API endpoint to sign-in
  const response: AxiosResponse<ApiResult<T>> = await axios.post(url, data);
  return response.data; // Return only the `data` from the Axios response
};

export const useSignin = <T> (): UseMutationResult<
  ApiResult<T>,
  AxiosError, 
  SignInSchemaType 
> => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation(
    (data: SignInSchemaType) => signin(data), // Mutation function
    {
      onSuccess: (data) => {
        if (data.success) {
          toast({
            title: "Sign-in successful",
            description: "Welcome back!",
          });
          router.replace("/dashboard"); // Redirect to the dashboard on success
        } else {
          toast({
            title: "Sign-in failed",
            description: data.message,
            variant: "destructive",
          });
        }
      },
      onError: (error: AxiosError<ApiError>) => {
        const errorMessage =
          error?.response?.data?.message || "Invalid email or password!";
        toast({
          title: "Sign-in failed",
          description: errorMessage,
          variant: "destructive",
        });
      },
    }
  );
};
