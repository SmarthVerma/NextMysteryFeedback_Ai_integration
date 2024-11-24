"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryDevtools } from "react-query/devtools";
import { Session } from "next-auth";
import { ReactNode, useMemo } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store/store";
import { SessionProvider } from "next-auth/react";
// import StoreSessionRedux from "@/context/StoreSessionRedux";

interface ClientComponentProps {
  session: Session | null;
  children: ReactNode;
}

export default function ClientComponent({
  session,
  children,
}: ClientComponentProps) {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
            <Toaster />
            {children}
            {process.env.NODE_ENV === "development" && (
              <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-right"
              />
            )}
        </SessionProvider>
      </QueryClientProvider>
    </Provider>
  );
}
