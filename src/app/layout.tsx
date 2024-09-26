"use client";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>{/* Place other <head> elements here, like meta tags */}</head>
      <body className="antialiased">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Toaster />
            {children}
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </body>
    </html>
  );
}
