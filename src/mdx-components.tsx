import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import Tip from "@/components/Tip";
import { CodeGroup } from "@/components/Code";
import { openapi } from "@/lib/openapi";
import { APIPage } from "fumadocs-openapi/ui";
import { Step, Steps } from "fumadocs-ui/components/steps";
import {
  FolderOpen,
  Info,
  Zap,
  Code,
  MousePointer,
  Network,
  Package,
  Globe,
  Search,
  Link,
} from "lucide-react";

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Tip,
    CodeGroup,
    Step,
    Steps,
    FolderOpen,
    Info,
    Zap,
    Code,
    MousePointer,
    Network,
    Package,
    Globe,
    Search,
    Link,
    APIPage: (props) => <APIPage {...openapi.getAPIPageProps(props)} />,
    ...components,
  };
}
