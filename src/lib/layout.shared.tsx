import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Logo } from "@/components/logo";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(pathname?: string): BaseLayoutProps {
  // Only show white paper link in Learn sections
  const isLearnSection = pathname?.startsWith('/learn') ?? false;
  
  const links: BaseLayoutProps['links'] = [];
  
  // Add white paper link as the last item only in Learn sections
  if (isLearnSection) {
    links.push({
      text: "White Paper",
      url: "https://whitepaper.ar.io",
      external: true,
    });
  }

  return {
    nav: {
      title: (
        <>
          <Logo />
          ar.io Documentation
        </>
      ),
    },
    themeSwitch: {
      mode: 'light-dark-system',
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links,
  };
}
