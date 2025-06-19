'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { SquareArrowOutUpRight } from 'lucide-react'

interface WayfinderLinkProps {
  href?: string
  children: React.ReactNode
  [key: string]: any
}

export default function WayfinderLink({
  href,
  children,
  ...props
}: WayfinderLinkProps) {
  const [isClient, setIsClient] = useState(false)
  const [isExternalLink, setIsExternalLink] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!href) {
      setIsExternalLink(false)
      return
    }

    if (href.startsWith('ar://')) {
      // ar:// URLs are external links that wayfinder will handle
      setIsExternalLink(true)
    } else {
      // Check if it's an external link
      const isExternal =
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('//') ||
        (isClient &&
          !href.startsWith('/') &&
          !href.startsWith('#') &&
          !href.startsWith('?'))
      setIsExternalLink(isExternal)
    }
  }, [href, isClient])

  // Don't render anything if href is undefined
  if (!href) {
    return <span {...props}>{children}</span>
  }

  // For external links (including ar:// URLs), use regular anchor tag
  if (isExternalLink) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1"
        {...props}
      >
        {children}
        <SquareArrowOutUpRight className="h-3 w-3 flex-shrink-0" />
      </a>
    )
  }

  // For internal links, use Next.js Link
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}
