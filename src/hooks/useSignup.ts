import { useMutation, UseMutationResult } from "react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { SignupError, signUpSchema } from "@/schemas/signUpSchema";
import type { z } from "zod";
import { SignupApiResult, SignupSuccessData } from "@/schemas/signUpSchema"; // Adjust the import based on your project structure
import { useRouter } from "next/navigation";

type SignUpSchemaType = z.infer<typeof signUpSchema>;

const signup = async (
  data: SignUpSchemaType
): Promise<SignupApiResult<SignupSuccessData>> => {
  const url = `/api/signup`;
  const response: AxiosResponse<SignupApiResult<SignupSuccessData>> =
    await axios.post(url, data);
  return response.data; // Return only the `data` from the Axios response
};

export const useSignup = (): UseMutationResult<
  SignupApiResult<SignupSuccessData>, // Response type from API
  AxiosError, // Error type
  SignUpSchemaType // Variables type (input)
> => {
  const { toast } = useToast();
  const router = useRouter()
  return useMutation(
    (data: SignUpSchemaType) => signup(data), // Mutation function
    {
      onSuccess: (data) => {
        if (data.success) {
          toast({
            title: "Signup successful",
            description: "Your username is available!",
          });
          const username = data.data.username
          router.replace(`/verift/${username}`)
        } else {
          toast({
            title: "Signup failed",
            description: data.message,
            variant: 'destructive'
          });
        }
    
      },
      onError: (error: AxiosError<SignupError>) => {
        const errorMessage =
          error?.response?.data?.message || "This username is already taken!";
        toast({
          title: "Signup failed",
          description: errorMessage,
          variant: 'destructive'
        });
      },
    }
  );
};
