import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "username must be atleast 2 characters")
  .max(20, "username cannot be more than 20 characters")
  .regex(/^[a-zA-Z0-9]+$/, "username must not contain special character");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(25, { message: "Password exceeding 25 characters" }),
});
