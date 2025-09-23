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
   return redirect("/learn")
  }

  const MDXContent = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsBody>      
          <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
            <LLMCopyButton markdownUrl={`https://raw.githubusercontent.com/ar-io/docs-v2/refs/heads/fumadocs/content/${page.path}`} />
            <ViewOptions
              markdownUrl={`https://github.com/ar-io/docs-v2/blob/refs/heads/fumadocs/content/${page.path}`}
              githubUrl={`https://github.com/ar-io/docs-v2/blob/refs/heads/fumadocs/content/${page.path}`}
            />
        </div>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
        <PageFeedback pageUrl={page.url} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
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
      title: "AR.IO Documentation",
      description: "Documentation for AR.IO",
      openGraph: {
        title: "AR.IO Documentation",
        description: "Documentation for AR.IO",
        type: "website",
        siteName: "AR.IO",
        images: [
          {
            url: "https://arweave.net/XAv8yHVUdsjaiM_WJhHAAyBmjpk4RRDvzB9hfzsD-so",
            width: 1200,
            height: 630,
            alt: "AR.IO Documentation",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "AR.IO Documentation",
        description: "Documentation for AR.IO",
        images: [
          "https://arweave.net/XAv8yHVUdsjaiM_WJhHAAyBmjpk4RRDvzB9hfzsD-so",
        ],
        creator: "@AR_IO_Network",
        site: "@AR_IO_Network",
      },
      icons: {
        icon: "https://arweave.net/XAv8yHVUdsjaiM_WJhHAAyBmjpk4RRDvzB9hfzsD-so",
        shortcut:
          "https://arweave.net/XAv8yHVUdsjaiM_WJhHAAyBmjpk4RRDvzB9hfzsD-so",
        apple:
          "https://arweave.net/XAv8yHVUdsjaiM_WJhHAAyBmjpk4RRDvzB9hfzsD-so",
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
    frontmatter.image || frontmatter.icon || "https://ar.io/og-image.png";
  const pageKeywords = frontmatter.keywords || [
    "AR.IO",
    "Arweave",
    "documentation",
  ];
  const pageAuthor = frontmatter.author || "AR.IO Team";

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
      creator: "@AR_IO_Network",
      site: "@AR_IO_Network",
    },
    icons: {
      icon: pageImage.startsWith("http")
        ? pageImage
        : "https://arweave.net/XAv8yHVUdsjaiM_WJhHAAyBmjpk4RRDvzB9hfzsD-so",
      shortcut:
        "https://arweave.net/XAv8yHVUdsjaiM_WJhHAAyBmjpk4RRDvzB9hfzsD-so",
      apple: "https://arweave.net/XAv8yHVUdsjaiM_WJhHAAyBmjpk4RRDvzB9hfzsD-so",
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
