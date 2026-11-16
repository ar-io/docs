import React from "react";

export default function Tip({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-4 rounded-xl border border-fd-border border-l-4 border-l-fd-primary bg-fd-card p-4 text-fd-card-foreground">
      <div className="mb-2 font-semibold text-fd-primary">{title}</div>
      <div className="text-sm text-fd-muted-foreground">{children}</div>
    </div>
  );
}
