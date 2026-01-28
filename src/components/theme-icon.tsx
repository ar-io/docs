'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState, memo } from 'react';

interface ThemeIconProps {
  lightSrc: string;
  darkSrc: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

function ThemeIconComponent({ 
  lightSrc, 
  darkSrc, 
  alt = '', 
  width = 16, 
  height = 16,
  className = 'size-4'
}: ThemeIconProps) {
  const { resolvedTheme } = useTheme();
  const [iconSrc, setIconSrc] = useState(lightSrc); // Default to light logo

  useEffect(() => {
    // Update icon after theme is resolved
    setIconSrc(resolvedTheme === 'dark' ? darkSrc : lightSrc);
  }, [resolvedTheme, lightSrc, darkSrc]);

  return (
    <Image
      src={iconSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

// Memoize to prevent unnecessary re-renders
const MemoizedThemeIcon = memo(ThemeIconComponent);

// Export as a component that can be used with createElement
export const ThemeIcon = MemoizedThemeIcon;
