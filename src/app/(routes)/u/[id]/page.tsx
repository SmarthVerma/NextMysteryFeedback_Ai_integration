import Navbar from "@/components/tier1/Navbar";
import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/models/user.model";
import mongoose from "mongoose";
import Head from "next/head";
import Link from "next/link";

interface Params {
  id: string;
}


export const metadata = {
  title: "Home - Your Website Name",
};

export default async function Page({ params }: { params: Params }) {
  await dbConnect();
  const id = params.id; // Extract the ID from params
  let objectId;
  try {
    objectId = new mongoose.Types.ObjectId(id);
  } catch (error) {
    objectId = undefined
  }
  const user = await UserModel.findById(objectId) as User

  const title = user ? 'User Found' : 'User Not Found';
  const isAccepting = user?.isAcceptingMessage
  console.log({ isAccepting })
  console.log('this is test ', user)
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center   text-white">
        <div className="text-center p-8 bg-opacity-90 max-h-[600px] rounded-lg shadow-xl max-w-lg w-full">
          {!user ? (
            <div className="flex flex-col justify-center  items-center">
              <div className="max-sm:w-[200px] md:w-[300px] pointer-events-none select-none">
                <img src="https://media.istockphoto.com/id/637127444/vector/duckling-under-the-weather-cute-character-sticker.jpg?s=612x612&w=0&k=20&c=PHIIqpb_yBKz2TygmPCBMcFTgsodEPdVAIVUlpUhw10=" alt="er" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-[#1E293B] mb-4">User Not Found</h1>
                <p className="text-lg text-gray-700 mb-6">We {"couldn't"} find the user you are looking for. Please check the url and try again.</p>
                <a href="/" className="inline-block px-6 py-3 bg-[#1E293B] text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition duration-300">Go Back to Home</a>
              </div>
            </div>
          ) : (
            <div className="text-3xl font-semibold text-[#1E293B]">{isAccepting ? (
              <main className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full text-center">
                  <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                    User Has Not Allowed Incoming Messages
                  </h1>
                  <p className="text-gray-600 mb-6">
                    The user you are trying to message has disabled the ability to receive
                    incoming messages at this time.
                  </p>
                  <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                  >
                    Go Back to Home
                  </Link>
                </div>
              </main>
            ) : (
              <>Welcome, {user.username}!</>)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}