"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  const userData = useSelector((state: RootState) => state.session);

  const [onLogin, setOnLogin] = useState(false);

  const { data, status } = useSession()
  useEffect(() => {
    // Update `onLogin` based on the current URL pathname
    setOnLogin(pathname?.endsWith("/sign-in") ?? false);
  }, [pathname]);

  return (
    <nav className="bg-slate-800 fixed left-0 right-0 p-4 shadow-md">
      <div className=" mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold hover:text-gray-300">
          Mystery Feedback
        </Link>

        {data ? (
          <>
            <div className="space-x-4">

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
            </div>
          </>
        ) : (
          <Link href={onLogin ? "/sign-up" : "/sign-in"}>
            <Button className="px-6 bg-indigo-500 rounded-xl font-bold">
              {onLogin ? "Sign up" : "Log in"}
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;