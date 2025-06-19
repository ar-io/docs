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
  const [processedHref, setProcessedHref] = useState<string>(href || '#')
  const [isClient, setIsClient] = useState(false)
  const [isExternalLink, setIsExternalLink] = useState(false)
  const {
    wayfinder,
    isLoading: gatewaysLoading,
    defaultGateway,
  } = useGateways()

  // Check if this was originally an ar:// link
  const isArweaveLink =
    href && typeof href === 'string' && href.startsWith('ar://')

  // Set client-side flag
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Update external link detection when processedHref changes
  useEffect(() => {
    if (!isClient) return

    const currentHostname = window.location.hostname
    const isExternal =
      processedHref &&
      (processedHref.startsWith('http://') ||
        processedHref.startsWith('https://')) &&
      !processedHref.includes(currentHostname)

    setIsExternalLink(Boolean(isExternal))
  }, [processedHref, isClient])

  useEffect(() => {
    const processUrl = async () => {
      // Always start with a valid href to prevent undefined errors
      if (!href) {
        setProcessedHref('#')
        return
      }

      // If not ar:// link, use as-is
      if (!href.startsWith('ar://')) {
        setProcessedHref(href)
        return
      }

      // Extract gateway domain from current hostname
      const getGatewayDomain = (hostname: string) => {
        if (
          hostname === 'localhost' ||
          hostname.includes('localhost') ||
          /^\d+\.\d+\.\d+\.\d+/.test(hostname)
        ) {
          return hostname
        }
        const parts = hostname.split('.')
        if (parts.length >= 2) {
          return parts.slice(-2).join('.')
        }
        return hostname
      }

      // If wayfinder is not ready yet, use basic fallback
      if (!wayfinder || gatewaysLoading) {
        const txId = href.replace('ar://', '')
        // Only access window if we're on the client
        const currentDomain = isClient ? window.location.hostname : 'localhost'
        const gatewayDomain = getGatewayDomain(currentDomain)

        // Handle ARNS names with subdomain resolution
        if (txId.match(/^[a-zA-Z0-9_-]+$/)) {
          if (
            gatewayDomain !== 'localhost' &&
            !gatewayDomain.includes('localhost')
          ) {
            setProcessedHref(`https://${txId}.${gatewayDomain}`)
            return
          }
        }
        setProcessedHref(`https://${gatewayDomain}/${txId}`)
        return
      }

      try {
        // Use real Wayfinder for ar:// links
        const resolvedUrl = await wayfinder.resolveUrl({ originalUrl: href })
        console.log('Wayfinder resolved:', href, '->', resolvedUrl)
        setProcessedHref(resolvedUrl || href)
      } catch (error) {
        console.warn('Wayfinder resolution failed:', error)
        // Fallback to basic URL construction
        const txId = href.replace('ar://', '')
        const currentDomain = isClient
          ? window.location.hostname
          : defaultGateway
        const gatewayDomain = getGatewayDomain(currentDomain)

        // Handle ARNS names with subdomain resolution
        if (txId.match(/^[a-zA-Z0-9_-]+$/)) {
          if (
            gatewayDomain !== 'localhost' &&
            !gatewayDomain.includes('localhost')
          ) {
            setProcessedHref(`https://${txId}.${gatewayDomain}`)
            return
          }
        }
        setProcessedHref(`https://${gatewayDomain}/${txId}`)
      }
    }

    processUrl()
  }, [href, wayfinder, gatewaysLoading, defaultGateway, isClient])

  // Always render with a valid href
  const finalHref = processedHref || href || '#'

  return (
    <Link href={finalHref} {...props}>
      {children}
      {(isArweaveLink || isExternalLink) && (
        <SquareArrowOutUpRight className="ml-1 inline h-3 w-3" />
      )}
    </Link>
  )
}
