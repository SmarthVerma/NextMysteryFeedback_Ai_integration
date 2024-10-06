import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { usernameValidation } from "@/schemas/signUpSchema";
import { z } from "zod";
import { ApiResponse, ApiError } from "@/lib/ApiResponse_Errors"; // Import your ApiResponse utility

const usernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const url = new URL(request.url);
    const getUsername = url.searchParams.get("username");

    // Prepare the queryParam object
    const queryParam = {
      username: getUsername // Default to empty string if null
    };
    console.log(queryParam)


    // Validate with zod
    const result = usernameQuerySchema.safeParse(queryParam);
    console.log("Validation result:", result);
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return new ApiResponse(
        400,
        null,
        usernameErrors.length > 0
          ? usernameErrors.join(", ")
          : "Invalid query parameters"
      ).getResponse();
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return new ApiResponse(
        400,
        null,
        "Username is already taken"
      ).getResponse();
    }

    return new ApiResponse(200, null, "Username is unique").getResponse();
  } catch (error) {
    console.error("Error checking username", error);
    return new ApiError(500, "Error checking username").getResponse();
  }
}
