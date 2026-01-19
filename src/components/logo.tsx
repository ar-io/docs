'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function Logo() {
  const { resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState('/brand/ario-black.svg'); // Default to light logo

  useEffect(() => {
    // Update logo after theme is resolved
    setLogoSrc(resolvedTheme === 'dark' ? '/brand/ario-white.svg' : '/brand/ario-black.svg');
  }, [resolvedTheme]);

  return (
    <Image
      src={logoSrc}
      alt="AR.IO Logo"
      width={24}
      height={24}
      className="inline-block"
    />
  );
}