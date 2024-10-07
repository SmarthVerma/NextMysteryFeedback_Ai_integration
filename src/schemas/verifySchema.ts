import { z } from "zod";

// Validation schema for verification data
export const verifySchema = z.object({
  username: z.string().min(4, "Username must be at least 4 characters").optional(), // for reactHookForm
  code: z.string().min(6, "Verification code must be at least 6 characters"),
});

// Interface for the data returned on successful verification
export interface VerificationSuccessData {
  message: string; // Message indicating the success of verification
}

// Generic interface for successful API responses
export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

// Interface for error responses
export interface ApiError {
  statusCode: number;
  success: false;
  message: string;
  errors?: any[]; // Optional, can include validation errors or additional info
}

// Type that represents either a success or error result from the API
export type VerificationApiResult<T> = ApiResponse<T> | ApiError;
