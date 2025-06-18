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
  const [processedSrc, setProcessedSrc] = useState<string | null>(null)
  const {
    wayfinder,
    isLoading: gatewaysLoading,
    defaultGateway,
  } = useGateways()

  useEffect(() => {
    const processUrl = async () => {
      if (!gatewaysLoading && wayfinder) {
        try {
          const result = await wayfinder.resolveUrl({
            originalUrl: src,
          })

          setProcessedSrc(result.href)
        } catch (error) {
          console.error('Error resolving URL with Wayfinder:', error)
          // Fallback to original src if wayfinder fails
          setProcessedSrc(src)
        }
      } else if (!gatewaysLoading && !wayfinder && src.startsWith('ar://')) {
        // Fallback: If wayfinder is not available, construct URL manually using default gateway
        const txId = src.replace('ar://', '')
        const fallbackUrl = `https://${defaultGateway}/${txId}`
        setProcessedSrc(fallbackUrl)
        console.warn(
          'Wayfinder not available for diagram, using fallback URL construction for:',
          src,
        )
      } else if (!gatewaysLoading) {
        // For non-ar:// URLs, use as-is
        setProcessedSrc(src)
      }
    }

    processUrl()
  }, [src, wayfinder, gatewaysLoading, defaultGateway])

  if (gatewaysLoading || !processedSrc) {
    return (
      <div className="text-center">
        Loading image from the Permaweb via{' '}
        <a href="/concepts/wayfinder">Wayfinder</a>...
      </div>
    )
  }

  return <Diagram src={processedSrc} title={title} description={description} />
}

export default DiagramWithWayfinder
