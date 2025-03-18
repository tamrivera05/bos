"use client";

import { SWRConfig } from "swr";
import { swrFetcher } from "@/lib/swrFetcher"; // Assuming swrFetcher is defined in swrFetcher.ts

interface SWRProviderProps {
  children: React.ReactNode;
}

function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig value={{ fetcher: swrFetcher }}>
      {children}
    </SWRConfig>
  );
}

export default SWRProvider;
