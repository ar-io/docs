"use client";

import { useFramework, LABEL_TO_FRAMEWORK, FRAMEWORK_LABELS, type Framework } from "@/contexts/framework-context";
import { Tabs } from "fumadocs-ui/components/tabs";
import React, { Children, isValidElement, type ReactNode } from "react";

interface FrameworkTabsProps {
  items: string[];
  children: ReactNode;
}

/**
 * A tabs component that respects the global framework preference.
 * 
 * When a user has selected a framework preference:
 * - If that framework exists in the tab items, only that content is shown (no tabs)
 * - If not, regular tabs are rendered
 * 
 * When no preference is set, regular tabs are rendered.
 */
export function FrameworkTabs({ items, children }: FrameworkTabsProps) {
  const { framework, isHydrated } = useFramework();

  // Find the matching tab item for the selected framework
  const matchingItem = framework ? findMatchingItem(items, framework) : null;

  // If hydrating, show tabs as normal to avoid layout shift
  if (!isHydrated) {
    return (
      <Tabs items={items}>
        {children}
      </Tabs>
    );
  }

  // If a framework is selected and matches one of the items, show only that content
  if (matchingItem) {
    const matchingChild = findChildForItem(children, matchingItem);
    
    if (matchingChild) {
      return (
        <div className="framework-tabs-single">
          <div className="mb-2 flex items-center gap-2 text-sm text-fd-muted-foreground">
            <span>Showing:</span>
            <span className="rounded-md bg-fd-accent px-2 py-0.5 font-medium text-fd-accent-foreground">
              {matchingItem}
            </span>
          </div>
          {matchingChild}
        </div>
      );
    }
  }

  // Default: render regular tabs
  return (
    <Tabs items={items}>
      {children}
    </Tabs>
  );
}

/**
 * Find the tab item that matches the selected framework.
 * Handles variations like "React + Vite" matching "react".
 */
function findMatchingItem(items: string[], framework: Framework): string | null {
  const frameworkLabel = FRAMEWORK_LABELS[framework];
  
  // First, try exact match
  const exactMatch = items.find(item => item === frameworkLabel);
  if (exactMatch) return exactMatch;
  
  // Then, try matching by checking if any item maps to this framework
  for (const item of items) {
    const mappedFramework = LABEL_TO_FRAMEWORK[item];
    if (mappedFramework === framework) {
      return item;
    }
  }
  
  // Finally, try partial match (e.g., "React" in "React + Vite")
  const partialMatch = items.find(item => 
    item.toLowerCase().includes(frameworkLabel.toLowerCase())
  );
  if (partialMatch) return partialMatch;
  
  return null;
}

/**
 * Find the Tab child component that matches the given item value.
 */
function findChildForItem(children: ReactNode, itemValue: string): ReactNode | null {
  const childArray = Children.toArray(children);
  
  for (const child of childArray) {
    if (isValidElement(child)) {
      // Check if this is a Tab component with matching value
      const props = child.props as { value?: string; children?: ReactNode };
      if (props.value === itemValue) {
        // Return the content inside the Tab
        return props.children;
      }
    }
  }
  
  return null;
}

// Re-export Tab for convenience so MDX files can import both from the same place
export { Tab } from "fumadocs-ui/components/tabs";
