import "@/app/global.css";
import "katex/dist/katex.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { Metadata } from "next";
import SearchDialog from "@/components/search";

export const metadata: Metadata = {
  metadataBase: new URL("https://docs.ar.io"),
  title: {
    default: "AR.IO Documentation",
    template: "%s | AR.IO Documentation",
  },
  description:
    "Comprehensive documentation for AR.IO and the Arweave ecosystem",
  icons: {
    icon: "https://arweave.net/XAv8yHVUdsjaiM_WJhHAAyBmjpk4RRDvzB9hfzsD-so",
    shortcut: "https://arweave.net/XAv8yHVUdsjaiM_WJhHAAyBmjpk4RRDvzB9hfzsD-so",
    apple: "https://arweave.net/XAv8yHVUdsjaiM_WJhHAAyBmjpk4RRDvzB9hfzsD-so",
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="font-inter" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
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
