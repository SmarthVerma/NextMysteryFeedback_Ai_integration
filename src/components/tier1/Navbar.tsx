"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import Link from "next/link"; // Import Link for navigation
import { Button } from "../ui/button";
import { User } from "next-auth";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  
  return (
    <nav className="bg-slate-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <a href="/" className="text-white text-2xl font-bold hover:text-gray-300">
          Mystery Feedback
        </a>

        {user ? (
          <>
          <Button>
            <Link href={'/dashboard'}>
            Dashboard
            </Link>
          </Button>
          <Button 
            onClick={() => signOut()} 
            className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
            >
            Log out
          </Button>
            </>  
        ) : (
   <Button className="px-6 bg-indigo-500 rounded-xl font-bold">
    <Link href={'/sign-in'}>Log in</Link>
</Button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;