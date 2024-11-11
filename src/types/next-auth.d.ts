import "next-auth";
import { DefaultSession } from "next-auth";
import { User as UserModel } from "@/models/user.model";

declare module "next-auth" {
  interface User extends UserModel {
  }
  interface Session {
    user: UserModel & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    username?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
  }
}
