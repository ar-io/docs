import React from "react";
import Link from "next/link";

const QuickStartBanner: React.FC = () => {
  return (
    <Link href="/guides">
      <div className="w-full px-6 py-4 rounded-xl bg-purple-100/10 text-center text-lg font-semibold 
                      text-zinc-900 dark:text-white border border-purple-200 dark:border-white/15 
                      transition hover:bg-purple-200/20 hover:dark:bg-white/15 
                      sm:text-xl md:px-8 md:py-5">
        🚀 Get Started Quickly: Explore Our Quick Start Guides →
      </div>
    </Link>
  );
};

export default QuickStartBanner;
