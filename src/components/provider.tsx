"use client";

import NextLink from "next/link";
import NextImage from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FrameworkProvider, type Framework } from "fumadocs-core/framework";
import {
  RootProvider as BaseProvider,
  type RootProviderProps,
} from "fumadocs-ui/provider/base";

/**
 * Every Fumadocs link (sidebar, cards, prev/next, MDX links) renders through
 * this component, so prefetching is switched off for the whole site here.
 *
 * Under `output: "export"` Next prefetches a link by sending a HEAD for the
 * page and then GETs its `__next.*.txt` segment payloads, which
 * scripts/strip-rsc-segments.ts deletes. The gateway answers each miss with
 * a 200 HTML page, Next retries it ~10s later, and the flood (30+ requests a
 * click over HTTP/1.1) stalled real navigations for seconds. Keeping the
 * payloads is no fix: Next 16's export names the page segment differently
 * from what the client requests, and navigations rendered blank pages.
 * Navigation still fetches the target's `index.txt` on click, so clicks stay
 * client-side.
 */
const Link: NonNullable<Framework["Link"]> = ({ href = "#", ...props }) => (
  <NextLink href={href} {...props} prefetch={false} />
);

/** fumadocs-ui's own RootProvider, with the Link above in place of next/link. */
export function RootProvider(props: RootProviderProps) {
  return (
    <FrameworkProvider
      usePathname={usePathname}
      useRouter={useRouter}
      useParams={useParams}
      Link={Link}
      // Same wiring as fumadocs-core's NextProvider; its Image type is looser
      // than next/image's.
      Image={NextImage as Framework["Image"]}
    >
      <BaseProvider {...props} />
    </FrameworkProvider>
  );
}
