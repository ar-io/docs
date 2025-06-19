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
      // If not ar:// link, use as-is
      if (!src.startsWith('ar://')) {
        setProcessedSrc(src)
        return
      }

      // Use real Wayfinder for ar:// links
      if (!gatewaysLoading && wayfinder) {
        try {
          const result = await wayfinder.resolveUrl({
            originalUrl: src,
          })

          setProcessedSrc(result.href)
          console.log(`Wayfinder resolved diagram: ${src} -> ${result.href}`)
        } catch (error) {
          console.warn('Error processing diagram URL with Wayfinder:', error)
          // Fallback to simple resolution
          const arPath = src.slice(5)
          const fallbackUrl = `https://${defaultGateway}/${arPath}`
          setProcessedSrc(fallbackUrl)
          console.warn('Using fallback diagram URL:', fallbackUrl)
        }
        return
      }

      // Fallback for when Wayfinder is not available
      if (!gatewaysLoading && !wayfinder) {
        const arPath = src.slice(5)
        const fallbackUrl = `https://${defaultGateway}/${arPath}`
        setProcessedSrc(fallbackUrl)
        console.warn(
          'Wayfinder not available for diagram, using fallback:',
          fallbackUrl,
        )
      }
    }

    processUrl()
  }, [src, gatewaysLoading, wayfinder, defaultGateway])

  // Show loading state while processing ar:// links
  if (src.startsWith('ar://') && (gatewaysLoading || !processedSrc)) {
    return <div>Loading diagram...</div>
  }

  return (
    <Diagram
      src={processedSrc || src}
      title={title}
      description={description}
    />
  )
}

export default DiagramWithWayfinder
