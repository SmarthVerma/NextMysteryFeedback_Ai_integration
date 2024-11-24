import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { ApiError, ApiResponse } from "@/lib/ApiResponse_Errors";
import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();
  const verifyCode =  Math.floor(100000 + Math.random() * 900000).toString();

  let responseData; // used to send userDato to apiResponse

  try {
    const { username, email, password } = await request.json();

    // Check for existing user by username
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return new ApiError(
        409,
        "User with this username already exists"
      ).getResponse();
    }

    // Check for existing user by email
    const existingUserByEmail: User | null = await UserModel.findOne({ email });

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return new ApiError(
          400,
          "User already exists with this email"
        ).getResponse();
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.username = username;
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 360000);

        responseData = await existingUserByEmail.save();
      }
    } else {
      // Create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const currentTime = new Date();
      const expiryTime = new Date(
        currentTime.setHours(currentTime.getHours() + 1)
      );
      const usernameLower = username as string
      console.log({usernameLower})
      const newUser = new UserModel({
        username: usernameLower.toLowerCase(),
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryTime,
        isVerified: false,
        isAcceptingMessage: true,
        message: [],
      });

      responseData = await newUser.save();
    }

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      responseData._id,
      responseData.verifyCode as string
    );

    console.log({emailResponse})

    if (!emailResponse.success) {
      return new ApiError(500, emailResponse.message).getResponse();
    }

    return new ApiResponse(
      200,
      responseData,
      "User registered successfully. Please verify your email"
    ).getResponse();
  } catch (error: any) {
    console.error("Error registering user", error);
    return new ApiError(500, `Error registering user ${error.message}`).getResponse();
  }
}
