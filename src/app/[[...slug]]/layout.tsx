import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { FrameworkSelector } from "@/components/framework-selector";

export default async function Layout({ 
  children,
  params 
}: { 
  children: React.ReactNode;
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  // Construct pathname from slug params
  const pathname = resolvedParams.slug ? `/${resolvedParams.slug.join('/')}` : '/';
  
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions(pathname)}
      sidebar={{
        defaultOpenLevel: 1,
        banner: <FrameworkSelector />,
      }}
    >
      {children}
    </DocsLayout>
  );
}
