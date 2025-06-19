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
  const [resolvedSrc, setResolvedSrc] = useState<string>(src)
  const { wayfinder, isReady } = useGateways()

  // Check if this is an ar:// link
  const isArweaveLink = src.startsWith('ar://')

  // Resolve ar:// URLs using wayfinder
  useEffect(() => {
    const resolveUrl = async () => {
      // If not an ar:// link, use as-is
      if (!isArweaveLink) {
        setResolvedSrc(src)
        return
      }

      // If wayfinder is not ready, keep the ar:// URL for now
      if (!wayfinder || !isReady) {
        setResolvedSrc(src)
        return
      }

      try {
        // Use wayfinder to resolve the URL
        const resolved = await wayfinder.resolveUrl({ originalUrl: src })
        const resolvedStr = resolved.toString()
        console.log('✅ Wayfinder resolved diagram:', src, '->', resolvedStr)
        setResolvedSrc(resolvedStr)
      } catch (error) {
        console.warn('⚠️ Wayfinder resolution failed for diagram:', src, error)
        // Keep the original ar:// URL if resolution fails
        setResolvedSrc(src)
      }
    }

    resolveUrl()
  }, [src, wayfinder, isReady, isArweaveLink])

  return <Diagram src={resolvedSrc} title={title} description={description} />
}

export default DiagramWithWayfinder
