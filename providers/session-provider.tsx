"use client";

import { createContext, useContext, useMemo } from "react";
import type { User } from "@/types/user";

interface SessionContextValue {
  user: User | null;
  isAuthenticated: boolean;
}

const SessionContext = createContext<SessionContextValue>({
  user: null,
  isAuthenticated: false,
});

export function SessionProvider({
  children,
  user = null,
}: {
  children: React.ReactNode;
  user?: User | null;
}) {
  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
    }),
    [user],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  return useContext(SessionContext);
}
