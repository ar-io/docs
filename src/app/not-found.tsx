"use client"
import { Button } from '@/components/Button'
import { HeroPattern } from '@/components/HeroPattern'
import { SquareArrowOutUpRight } from 'lucide-react'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {legacyPaths} from '@/navConfigs/legacy-paths';

// export const metadata = {
//   title: 'Page Not Found',
//   description:
//     'This page was not found in the current version of our documentation, but rest assured that if it ever existed, it is still available on the permaweb.',
//   images: [
//     {
//       url: 'https://arweave.net/JluJoV__SITJWXvtzkoKvsMoRqQOWnvVX7G6kAj2RdU',
//     },
//   ],
//   openGraph: {
//     title: 'Page Not Found',
//     images: [
//       {
//         url: 'https://arweave.net/JluJoV__SITJWXvtzkoKvsMoRqQOWnvVX7G6kAj2RdU',
//       },
//     ],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Page Not Found',
//     site: '@ar_io_network',
//     images: [
//       {
//         url: 'https://arweave.net/JluJoV__SITJWXvtzkoKvsMoRqQOWnvVX7G6kAj2RdU',
//       },
//     ],
//   },
// }

export default function NotFound() {
  const router = useRouter()
  useEffect(() => {
    const currentPath = window.location.pathname.replace(/^\/+/, '') + window.location.search;
    if (legacyPaths[currentPath]) {
      const newPath = `/${legacyPaths[currentPath]}${window.location.search}`;
      router.replace(newPath);
    }
  }, [router]);
  
  
  return (
    <>
      <HeroPattern />
      <div className="mx-auto flex h-full max-w-xl flex-col items-center justify-center py-16 text-center">
        <p className="text-lg text-zinc-900 dark:text-white">404s suck!</p>
        <img src="https://arweave.net/JluJoV__SITJWXvtzkoKvsMoRqQOWnvVX7G6kAj2RdU"></img>
        <h1 className="mt-2 text-2xl text-zinc-900 dark:text-zinc-400">
          Our vision is an internet with no more 404s, but it looks like you
          just found one.
        </h1>
        <p className="mt-2 text-xl text-zinc-600 dark:text-zinc-400">
          Rest assured that if this page ever existed, it is still available on
          the permaweb.
        </p>
        <Button href="/" arrow="right" className="mt-8">
          Back to Home
        </Button>
      </div>
    </>
  )
}
