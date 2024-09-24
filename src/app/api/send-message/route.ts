import { ApiError, ApiResponse } from "@/lib/ApiResponse_Errors";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { Message } from "@/models/user.model";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { username, content } = await req.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) return new ApiError(404, "User with this username not found");

    const newMessage = { content, createdAt: new Date() };

    user.message.push(newMessage as Message);
    await user.save();

    return new ApiResponse(200, newMessage, `Message sent successfully`);
  } catch (error) {
    console.log(`error while sending message to the given username`, error);
    return new ApiError(500, "Error sending message to given username");
  }
}
