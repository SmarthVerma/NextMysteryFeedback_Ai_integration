import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { User } from "@/models/user.model";
import { ApiError } from "@/lib/ApiResponse_Errors"; // Custom error class for structured error handling



export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.username },
              { username: credentials.username },
            ],
          }) as User;

          if (!user) {
            throw new Error("User not found with this email"); // Custom API error
          }

          if (!user.isVerified) {
            throw new Error(`Please verify your account before login. User ID: ${user._id}`);
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Password is incorrect");
          }

          return user;
        } catch (err: any) {
          // Log error for debugging but don't expose sensitive info
          console.error(err);
          throw new Error(err.message || "An unexpected error occurred");
        }
      },
    }),
    // Add more providers here if needed
  ],
  callbacks: {
    async session({ session, token }: any) {
      const userId = token._id;

      if (userId) {
        try {
          const dbUser = (await UserModel.findById(userId)) as User;
          if (dbUser) {
            session.user = dbUser; // Attach the full user to the session
          }
        } catch (error) {
          console.error("Error in session callback: ", error);
        }
      }
      return session;
    },

    async jwt({ token, user }: any) {
      if (user) {
        const typedUser = user as User;
        token._id = typedUser._id?.toString();
        token.isVerified = typedUser.isVerified;
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};