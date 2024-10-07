import { useMutation } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";
import {
  VerificationApiResult,
  VerificationSuccessData,
  verifySchema,
} from "@/schemas/verifySchema";

export type VerificationCodeData = z.infer<typeof verifySchema>;

const verifyCode = async (
  data: VerificationCodeData
): Promise<AxiosResponse<VerificationApiResult<VerificationSuccessData>>> => {
  console.log("Submitting data for verification:", data);
  const url = `/api/verifycode/`;
  return await axios.post(url, data);
};

export const useVerifyCode = () => {
  const { toast } = useToast();

  return useMutation(
    (data: VerificationCodeData) => verifyCode(data), // Mutation function
    {
      onSuccess: (data) => {
        console.log("Verification successful:", data);
        if (data.data.message) {
          toast({
            title: data.data.message,
          });
        }
      },
      onError: (error: AxiosError | any) => {
        console.log("Error during verification:", error);

        const errorMessage =
          error?.response?.data?.message || "An unexpected error occurred.";

        toast({
          title: errorMessage,
          variant: "destructive",
        });
      },
    }
  );
};
