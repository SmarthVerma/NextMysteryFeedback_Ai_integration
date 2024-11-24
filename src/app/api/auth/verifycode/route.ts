import { ApiError, ApiResponse } from "@/lib/ApiResponse_Errors";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";

export async function POST(request: Request) {
  // Connect to the database
  await dbConnect();

  try {
    const { id, code } = await request.json();
    console.log(id, code);
    const decodedUsername = decodeURIComponent(id);
    const user = await UserModel.findOne({ _id: decodedUsername });

    if (!user) {
      return new ApiError(404, "User not found").getResponse();
    }

    // Check if the code is correct and not expired
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user?.verifyCodeExpiry as Date) > new Date();
    console.log(user.verifyCode);
    console.log(isCodeValid, isCodeNotExpired);

    if (isCodeValid && isCodeNotExpired) {
      // Update the user's verification status and clear the verification data
      user.isVerified = true;
      user.verifyCode = null; // Clear the verification code
      user.verifyCodeExpiry = null; // Clear the expiry date
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
  } catch (error: any) {
    console.error("Error verifying user:", error.message);
    return new ApiError(500, "Error verifying user").getResponse();
  }
}