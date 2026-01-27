"use client";

import { useFramework, type Framework, FRAMEWORK_LABELS } from "@/contexts/framework-context";
import { ChevronDown, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const FRAMEWORKS: Framework[] = ["react", "nextjs", "vue", "svelte"];

export function FrameworkSelector() {
  const { framework, setFramework, isHydrated } = useFramework();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Don't render until hydrated to avoid hydration mismatch
  if (!isHydrated) {
    return (
      <div className="w-full px-2 py-2">
        <div className="h-9 w-full rounded-md border border-fd-border bg-fd-background animate-pulse" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full px-2 py-2">
      <div className="relative">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-1 items-center justify-between gap-2 rounded-md border border-fd-border bg-fd-background px-3 py-2 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground focus:outline-none focus:ring-2 focus:ring-fd-ring"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <span className="flex items-center gap-2">
              {framework ? (
                <>
                  <FrameworkIcon framework={framework} />
                  <span>{FRAMEWORK_LABELS[framework]}</span>
                </>
              ) : (
                <span className="text-fd-muted-foreground">Select Framework</span>
              )}
            </span>
            <ChevronDown className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>
          {framework && (
            <button
              type="button"
              onClick={() => setFramework(null)}
              className="rounded-md border border-fd-border bg-fd-background p-2 hover:bg-fd-accent hover:text-fd-accent-foreground focus:outline-none focus:ring-2 focus:ring-fd-ring"
              aria-label="Clear selection"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {isOpen && (
          <ul
            className="absolute z-50 mt-1 w-full rounded-md border border-fd-border bg-fd-popover py-1 shadow-lg"
            role="listbox"
          >
            {FRAMEWORKS.map((fw) => (
              <li key={fw}>
                <button
                  type="button"
                  onClick={() => {
                    setFramework(fw);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground ${
                    framework === fw ? "bg-fd-accent text-fd-accent-foreground" : "text-fd-popover-foreground"
                  }`}
                  role="option"
                  aria-selected={framework === fw}
                >
                  <FrameworkIcon framework={fw} />
                  <span>{FRAMEWORK_LABELS[fw]}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="mt-1.5 text-xs text-fd-muted-foreground">
        Filter code examples by framework
      </p>
    </div>
  );
}

function FrameworkIcon({ framework }: { framework: Framework }) {
  const iconClasses = "size-4";
  
  switch (framework) {
    case "react":
      return (
        <svg className={iconClasses} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 01-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68 0 1.69-1.83 2.93-4.37 3.68.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68 0-1.69 1.83-2.93 4.37-3.68-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 012.4-.36c.48-.67.99-1.31 1.51-1.9z"/>
        </svg>
      );
    case "nextjs":
      return (
        <svg className={iconClasses} viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 01.237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 01.233-.296c.096-.05.13-.054.5-.054z"/>
        </svg>
      );
    case "vue":
      return (
        <svg className={iconClasses} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z"/>
        </svg>
      );
    case "svelte":
      return (
        <svg className={iconClasses} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.68 3.17a7.35 7.35 0 00-9.93-1.56L5.59 5.12A6.09 6.09 0 002.87 9.4a6.33 6.33 0 00.66 4.09 6.09 6.09 0 00-.91 3.2 6.38 6.38 0 001.12 3.63 7.35 7.35 0 009.93 1.56l5.16-3.51a6.09 6.09 0 002.72-4.28 6.33 6.33 0 00-.66-4.09 6.09 6.09 0 00.91-3.2 6.38 6.38 0 00-1.12-3.63zm-9.77 17.1a4.48 4.48 0 01-4.81-1.66 3.88 3.88 0 01-.68-2.21 3.7 3.7 0 01.08-.77l.12-.49.45.28a7.17 7.17 0 002.16 1.11l.21.06-.02.2a1.17 1.17 0 00.22.79 1.37 1.37 0 001.47.5 1.28 1.28 0 00.4-.18l5.16-3.51a1.13 1.13 0 00.5-.79 1.18 1.18 0 00-.2-.85 1.37 1.37 0 00-1.47-.5 1.28 1.28 0 00-.4.18l-1.97 1.34a4.19 4.19 0 01-1.31.59 4.48 4.48 0 01-4.81-1.66 3.88 3.88 0 01-.68-2.21 3.7 3.7 0 011.63-2.58l5.16-3.51a4.19 4.19 0 011.31-.59 4.48 4.48 0 014.81 1.66 3.88 3.88 0 01.68 2.21 3.7 3.7 0 01-.08.77l-.12.49-.45-.28a7.17 7.17 0 00-2.16-1.11l-.21-.06.02-.2a1.17 1.17 0 00-.22-.79 1.37 1.37 0 00-1.47-.5 1.28 1.28 0 00-.4.18L8.71 9.39a1.13 1.13 0 00-.5.79 1.18 1.18 0 00.2.85 1.37 1.37 0 001.47.5 1.28 1.28 0 00.4-.18l1.97-1.34a4.19 4.19 0 011.31-.59 4.48 4.48 0 014.81 1.66 3.88 3.88 0 01.68 2.21 3.7 3.7 0 01-1.63 2.58l-5.16 3.51a4.19 4.19 0 01-1.35.59z"/>
        </svg>
      );
    default:
      return null;
  }
}
