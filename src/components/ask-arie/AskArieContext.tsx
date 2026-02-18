"use client";

import { createContext, useContext, useState, useCallback } from "react";

export interface AskArieContextValue {
  /** null = not yet checked, true = healthy, false = unhealthy */
  isHealthy: boolean | null;
  setAskArieHealthy: (healthy: boolean) => void;
}

const AskArieContext = createContext<AskArieContextValue | null>(null);

export function AskArieProvider({ children }: { children: React.ReactNode }) {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const setAskArieHealthy = useCallback((healthy: boolean) => {
    setIsHealthy(healthy);
  }, []);
  return (
    <AskArieContext.Provider value={{ isHealthy, setAskArieHealthy }}>
      {children}
    </AskArieContext.Provider>
  );
}

export function useAskArieHealth(): boolean | null {
  const ctx = useContext(AskArieContext);
  return ctx?.isHealthy ?? null;
}

export function useSetAskArieHealthy(): (healthy: boolean) => void {
  const ctx = useContext(AskArieContext);
  return ctx?.setAskArieHealthy ?? (() => {});
}
