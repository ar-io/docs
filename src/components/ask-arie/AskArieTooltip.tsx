"use client";

import { MessageCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ASK_ARIE_OPEN_EVENT } from "@/lib/ask-arie";
import { useAskArieHealth } from "./AskArieContext";

export interface AskArieTooltipProps {
  /** The visible text or content to wrap. Hovering shows the Ask Arie tooltip. */
  children: React.ReactNode;
  /**
   * Optional. Text used to build the question sent to Arie (e.g. "ArNS").
   * If omitted, string content from children is used when possible.
   */
  term?: string;
}

function getTextFromChildren(children: React.ReactNode): string {
  if (typeof children === "string") return children.trim();
  if (Array.isArray(children)) return children.map(getTextFromChildren).join("").trim();
  if (children != null && typeof children === "object" && "props" in children) {
    const el = children as React.ReactElement<{ children?: React.ReactNode }>;
    return getTextFromChildren(el.props.children);
  }
  return "";
}

const HIDE_DELAY_MS = 150;

export function AskArieTooltip({ children, term }: AskArieTooltipProps) {
  const isHealthy = useAskArieHealth();
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPlaceAbove, setTooltipPlaceAbove] = useState(true);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resolvedTerm = term ?? getTextFromChildren(children);
  const question =
    resolvedTerm.length > 0
      ? `What is the context and meaning of "${resolvedTerm}" on this page?`
      : "What does this mean in the context of this page?";

  const clearHideTimeout = useCallback(() => {
    if (hideTimeoutRef.current !== null) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const updatePosition = useCallback(() => {
    const el = triggerRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;
      setTooltipPlaceAbove(spaceAbove >= spaceBelow);
    }
  }, []);

  const showTooltip = useCallback(() => {
    clearHideTimeout();
    updatePosition();
    setIsVisible(true);
  }, [clearHideTimeout, updatePosition]);

  const scheduleHide = useCallback(() => {
    clearHideTimeout();
    hideTimeoutRef.current = setTimeout(() => {
      hideTimeoutRef.current = null;
      setIsVisible(false);
    }, HIDE_DELAY_MS);
  }, [clearHideTimeout]);

  useEffect(() => () => clearHideTimeout(), [clearHideTimeout]);

  const handleAskArie = useCallback(() => {
    clearHideTimeout();
    window.dispatchEvent(
      new CustomEvent(ASK_ARIE_OPEN_EVENT, {
        detail: { question, autoSend: true },
      })
    );
    setIsVisible(false);
  }, [question, clearHideTimeout]);

  const handleTriggerClick = useCallback(
    (e: React.MouseEvent) => {
      if ("ontouchstart" in window) {
        e.preventDefault();
        setIsVisible((v) => {
          if (!v) updatePosition();
          return !v;
        });
      }
    },
    [updatePosition]
  );

  if (isHealthy !== true) {
    return <>{children}</>;
  }

  return (
    <span
      ref={triggerRef}
      className="relative inline"
      onMouseEnter={showTooltip}
      onMouseLeave={scheduleHide}
      onClick={handleTriggerClick}
    >
      <span className="border-b border-dotted border-fd-primary/50 cursor-help">
        {children}
      </span>
      {isVisible && (
        <span
          className="absolute left-1/2 z-50 flex -translate-x-1/2 items-center gap-1.5 rounded-lg border border-fd-border bg-fd-popover px-2.5 py-1.5 text-sm text-fd-popover-foreground shadow-md whitespace-nowrap"
          style={
            tooltipPlaceAbove
              ? { bottom: "calc(100% + 6px)" }
              : { top: "calc(100% + 6px)" }
          }
          role="tooltip"
          onMouseEnter={showTooltip}
          onMouseLeave={scheduleHide}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleAskArie();
            }}
            className="inline-flex items-center gap-1.5 rounded-md bg-fd-primary px-2 py-1 text-xs font-medium text-fd-primary-foreground hover:bg-fd-primary/90 transition-colors"
            aria-label={`Ask Arie about "${resolvedTerm || "this"}"`}
          >
            <MessageCircle className="size-3.5" />
            Ask Arie
          </button>
        </span>
      )}
    </span>
  );
}
