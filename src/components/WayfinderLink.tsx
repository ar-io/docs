'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useGateways } from '@/components/GatewayProvider'
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
  const [resolvedHref, setResolvedHref] = useState<string>(href || '#')
  const [isClient, setIsClient] = useState(false)
  const [isExternalLink, setIsExternalLink] = useState(false)
  const { wayfinder, isReady } = useGateways()

  // Check if this is an ar:// link
  const isArweaveLink = Boolean(href?.startsWith('ar://'))

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Resolve ar:// URLs using wayfinder
  useEffect(() => {
    const resolveUrl = async () => {
      if (!href) {
        setResolvedHref('#')
        return
      }

      // If not an ar:// link, use as-is
      if (!isArweaveLink) {
        setResolvedHref(href)
        return
      }

      // If wayfinder is not ready, keep the ar:// URL for now
      if (!wayfinder || !isReady) {
        setResolvedHref(href)
        return
      }

      try {
        // Use wayfinder to resolve the URL
        const resolved = await wayfinder.resolveUrl({ originalUrl: href })
        const resolvedStr = resolved.toString()
        console.log('✅ Wayfinder resolved:', href, '->', resolvedStr)
        setResolvedHref(resolvedStr)
      } catch (error) {
        console.warn('⚠️ Wayfinder resolution failed for:', href, error)
        // Keep the original ar:// URL if resolution fails
        setResolvedHref(href)
      }
    }

    resolveUrl()
  }, [href, wayfinder, isReady, isArweaveLink])

  // Detect external links after resolution
  useEffect(() => {
    if (!isClient || !resolvedHref) return

    const currentHostname = window.location.hostname
    const isExternal =
      resolvedHref.startsWith('http://') ||
      resolvedHref.startsWith('https://') ||
      resolvedHref.startsWith('//') ||
      isArweaveLink

    // For resolved ar:// links, check if they point to a different domain
    if (isExternal && resolvedHref.startsWith('http')) {
      try {
        const url = new URL(resolvedHref)
        setIsExternalLink(url.hostname !== currentHostname)
      } catch {
        setIsExternalLink(true)
      }
    } else {
      setIsExternalLink(isExternal)
    }
  }, [resolvedHref, isClient, isArweaveLink])

  // For external links, use anchor tag with target="_blank"
  if (
    isExternalLink &&
    (resolvedHref.startsWith('http') || resolvedHref.startsWith('//'))
  ) {
    return (
      <a
        href={resolvedHref}
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
    <Link href={resolvedHref} {...props}>
      {children}
      {isArweaveLink && (
        <SquareArrowOutUpRight className="ml-1 inline h-3 w-3" />
      )}
    </Link>
  )
}
