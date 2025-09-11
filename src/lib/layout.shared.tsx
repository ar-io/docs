import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image
            src="https://arweave.net/XAv8yHVUdsjaiM_WJhHAAyBmjpk4RRDvzB9hfzsD-so"
            alt="AR.IO Logo"
            width={24}
            height={24}
            className="inline-block"
          />
          AR.IO Documentation
        </>
      ),
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [],
  };
}
