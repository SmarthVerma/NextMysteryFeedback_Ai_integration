"use client";
import { signOut } from "next-auth/react";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "@/lib/store/store";

function Navbar() {
  // const router = useRouter()
  const userData = useSelector((state: RootState) => state.session);
  // const currentUrl = `${window.location.origin}`;
  // console.log("Thisi is base", router.pathname);
  console.log('this is userData', userData.isAuthenticated)

  return (
    <nav className="bg-slate-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-white text-2xl font-bold hover:text-gray-300" 
        >
          Mystery Feedback
        </Link>

        {userData.isAuthenticated ? (
          <>
            <Button>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button
              type="button"
              onClick={() => signOut()}
              className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
            >
              Log out
            </Button>
          </>
        ) : (
          <Button className="px-6 bg-indigo-500 rounded-xl font-bold">
            <Link href="/sign-in">Log in</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
