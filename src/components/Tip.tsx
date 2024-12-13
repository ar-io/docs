import React from "react";

export default function Tip({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l-4 border-orange-500 bg-gray-800 text-white p-4 rounded-md">
      <div className="font-semibold text-lg text-orange-300 mb-2">{title}</div>
      <div className="text-sm">{children}</div>
    </div>
  );
}
