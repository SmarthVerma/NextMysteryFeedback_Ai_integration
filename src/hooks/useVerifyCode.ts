import { useMutation } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
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
  console.log('this is the data', data)
  const url = `/api/verify/${data.username}`;
  return await axios.post(url, data);
};

export const useVerifyCode = () => {
  const { toast } = useToast();
  console.log('whats going on herer',)
  
  return useMutation(
    (data: VerificationCodeData) => verifyCode(data), // Mutation function
    {
      onSuccess: (data) => {
        console.log('check1',)
        if (data.data.message)
          toast({
            title: data.data.message,
          });
      },
      onError: (error: AxiosError | any) => {
            console.log("check2");
        const errorMessage =
          error?.response?.data?.message || "This username is already taken!";
        toast({
          title: errorMessage,
          variant: "destructive",
        });
      },
    }
  );
};
