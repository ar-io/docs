'use client'
import React, { useState, useEffect } from 'react'
import Diagram from '@/components/Diagram'
import { useGateways } from '@/components/GatewayProvider'

interface DiagramWithWayfinderProps {
  src: string
  title?: string
  description?: string
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
        const txId = src.replace('ar://', '')
        // Only access window if we're on the client
        const currentDomain = isClient ? window.location.hostname : 'localhost'

        // Handle ARNS names with subdomain resolution
        if (txId.match(/^[a-zA-Z0-9_-]+$/)) {
          if (
            currentDomain !== 'localhost' &&
            !currentDomain.includes('localhost')
          ) {
            setProcessedSrc(`https://${txId}.${currentDomain}`)
            return
          }
        }
        setProcessedSrc(`https://${currentDomain}/${txId}`)
        return
      }

      try {
        // Use real Wayfinder for ar:// links
        const resolvedUrl = await wayfinder.resolveUrl({ originalUrl: src })
        console.log('Wayfinder resolved diagram:', src, '->', resolvedUrl)
        setProcessedSrc(resolvedUrl || src)
      } catch (error) {
        console.warn('Wayfinder failed for diagram:', error)
        // Fallback to basic URL construction
        const txId = src.replace('ar://', '')
        // Only access window if we're on the client
        const currentDomain = isClient
          ? window.location.hostname
          : defaultGateway

        // Handle ARNS names with subdomain resolution
        if (txId.match(/^[a-zA-Z0-9_-]+$/)) {
          if (
            currentDomain !== 'localhost' &&
            !currentDomain.includes('localhost')
          ) {
            setProcessedSrc(`https://${txId}.${currentDomain}`)
            return
          }
        }
        setProcessedSrc(`https://${currentDomain}/${txId}`)
      }
    }

    processUrl()
  }, [src, wayfinder, gatewaysLoading, defaultGateway, isClient])

  return <Diagram src={processedSrc} title={title} description={description} />
}

export default DiagramWithWayfinder
