"use client";

import { SessionProvider } from "next-auth/react";

export function RousBoutiqueProvider({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
