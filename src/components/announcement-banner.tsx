"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

type AnnouncementBannerAction = {
  href: string;
  label: string;
  external?: boolean;
};

export type AnnouncementBannerProps = {
  id: string;
  children: ReactNode;
  mobileContent?: ReactNode;
  badge?: ReactNode;
  action?: AnnouncementBannerAction;
  dismissAriaLabel?: string;
};

export function AnnouncementBanner({
  id,
  children,
  mobileContent,
  badge,
  action,
  dismissAriaLabel = "Dismiss announcement",
}: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const dismissKey = useMemo(
    () => `announcement-banner-dismissed:${id}`,
    [id],
  );

  useEffect(() => {
    const isDismissed = localStorage.getItem(dismissKey) === "true";
    setIsVisible(!isDismissed);
  }, [dismissKey]);

  const dismissBanner = () => {
    localStorage.setItem(dismissKey, "true");
    setIsVisible(false);
  };

  useEffect(() => {
    if (!isVisible) {
      document.documentElement.style.setProperty("--fd-banner-height", "0px");
      return;
    }

    const bannerElement = bannerRef.current;
    if (!bannerElement) {
      return;
    }

    const updateBannerHeight = () => {
      document.documentElement.style.setProperty(
        "--fd-banner-height",
        `${bannerElement.offsetHeight}px`,
      );
    };

    updateBannerHeight();

    const resizeObserver = new ResizeObserver(updateBannerHeight);
    resizeObserver.observe(bannerElement);

    return () => {
      resizeObserver.disconnect();
      document.documentElement.style.setProperty("--fd-banner-height", "0px");
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={bannerRef}
      className="relative z-[60] w-full border-b border-white/20 bg-[#5B2AD1] text-white"
    >
      <div className="mx-auto flex max-w-[90rem] flex-col items-center gap-2 px-4 py-3 text-sm sm:flex-row sm:justify-center sm:gap-3 sm:px-4 sm:py-2 sm:pr-12">
        {badge ? (
          <span className="hidden rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold tracking-[0.08em] text-white/95 sm:inline-flex">
            {badge}
          </span>
        ) : null}
        <p className="text-center leading-5 text-white/95 sm:text-left">
          {mobileContent ? <span className="sm:hidden">{mobileContent}</span> : null}
          <span className={mobileContent ? "hidden sm:inline" : ""}>{children}</span>
        </p>
        {action ? (
          <Link
            href={action.href}
            target={action.external ? "_blank" : undefined}
            rel={action.external ? "noreferrer" : undefined}
            className="hidden items-center rounded-full bg-white/20 px-3 py-1 font-semibold text-white transition hover:bg-white/30 sm:inline-flex"
          >
            {action.label} &#8594;
          </Link>
        ) : null}
        <div className="flex items-center gap-3 sm:hidden">
          {action ? (
            <Link
              href={action.href}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noreferrer" : undefined}
              className="inline-flex items-center rounded-full bg-white/20 px-4 py-1.5 font-semibold text-white transition hover:bg-white/30"
            >
              {action.label} &#8594;
            </Link>
          ) : null}
          <button
            type="button"
            aria-label={dismissAriaLabel}
            onClick={dismissBanner}
            className="rounded p-1 text-white/80 transition hover:bg-white/20 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <button
          type="button"
          aria-label={dismissAriaLabel}
          onClick={dismissBanner}
          className="hidden rounded p-1 text-white/80 transition hover:bg-white/20 hover:text-white sm:absolute sm:right-3 sm:top-1/2 sm:block sm:-translate-y-1/2"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
