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
  const { isLoading: gatewaysLoading, defaultGateway } = useGateways()

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
    const processUrl = () => {
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

      // Simple ar:// link processing without SDK
      if (!gatewaysLoading && href.startsWith('ar://')) {
        try {
          // Extract the path after ar://
          const arPath = href.slice(5) // Remove 'ar://'

          // Simple conversion: ar://txid -> https://gateway/txid
          const resolvedUrl = `https://${defaultGateway}/${arPath}`

          setProcessedHref(resolvedUrl)
          console.log(`Resolved ar:// link: ${href} -> ${resolvedUrl}`)
        } catch (error) {
          console.warn('Failed to resolve ar:// link:', error)
          // Fallback to arweave.net
          const arPath = href.slice(5)
          setProcessedHref(`https://arweave.net/${arPath}`)
        }
        return
      }

      // Default case
      setProcessedHref(href)
    }

    processUrl()
  }, [href, gatewaysLoading, defaultGateway])

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
