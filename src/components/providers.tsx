"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/lib/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
      <StoreProvider>
        {children}
        <Toaster position="bottom-center" richColors closeButton />
      </StoreProvider>
    </ThemeProvider>
  );
}
