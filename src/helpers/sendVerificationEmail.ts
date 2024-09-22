import { resend } from "../lib/resend";
import VerificationEmail from "@/../emails/Verification_email";
import { ApiResponse } from "../types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Hello world",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "Verifcation email sent successfully" };
  } catch (emailError) {
    console.error("Error sending verfication email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
