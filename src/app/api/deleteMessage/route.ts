import { ApiError, ApiResponse } from "@/lib/ApiResponse_Errors";
import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  await dbConnect();
  
  try {
    const { messageId } = await req.json();

    // Check user session and authentication token
    const session = await getServerSession(authOptions);
    const token = await getToken({ req });
    console.log({ session, token });

    if (!session) {
      return new ApiError(400, "Not authorized").getResponse();
    }

    // Fetch the user based on session user ID
    const user = await UserModel.findById(session.user._id) as User;

    if (!user) {
      return new ApiError(404, "User not found").getResponse();
    }

    // Filter out the message with the matching messageId
    const messageIndex = user.message.findIndex((msg) => msg._id.toString() === messageId);

    if (messageIndex === -1) {
      return new ApiError(404, "Message not found").getResponse();
    }

    // Remove the message from the array
    user.message.splice(messageIndex, 1);
    
    // Save the updated user document
    await user.save();

    return new ApiResponse(200, user.message, "Message deleted successfully").getResponse();
  } catch (error) {
    console.error("Error while deleting message:", error);
    return new ApiError(500, "Error while deleting message").getResponse();
  }
}