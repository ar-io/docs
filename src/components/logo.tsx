import Image from 'next/image';

// Both variants are rendered and CSS picks one, so the right logo is in the
// static HTML: no flash of the dark logo on dark pages before hydration.
export function Logo() {
  return (
    <>
      <Image src="/brand/ario-black.svg" alt="ar.io" width={24} height={24} className="inline-block dark:hidden" />
      <Image src="/brand/ario-white.svg" alt="ar.io" width={24} height={24} className="hidden dark:inline-block" />
    </>
  );
}
