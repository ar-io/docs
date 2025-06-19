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
  const finalHref = processedHref || href || ''
  const isExternalLink =
    finalHref.startsWith('http://') ||
    finalHref.startsWith('https://') ||
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

      // Use real Wayfinder for ar:// links
      if (!gatewaysLoading && wayfinder && href.startsWith('ar://')) {
        try {
          const result = await wayfinder.resolveUrl({
            originalUrl: href,
          })

          setProcessedHref(result.href)
          console.log(`Wayfinder resolved: ${href} -> ${result.href}`)
        } catch (error) {
          console.warn('Error processing URL with Wayfinder:', error)
          // Fallback to simple resolution
          const arPath = href.slice(5)
          const fallbackUrl = `https://${defaultGateway}/${arPath}`
          setProcessedHref(fallbackUrl)
          console.warn('Using fallback URL construction:', fallbackUrl)
        }
        return
      }

      // Fallback for when Wayfinder is not available
      if (!gatewaysLoading && !wayfinder && href.startsWith('ar://')) {
        const arPath = href.slice(5)
        const fallbackUrl = `https://${defaultGateway}/${arPath}`
        setProcessedHref(fallbackUrl)
        console.warn('Wayfinder not available, using fallback:', fallbackUrl)
        return
      }

      // Default case
      setProcessedHref(href)
    }

    processUrl()
  }, [href, gatewaysLoading, wayfinder, defaultGateway])

  // Show loading state while processing
  if (gatewaysLoading || processedHref === null) {
    return <span>{children}</span>
  }

  const linkProps = {
    ...props,
    href: processedHref,
    ...(isExternalLink && {
      target: '_blank',
      rel: 'noopener noreferrer',
    }),
  }

  return (
    <Link {...linkProps}>
      {children}
      {isExternalLink && (
        <SquareArrowOutUpRight className="ml-1 inline h-3 w-3" />
      )}
    </Link>
  )
}
