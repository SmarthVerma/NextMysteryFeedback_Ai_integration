import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { User } from "next-auth";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/lib/ApiResponse_Errors"; // Import your ApiResponse utility
import { ApiError } from "@/lib/ApiResponse_Errors";

export async function POST(request: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !user) {
    return new ApiResponse(401, null, "Not authenticated").getResponse();
  }

  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );

    if (!updatedUser) {
      return new ApiError(
        404,
        "Updatation failed: user not found"
      ).getResponse();
    }

    return new ApiResponse(200, {
      message: `User's accepting messages status changed to ${acceptMessages}`,
      user: updatedUser, // Optional: Include the updated user data
    }).getResponse();
  } catch (error) {
    console.error("Failed to update user status to accept messages", error);
    return new ApiError(
      500,
      "Failed to update user status to accept messages"
    ).getResponse();
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !user) {
      return new ApiResponse(401, null, "Not authenticated").getResponse();
    }

    const userId = user._id;

    const foundUser: User | null = await UserModel.findById(userId);

    if (!foundUser) {
      return new ApiError(500, "User not found").getResponse();
    }

    return new ApiResponse(200, {
      isAcceptinMessages: foundUser.isAcceptingMessages,
    });
      
  } catch (error) {
    console.error("Failed to get message Status", error);
    return new ApiError(500, "Failed to get message Status").getResponse();
  }
}
