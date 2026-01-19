import "@/app/global.css";
import "katex/dist/katex.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { Metadata } from "next";
import Script from "next/script";
import SearchDialog from "@/components/search";

export const metadata: Metadata = {
  metadataBase: new URL("https://docs.ar.io"),
  title: {
    default: "Ar.io Documentation",
    template: "%s | Ar.io Documentation",
  },
  description:
    "Comprehensive documentation for ar.io and the Arweave ecosystem",
  icons: {
    icon: "http://arweave.net/XKbNclfTP-pmIhFF6C3HC_rweVthbrVPv2CBuepxQ2g",
    shortcut: "http://arweave.net/XKbNclfTP-pmIhFF6C3HC_rweVthbrVPv2CBuepxQ2g",
    apple: "http://arweave.net/XKbNclfTP-pmIhFF6C3HC_rweVthbrVPv2CBuepxQ2g",
  },
};

// some comment to trigger deployment

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="font-inter" suppressHydrationWarning>
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
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
