"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

export type Framework = "react" | "nextjs" | "vue" | "svelte";

const STORAGE_KEY = "preferred-framework";

// Map framework IDs to display names (used for matching tab items)
export const FRAMEWORK_LABELS: Record<Framework, string> = {
  react: "React",
  nextjs: "Next.js",
  vue: "Vue",
  svelte: "Svelte",
};

// Reverse mapping from display names to framework IDs
export const LABEL_TO_FRAMEWORK: Record<string, Framework> = {
  "React": "react",
  "React + Vite": "react",
  "Next.js": "nextjs",
  "Vue": "vue",
  "Svelte": "svelte",
};

interface FrameworkContextValue {
  framework: Framework | null;
  setFramework: (fw: Framework | null) => void;
  isHydrated: boolean;
}

const FrameworkContext = createContext<FrameworkContextValue>({
  framework: null,
  setFramework: () => {},
  isHydrated: false,
});

export function FrameworkProvider({ children }: { children: ReactNode }) {
  const [framework, setFrameworkState] = useState<Framework | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && isValidFramework(stored)) {
        setFrameworkState(stored as Framework);
      }
    } catch {
      // localStorage not available (SSR or privacy mode)
    }
    setIsHydrated(true);
  }, []);

  const setFramework = useCallback((fw: Framework | null) => {
    setFrameworkState(fw);
    try {
      if (fw === null) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, fw);
      }
    } catch {
      // localStorage not available
    }
  }, []);

  return (
    <FrameworkContext.Provider value={{ framework, setFramework, isHydrated }}>
      {children}
    </FrameworkContext.Provider>
  );
}

export function useFramework() {
  const context = useContext(FrameworkContext);
  if (!context) {
    throw new Error("useFramework must be used within a FrameworkProvider");
  }
  return context;
}

function isValidFramework(value: string): value is Framework {
  return ["react", "nextjs", "vue", "svelte"].includes(value);
}
