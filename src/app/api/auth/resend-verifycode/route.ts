import { ApiError, ApiResponse } from "@/lib/ApiResponse_Errors";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail"; // Assume you have a utility for sending emails

export async function POST(request: Request) {
  // Connect to the database
  await dbConnect();

  try {
    const { username } = await request.json();
    console.log(username);

    const decodedUsername = decodeURIComponent(username);
    
const user = await UserModel.findOne({
  $or: [
    { username: decodedUsername }, 
    { email: decodedUsername }
  ]
});

    if (!user) {
      return new ApiError(404, "User not found").getResponse();
    }

    // Generate a new verification code
    const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // Example: generate a 6-digit code
    const newExpiryDate = new Date();
    newExpiryDate.setHours(newExpiryDate.getHours() + 1); // Set the expiry date to 1 hour from now

    // Update the user's verification code and expiry date in the database
    user.verifyCode = newVerificationCode;
    user.verifyCodeExpiry = newExpiryDate;
    await user.save();

    // Send the new verification code to the user's email
    const emailResponse = await sendVerificationEmail(
      user.email,
      user._id,
      newVerificationCode,
    );

    console.log('The email Response ', emailResponse)

    return new ApiResponse(200, {}, "A new verification code has been sent to your email").getResponse();
  } catch (error) {
    console.error("Error resending verification email:", error);
    return new ApiError(500, "Error resending verification email").getResponse();
  }
}