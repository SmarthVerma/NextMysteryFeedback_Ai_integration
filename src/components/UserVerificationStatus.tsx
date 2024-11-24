// components/UserStatus.tsx
interface UserStatusProps {
    isVerified: boolean;
    username?: string;
    children: ReactNode
}

import sadDuck from "@/app/assets/sadDucky.png";
import happyDuck from "@/app/assets/happyDucky.png";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

export default function UserStatus({ isVerified, username, children }: UserStatusProps) {
    if (!username) {
        return (
            <div className="flex flex-col space-y-4 items-center justify-center min-h-screen text-center">
                <Image
                    src={sadDuck} // Pass the imported image object
                    alt="Sad Duck" // Required for accessibility
                    width={120} // Required if not using `layout="fill"`
                    height={120}
                    className="rounded-lg mix-blend-multiply"
                />

                <h1 className="text-2xl font-semibold text-gray-800">User Not Found</h1>
                <p className="text-gray-600">We couldn't find the user. Please check the URL and try again.</p>
                <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                    Go Back to Home
                </Link>

            </div >
        );
    }
    return isVerified ? (
        <div className="text-center min-h-screen flex flex-col justify-center items-center py-20 mt spacey">
            <div className="flex justify-center">
                <Image src={happyDuck} alt="happyduck" width={140} className="rounded-lg" />
            </div>
            <h1 className="text-3xl font-semibold text-gray-800">Already Verified</h1>
            <p className="text-gray-600">
                Your account {username} is already verified. Enjoy using our platform!
            </p>
        </div>
    ) : (
        <>
            {children}
        </>
    );
}