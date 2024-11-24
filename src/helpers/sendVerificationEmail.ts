import { resend } from "../lib/resend";
import VerificationEmail from "@/../emails/Verification_email";
import { ApiResponse } from "../types/ApiResponse";

export async function sendVerificationEmail(
email: string, _id: unknown, verifyCode: string): Promise<ApiResponse> {
  try {
    console.log('to email', email)
    const res = await resend.emails.send({  
      from: "feedback-no-reply@juitsolan.xyz",
      to: email,
      subject: "Verification email for your account",
      react: VerificationEmail({ _id, otp: verifyCode }),
    });
    console.log({res})
    return { success: true, message: "Verifcation email sent successfully" };
  } catch (emailError) {
    console.error("Error sending verfication email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
