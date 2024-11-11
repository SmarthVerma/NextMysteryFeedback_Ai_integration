import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux"; // Assuming you're using Redux for state management
import { setSession } from "@/lib/store/features/session/sessionSlice"; // Adjust the import to your actual action

function StoreSessionRedux({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  console.log({session})

  useEffect(() => {
    if (session) {
      dispatch(setSession(session)); // Dispatch the session data to Redux store
    }
  }, [session, dispatch]);
  return <>{children}</>; // Render children or any other necessary components
}

export default StoreSessionRedux;
