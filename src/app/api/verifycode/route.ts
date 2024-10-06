import { ApiError, ApiResponse } from "@/lib/ApiResponse_Errors";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";

export async function POST(request: Request) {
  // Connect to the database
  await dbConnect();

  try {
    console.log('hgereyry')
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return new ApiError(404, "User not found").getResponse();
    }

    // Check if the code is correct and not expired
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      // Update the user's verification status
      user.isVerified = true;
      await user.save();

      return new ApiResponse(
        200,
        {},
        "Account verified successfully"
      ).getResponse();
    } else if (!isCodeNotExpired) {
      // Code has expired
      return new ApiError(
        400,
        "Verification code has expired. Please sign up again to get a new code."
      ).getResponse();
    } else {
      // Code is incorrect
      return new ApiError(400, "Incorrect verification code").getResponse();
    }
  } catch (error) {
    console.error("Error verifying user:", error);
    return new ApiError(500, "Error verifying user").getResponse();
  }
}
