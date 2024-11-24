// app/page.tsx (or another server-side component file)
import Navbar from "@/components/tier1/Navbar";
import UserStatus from "@/components/UserVerificationStatus";
import { User } from "next-auth";
import React, { ReactNode } from "react";

async function getData(id: string) {
    const res = await fetch(`http://localhost:3000/api/auth/get-user/${id}`, {
        cache: "no-store", // Use "no-store" for dynamic data, "force-cache" for static data
    });

    if (!res.ok) {
        return false;
    }

    return res.json();
}

interface Params {
    id: string
}
interface UserResponse {
    statusCode: number
    data: User
}

export default async function Page({ children, params }: { children: ReactNode, params: Params }) {
    const user = await getData(params.id) as UserResponse
    const isVerified = user?.data?.isVerified
    const username = user?.data?.username

    console.log({ isVerified })

    return (
        <>
            <main className="min-h-screen bg-gray-50">
                <div className=" mx-auto">
                    <UserStatus isVerified={isVerified} username={username} children={children} />
                </div>
            </main>
        </>
    );
}