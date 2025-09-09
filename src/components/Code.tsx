import { Tabs } from 'fumadocs-ui/components/tabs';
import React from 'react';

interface CodeGroupProps {
  title?: string;
  children: React.ReactNode;
}

export function CodeGroup({ children }: CodeGroupProps) {
  // Extract code blocks and create tab items from their titles
  const items: string[] = [];
  
  // Extract tab names from code block titles
  React.Children.forEach(children, (child) => {
    // @ts-expect-error - child.props is of type unknown
    if (React.isValidElement(child) && child.props.title) {
      // @ts-expect-error - child.props is of type unknown
      items.push(child.props.title);
    }
  });

  // If no items found, just render children directly
  if (items.length === 0) {
    return <div>{children}</div>;
  }

  return (
    <Tabs items={items}>
      {children}
    </Tabs>
  );
}
