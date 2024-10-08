import { z } from "zod";

// Validation schema for sign-up data


export const usernameValidation = z
  .string()
  .min(4, "Username must be at least 4 characters")
  .max(20, "Username cannot be more than 20 characters")
  .refine(
    (value) => {
      if (/\s/.test(value)) {
        return false; // Return false if there are spaces
      }
      if (!/^[a-zA-Z0-9]+$/.test(value)) {
        return false; // Return false if there are special characters
      }
      return true; // Return true if both checks are passed
    },
    {
      message: "Username must not contain spaces or special characters",
    }
  );
export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(25, { message: "Password cannot exceed 25 characters" }),
});

// Interface for the data returned on successful sign-up
export interface SignupSuccessData {
  userId: string;
  username: string;
  email: string;
}

// Generic interface for successful API responses
export interface SignupResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

// Interface for error responses
export interface SignupError {
  statusCode: number;
  success: false;
  message: string;
  errors: any[];
}

// Type that represents either a success or error result from the API
export type SignupApiResult<T> = SignupResponse<T> | SignupError;
