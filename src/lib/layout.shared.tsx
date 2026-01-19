import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Logo } from "@/components/logo";

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
          <Logo />
          Ar.io Documentation
        </>
      ),
    },
    themeSwitch: {
      mode: 'light-dark-system',
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [],
  };
}
