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
  const { isLoading: gatewaysLoading, defaultGateway } = useGateways()

  useEffect(() => {
    const processUrl = () => {
      // If not ar:// link, use as-is
      if (!src.startsWith('ar://')) {
        setProcessedSrc(src)
        return
      }

      // Simple ar:// link processing without SDK
      if (!gatewaysLoading) {
        try {
          // Extract the path after ar://
          const arPath = src.slice(5) // Remove 'ar://'

          // Simple conversion: ar://txid -> https://gateway/txid
          const resolvedUrl = `https://${defaultGateway}/${arPath}`

          setProcessedSrc(resolvedUrl)
          console.log(`Resolved ar:// diagram: ${src} -> ${resolvedUrl}`)
        } catch (error) {
          console.warn('Failed to resolve ar:// diagram:', error)
          // Fallback to arweave.net
          const arPath = src.slice(5)
          setProcessedSrc(`https://arweave.net/${arPath}`)
        }
      }
    }

    processUrl()
  }, [src, gatewaysLoading, defaultGateway])

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
