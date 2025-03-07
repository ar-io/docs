"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { mainNavigation, secondaryNavigation, singleNavigation } from "@/navConfigs/sidebarConfig";
import { NavGroup } from "@/components/Navigation";

const SidebarSubNavCards: React.FC = () => {
  const pathname = usePathname();
  // const navItems: NavGroup[] = pathname.startsWith("/build/") ? secondaryNavigation : mainNavigation;
  const navItems: NavGroup[] = singleNavigation;
  console.log("Current Pathname:", pathname);

  const findMatchingItem = (items: any[], currentPath: string): any | null => {
    for (const item of items) {
      if (item.href && item.href === currentPath) {
        return item;
      }
      const allNestedItems = [...(item.links || []), ...(item.children || [])];
      for (const nestedItem of allNestedItems) {
        if (nestedItem.href && nestedItem.href === currentPath) {
          return nestedItem;
        }
        const match = findMatchingItem(nestedItem.children || [], currentPath);
        if (match) {
          return match;
        }
      }
    }
    return null;
  };

  const matchingItem = findMatchingItem(navItems, pathname);
  const nestedItems = matchingItem?.links ?? matchingItem?.children ?? [];

  if (nestedItems.length === 0) return <div className="text-zinc-900 dark:text-white">No related pages found.</div>;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Related Pages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {nestedItems.map((item: any, index: any) => (
          <div
            key={item.href || `${item.title}-${index}`}
            className={clsx(
              "p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm flex flex-col",
              "hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            )}
          >
            {item.href ? (
              <Link href={item.href} className="flex-grow">
                <h3 className="text-md font-semibold text-zinc-900 dark:text-white">
                  {item.title}
                </h3>
              </Link>
            ) : (
              <h3 className="text-md font-semibold text-zinc-900 dark:text-white">
                {item.title}
              </h3>
            )}
            {item.children && item.children.length > 0 && (
              <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Contains {item.children.length} subpages
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarSubNavCards;
