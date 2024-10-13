"use client"; // Ensure this is a client component
import React, { lazy, Suspense } from "react";

// Lazy load the MessageCard component
const MessageCard = lazy(() => import("@/components/tier1/MessageCard"));

// Dummy data to pass as props to the MessageCard component
const dummyData = {
  id: "dasd8a131",
  messageContent: "Smaeth can do this",
};

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Use Suspense to handle loading state for the lazy-loaded component */}
        <Suspense fallback={<div>Loading Message Card...</div>}>
          {/* Pass the necessary props to the MessageCard component */}
          <MessageCard {...dummyData} />
        </Suspense>
      </main>
    </div>
  );
}