import "@/app/global.css";
import "katex/dist/katex.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { Metadata } from "next";
import Script from "next/script";
import SearchDialog from "@/components/search";
import { AskArieProvider } from "@/components/ask-arie/AskArieContext";
import { AskArieWidget } from "@/components/ask-arie/AskArieWidget";
import { AnnouncementBanner } from "@/components/announcement-banner";
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

// some comment to trigger deployment

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={plusJakartaSans.variable} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
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
            <AnnouncementBanner
              storageKey="solana-migration"
              mobileText="Ar.io is migrating to Solana."
              badgeText="June 2026"
              ctaHref="https://ar.io/solana-migration"
              ctaLabel="Learn more"
              dismissAriaLabel="Dismiss migration banner"
            >
              The ar.io smart contract and token are migrating to Solana.
              Register now to migrate your assets before the deadline.
            </AnnouncementBanner>
            {children}
            <AskArieWidget />
          </AskArieProvider>
        </RootProvider>
      </body>
    </html>
  );
}
