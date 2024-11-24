"use client";
import MessageCard from "@/components/tier1/MessageCard";
import { Message } from "@/models/user.model";
import { useSession } from "next-auth/react";
import { useState } from "react";

const feedbackData = [
  { id: 1, content: "Great app, love the features!" },
  { id: 2, content: "The user experience could be improved." },
  { id: 3, content: "Awesome UI and responsive design." },
];

const Page = () => {
  const { data, status } = useSession();
  const [isAcceptingMessage, setIsAcceptingMessage] = useState(true);

  // Handle clipboard copy
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`/u/${data?.user._id}`);
      alert("Copied to clipboard!");
    } catch (error) {
      alert("Failed to copy to clipboard.");
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!data?.user) {
    return <div>Please log in to access your account.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen flex flex-col justify-center items-center">
      {/* Welcome Section */}
      <h1 className="text-2xl font-semibold mb-4">Welcome, {data.user.username}!</h1>

      {/* Copy /u/{data.user._id} */}
      <div className="flex items-center mb-4 w-1/2">
        <input
          type="text"
          value={`/u/${data.user._id}`}
          readOnly
          className="p-2 border w-full truncate border-gray-300 rounded-md mr-2 placeholder:select-none pointer-events-none"
        />
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Copy
        </button>
      </div>

      {/* Toggle for Accept Messages */}
      <div className="flex items-center mb-6">
        <label className="mr-4">Accept Messages:</label>
        <label className="switch">
          <input
            type="checkbox"
            checked={isAcceptingMessage}
            onChange={() => setIsAcceptingMessage(!isAcceptingMessage)}
          />
          <span className="slider round"></span>
        </label>
      </div>

      {/* Feedback Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Feedback</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.user?.message.map((feedback: Message) => (
            <div
              key={feedback._id.toString()} // Ensure the key is unique
              className="p-4 border border-gray-200 rounded-md shadow-md"
            >
              <MessageCard id={feedback._id.toString()} messageContent={feedback.content} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;