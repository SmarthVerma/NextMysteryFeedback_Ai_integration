"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth"; // Import the extended Session type
import { ReactNode } from "react";

interface ClientComponentProps {
  session: Session | null;  // Define the session prop type
  children: ReactNode;      // Define the children prop type
}

export default function ClientComponent({ session, children }: ClientComponentProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Toaster />
        {children}  {/* Render the children prop */}
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        )}
      </SessionProvider>
    </QueryClientProvider>
  );
}