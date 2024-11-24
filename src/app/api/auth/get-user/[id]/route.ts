import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { z } from "zod";
import { ApiResponse, ApiError } from "@/lib/ApiResponse_Errors"; // Your response utility

// Define schema for validating the dynamic `id` parameter
const userIdSchema = z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid User ID format");

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
console.error('!!!!!!!!!!!!REACHED!!!!!!!!!!!!!',)
  try {
    const { id } = params;

console.log('in route.ts get-user', id)
    const user = await UserModel.findById(id);

    if (!user) {
      return NextResponse.json(
        new ApiResponse(
          404,
          null,
          "User not found"
        ),
        { status: 404 }
      );
    }

    // Return the user object
    return NextResponse.json(
      new ApiResponse(
        200,
        user,
        "User found"
      ),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return NextResponse.json(
      new ApiError(500, "Internal server error"),
      { status: 500 }
    );
  }
}