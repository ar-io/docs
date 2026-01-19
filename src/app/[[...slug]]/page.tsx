import { source } from "@/lib/source";
import { DocsBody, DocsPage, DocsTitle } from "fumadocs-ui/page";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";
import { LLMCopyButton, ViewOptions } from "@/components/page-actions";
import { PageFeedback } from "@/components/page-feedback";
import { redirect } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  // Try to get the page content first (this will work for both root and other pages)
  const page = source.getPage(params.slug);

  // If no page found, trigger 404
  if (!page) {
    return redirect("/learn");
  }

  const MDXContent = page.data.body;
  const RelativeLink = createRelativeLink(source, page);

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsBody>
        <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
          <LLMCopyButton
            markdownUrl={`https://raw.githubusercontent.com/ar-io/docs/refs/heads/main/content/${page.path}`}
          />
          <ViewOptions
            markdownUrl={`https://github.com/ar-io/docs/blob/refs/heads/main/content/${page.path}`}
            githubUrl={`https://github.com/ar-io/docs/blob/refs/heads/main/content/${page.path}`}
          />
        </div>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: (props) => {
              const href = typeof props.href === "string" ? props.href : "";

              // For public assets like /llms-full.txt, use a plain anchor so the browser
              // requests the static file instead of the docs catch-all route.
              const isPublicAsset =
                href.startsWith("/") &&
                /\.(?:txt|json|xml|pdf)($|[?#])/i.test(href);

              if (isPublicAsset) return <a {...props} />;

              return <RelativeLink {...props} />;
            },
          })}
        />
        <PageFeedback pageUrl={page.url} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  const params = source.generateParams();
  
  // Add root path for static export
  return [
    { slug: [] }, // Root path
    ...params
  ];
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;

  // Try to get the page content first
  const page = source.getPage(params.slug);

  // If no page found, return default metadata
  if (!page) {
    return {
      title: "Ar.io Documentation",
      description: "Documentation for ar.io",
      openGraph: {
        title: "Ar.io Documentation",
        description: "Documentation for ar.io",
        type: "website",
        siteName: "ar.io",
        images: [
          {
            url: "/meta.png",
            width: 1200,
            height: 630,
            alt: "Ar.io Documentation",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Ar.io Documentation",
        description: "Documentation for ar.io",
        images: [
          "/meta.png",
        ],
        creator: "@ar_io_network",
        site: "@ar_io_network",
      },
      icons: {
        icon: "https://arweave.net/uA4zrhP_ShZ8-QbbKM0XhBQWpXgBpYDhgr6X5f6Ou88g",
        shortcut: "https://arweave.net/uA4zrhP_ShZ8-QbbKM0XhBQWpXgBpYDhgr6X5f6Ou88",
        apple: "https://arweave.net/uA4zrhP_ShZ8-QbbKM0XhBQWpXgBpYDhgr6X5f6Ou88",
      },
    };
  }

  // Extract metadata from the page frontmatter
  const frontmatter = page.data as {
    title?: string;
    description?: string;
    image?: string;
    icon?: string;
    keywords?: string[];
    author?: string;
  };

  // Use existing frontmatter fields, with fallbacks
  const pageTitle = frontmatter.title || page.data.title;
  const pageDescription = frontmatter.description || page.data.description;
  const pageImage =
    frontmatter.image || frontmatter.icon || "/meta.png";
  const pageKeywords = frontmatter.keywords || [
    "ar.io",
    "Arweave",
    "documentation",
  ];
  const pageAuthor = frontmatter.author || "Ar.io Team";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "article",
      siteName: "AR.IO",
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      // Add canonical URL for better SEO
      url: `https://docs.ar.io/${params.slug?.join("/") || ""}`,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: "@ar_io_network",
      site: "@ar_io_network",
    },
    icons: {
        icon: "https://arweave.net/XAv8yHVUdsjaiM_WJhHAAyBmjpk4RRDvzB9hfzsD-so",
        shortcut:
          "https://arweave.net/XAv8yHVUdsjaiM_WJhHAAyBmjpk4RRDvzB9hfzsD-so",
        apple:
          "https://arweave.net/XAv8yHVUdsjaiM_WJhHAAyBmjpk4RRDvzB9hfzsD-so",
    },
    // Add additional metadata for better SEO
    keywords: pageKeywords,
    authors: [{ name: pageAuthor }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
