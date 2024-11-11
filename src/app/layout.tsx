// app/layout.tsx
import './globals.css';
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import ClientComponent from "./ClientComponent";
import { Session } from "next-auth"; // Import the extended Session type
import { authOptions } from './api/auth/[...nextauth]/options';


// Server-side component ** FIRST THIS WILL HAPPEEN THEN IT WILL RENDER
export default async function RootLayout({ children }: { children: ReactNode }): Promise<JSX.Element> {
  const session: Session | null = await getServerSession(authOptions); // Fetch session on server 
  return (

      <html lang="en">
        <head>
          <title>MysteryMessage</title>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body className="antialiased">
          <ClientComponent session={session}>
            {children}
          </ClientComponent>
        </body>
      </html>
  );
}