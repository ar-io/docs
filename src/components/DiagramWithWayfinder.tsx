'use client'
import React, { useState, useEffect } from 'react'
import Diagram from '@/components/Diagram'
import { useGateways } from '@/components/GatewayProvider'
import { arnsRegex, txIdRegex } from '@ar.io/wayfinder-core'

interface DiagramWithWayfinderProps {
  src: string
  title?: string
  description?: string
}

// Extract root gateway domain from subdomains
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

// Create fallback resolver with proper transaction ID vs ARNS name detection
const createFallbackUrlResolver = (gatewayDomain: string) => {
  return (originalUrl: string) => {
    if (originalUrl.startsWith('ar://')) {
      const identifier = originalUrl.replace('ar://', '')

      // Use the regex patterns from wayfinder-core to properly detect ARNS vs transaction IDs
      if (arnsRegex.test(identifier)) {
        // This is an ARNS name - use subdomain resolution
        if (
          gatewayDomain !== 'localhost' &&
          !gatewayDomain.includes('localhost')
        ) {
          return `https://${identifier}.${gatewayDomain}`
        }
        // For localhost, use path-based resolution for ARNS too
        return `https://${gatewayDomain}/${identifier}`
      } else if (txIdRegex.test(identifier)) {
        // This is a transaction ID - always use path-based resolution
        return `https://${gatewayDomain}/${identifier}`
      } else {
        // Unknown format, default to path-based
        return `https://${gatewayDomain}/${identifier}`
      }
    }
    return originalUrl
  }
}

const DiagramWithWayfinder: React.FC<DiagramWithWayfinderProps> = ({
  src,
  title,
  description,
}) => {
  const [processedSrc, setProcessedSrc] = useState<string>(src)
  const [isClient, setIsClient] = useState(false)
  const {
    wayfinder,
    isLoading: gatewaysLoading,
    defaultGateway,
  } = useGateways()

  // Set client-side flag
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const processUrl = async () => {
      // If not ar:// link, use as-is
      if (!src.startsWith('ar://')) {
        setProcessedSrc(src)
        return
      }

      // If wayfinder is not ready yet, use basic fallback
      if (!wayfinder || gatewaysLoading) {
        const currentDomain = isClient ? window.location.hostname : 'localhost'
        const gatewayDomain = getGatewayDomain(currentDomain)
        const fallbackResolver = createFallbackUrlResolver(gatewayDomain)
        setProcessedSrc(fallbackResolver(src))
        return
      }

      try {
        // Use real Wayfinder for ar:// links
        const resolvedUrl = await wayfinder.resolveUrl({ originalUrl: src })
        console.log('Wayfinder resolved diagram:', src, '->', resolvedUrl)
        setProcessedSrc(resolvedUrl || src)
      } catch (error) {
        console.warn('Wayfinder failed for diagram:', error)
        // Fallback to basic URL construction using proper logic
        const currentDomain = isClient
          ? window.location.hostname
          : defaultGateway
        const gatewayDomain = getGatewayDomain(currentDomain)
        const fallbackResolver = createFallbackUrlResolver(gatewayDomain)
        setProcessedSrc(fallbackResolver(src))
      }
    }

    processUrl()
  }, [src, wayfinder, gatewaysLoading, defaultGateway, isClient])

  return <Diagram src={processedSrc} title={title} description={description} />
}

export default DiagramWithWayfinder
