import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  _id: mongoose.Types.ObjectId | string // Add _id field explicitly
  content: string;
  createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string | null;
  verifyCodeExpiry: Date| null;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  message: Message[];
}

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifyCode: {
    type: String,
    default: null,
  },
  verifyCodeExpiry: {
    type: Date,
        default: null,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: false,
  },
  message: [
    {
      type: messageSchema,
    },
  ],
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', userSchema)

export default UserModel