import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { User } from "next-auth";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/lib/ApiResponse_Errors"; // Import your ApiResponse utility
import { ApiError } from "@/lib/ApiResponse_Errors";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !user) {
    return new ApiResponse(401, null, "Not authenticated").getResponse();
  }

 
 const userId = new mongoose.Types.ObjectId(user._id);

}
