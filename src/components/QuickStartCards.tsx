import React from "react";
import Link from "next/link";
import quickStartData from "@/navConfigs/quick-start.json";

// Define the expected type for each quick start item
type QuickStartItem = {
  title: string;
  description: string;
  href: string;
  icon?: string; // Optional icon
};

// Ensure TypeScript recognizes the imported JSON as an array of QuickStartItem objects
const quickStartItems: QuickStartItem[] = quickStartData as QuickStartItem[];

const QuickStartCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {quickStartItems.map(({ title, description, href, icon }, index) => (
        <Link key={index} href={href} className="group h-full">
          <div className="p-6 border rounded-2xl shadow-md bg-zinc-900/5 hover:shadow-lg transition-shadow flex flex-col items-center text-center dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-purple-100/10 dark:group-hover:ring-purple-200 h-full min-h-[250px]">
            {/* Title at the top */}
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              {title}
            </h3>

            {/* Icon below title */}
            <img
              src={icon ?? "https://arweave.net/u_RyVlrvhHawKdk55HjQNmIXGGMeuSXFoXlDJlho4MI"}
              alt={title}
              className="w-16 h-16 object-cover rounded-lg mb-4"
            />

            {/* Description with proper text wrapping */}
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed break-words">
              {description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QuickStartCards;
