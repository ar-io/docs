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
  const [processedHref, setProcessedHref] = useState<string | null>(null)
  const {
    wayfinder,
    isLoading: gatewaysLoading,
    defaultGateway,
  } = useGateways()

  // Check if this was originally an ar:// link
  const isArweaveLink =
    href && typeof href === 'string' && href.startsWith('ar://')

  // Check if the final processed href is an external link
  const finalHref = processedHref || href
  const isExternalLink =
    (finalHref &&
      typeof finalHref === 'string' &&
      (finalHref.startsWith('http://') || finalHref.startsWith('https://'))) ||
    isArweaveLink

  useEffect(() => {
    const processUrl = async () => {
      // Ensure href is a string before processing
      if (!href || typeof href !== 'string') {
        setProcessedHref(href || null)
        return
      }

      // Skip processing for internal links (starting with / or #)
      if (href.startsWith('/') || href.startsWith('#')) {
        setProcessedHref(href)
        return
      }

      // Skip processing for non-ar:// external links
      if (!href.startsWith('ar://')) {
        setProcessedHref(href)
        return
      }

      if (!gatewaysLoading && wayfinder) {
        try {
          const result = await wayfinder.resolveUrl({
            originalUrl: href,
          })

          setProcessedHref(result.href)
        } catch (error) {
          console.error('Error processing URL with Wayfinder:', error)
          setProcessedHref(href) // Fallback to original href
        }
      } else if (!gatewaysLoading && !wayfinder && href.startsWith('ar://')) {
        // Fallback: If wayfinder is not available, construct URL manually using default gateway
        const txId = href.replace('ar://', '')
        const fallbackUrl = `https://${defaultGateway}/${txId}`
        setProcessedHref(fallbackUrl)
        console.warn(
          'Wayfinder not available, using fallback URL construction for:',
          href,
        )
      } else {
        setProcessedHref(href) // Fallback while loading
      }
    }

    processUrl()
  }, [href, gatewaysLoading, wayfinder, defaultGateway])

  // Show loading state for non-standard links while processing
  if (
    !processedHref &&
    href &&
    typeof href === 'string' &&
    !href.startsWith('/') &&
    !href.startsWith('#') &&
    !href.startsWith('http')
  ) {
    return <span className="text-zinc-500">Loading link...</span>
  }

  return (
    <Link
      href={finalHref || '#'}
      target={isExternalLink ? '_blank' : '_self'}
      {...props}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {isExternalLink && (
          <SquareArrowOutUpRight className="ml-1 inline-block h-3 w-3" />
        )}
      </span>
    </Link>
  )
}
