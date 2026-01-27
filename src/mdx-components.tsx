import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import Tip from "@/components/Tip";
import { CodeGroup } from "@/components/Code";
import Mermaid from "@/components/Mermaid";
import { openapi } from "@/lib/openapi";
import { APIPage } from "fumadocs-openapi/ui";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tabs, Tab } from "fumadocs-ui/components/tabs";
import { FrameworkTabs } from "@/components/framework-tabs";
import Image from "next/image";
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
  CreditCard,
  Upload,
  Tag,
  Book,
  Check,
  Shield,
  BarChart3,
  Cpu,
  Database,
  DollarSign,
} from "lucide-react";

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Tip,
    CodeGroup,
    Mermaid,
    Step,
    Steps,
    Tabs,
    Tab,
    FrameworkTabs,
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
    CreditCard,
    Upload,
    Tag,
    Book,
    Check,
    Image,
    Shield,
    BarChart3,
    Cpu,
    Database,
    DollarSign,
    APIPage: (props) => <APIPage {...openapi.getAPIPageProps(props)} />,
    ...components,
  };
}
