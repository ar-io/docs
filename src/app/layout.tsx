import "@/app/global.css";
import "katex/dist/katex.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import SearchDialog from "@/components/search";
import { AskArieProvider } from "@/components/ask-arie/AskArieContext";
import { AskArieWidget } from "@/components/ask-arie/AskArieWidget";
import {
  AnnouncementBanner,
  type AnnouncementBannerProps,
} from "@/components/announcement-banner";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://docs.ar.io"),
  title: {
    default: "ar.io Documentation",
    template: "%s | ar.io Documentation",
  },
  description:
    "Comprehensive documentation for ar.io and the Arweave ecosystem",
  icons: {
    icon: "/brand/favicon.png",
    shortcut: "/brand/favicon.png",
    apple: "/brand/favicon.png",
  },
};

function getAnnouncementBanner(): AnnouncementBannerProps | null {
  return null;
}

export default function Layout({ children }: { children: ReactNode }) {
  const announcementBanner = getAnnouncementBanner();

  return (
    <html lang="en" className={plusJakartaSans.variable} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        {/*
          The chunk-load recovery script is NOT rendered here. Under
          `output: "export"` the RSC renderer serializes any inline <script>
          into the React Flight payload (__next_f) instead of emitting an
          executable tag, so it would only run after hydration — which depends
          on the very chunks it is meant to recover. It is injected as a real
          inline <script> at the top of <head> in every exported HTML file by
          scripts/inject-chunk-load-recovery.ts (run as a post-build step).
        */}
        <Script
          src="https://plausible.io/js/script.js"
          defer
          data-domain="docs.ar.io"
        />
        <RootProvider
          search={{
            SearchDialog,
          }}
          theme={{
            defaultTheme: 'light',
            enableSystem: true,
          }}
        >
          <AskArieProvider>
            {announcementBanner ? (
              <AnnouncementBanner {...announcementBanner} />
            ) : null}
            {children}
            <AskArieWidget />
          </AskArieProvider>
        </RootProvider>
      </body>
    </html>
  );
}
