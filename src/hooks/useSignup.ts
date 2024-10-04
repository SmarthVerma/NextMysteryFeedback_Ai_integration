import { useMutation, UseMutationResult } from "react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { signUpSchema } from "@/schemas/signUpSchema";
import type { z } from "zod";
import { SignupApiResult, SignupSuccessData } from "@/schemas/signUpSchema"; // Adjust the import based on your project structure

type SignUpSchemaType = z.infer<typeof signUpSchema>;

const signup = (
  data: SignUpSchemaType
): Promise<AxiosResponse<SignupApiResult<SignupSuccessData>>> => {
  const url = `/api/signup`;
  return axios.post<SignupApiResult<SignupSuccessData>>(url, data);
};

export const useSignup = (): UseMutationResult<
  SignupApiResult<SignupSuccessData>, // Response type from API
  AxiosError, // Error type
  SignUpSchemaType // Variables type (input)
> => {
  const { toast } = useToast();
  return useMutation<
    SignupApiResult<SignupSuccessData>,
    AxiosError,
    SignUpSchemaType
  >(signup, {
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Signup successful",
          description: "Your username is available!",
        });
      } else {
        toast({
          title: "Signup failed",
          description: data.message,
        });
      }
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        error?.response?.data?.message || "This username is already taken!";
      toast({
        title: "Signup failed",
        description: errorMessage,
      });
    },
  });
};
