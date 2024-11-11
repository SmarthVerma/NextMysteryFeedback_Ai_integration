import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { User } from "@/models/user.model";

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
              { email: credentials.email },
              { username: credentials.username },
            ],
          });

          if (!user) throw new Error("User not found with this email");
          if (!user.isVerified)
            throw new Error("Please verify your account before log in");

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) throw new Error("Password is incorrect");
          else return user;
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token }) {
      const userId = token._id;
      try {
        const dbUser = (await UserModel.findById(userId)) as User;

        if (token) {
          session.user = dbUser;
        }
      } catch (error) {
        console.log("Error in session callback: ", error);
      }

      return session;
    },
    async jwt({ token, user }) {
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
