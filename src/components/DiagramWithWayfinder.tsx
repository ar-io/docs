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
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedGateway, setSelectedGateway] = useState<string | null>(null)
  const { wayfinder, isReady } = useGateways()

  // Check if this is an ar:// link
  const isArweaveLink = src.startsWith('ar://')

  // Resolve ar:// URLs using wayfinder
  useEffect(() => {
    const resolveUrl = async () => {
      // If not an ar:// link, use as-is
      if (!isArweaveLink) {
        setResolvedSrc(src)
        setSelectedGateway(null)
        return
      }

      // If wayfinder is not ready, keep the ar:// URL for now
      if (!wayfinder || !isReady) {
        setResolvedSrc(src)
        setSelectedGateway(null)
        return
      }

      try {
        setIsLoading(true)
        console.log('🚀 Fetching diagram data via wayfinder:', src)

        // Add event listener to track which gateway was selected
        wayfinder.emitter.on('routing-succeeded', (event) => {
          console.log('🎯 Wayfinder selected gateway:', {
            originalUrl: event.originalUrl,
            selectedGateway: event.selectedGateway,
            redirectUrl: event.redirectUrl,
          })
          setSelectedGateway(event.selectedGateway)
        })

        // Use wayfinder to actually fetch the data
        const response = await wayfinder.request(src)

        console.log('📡 Wayfinder response details:', {
          url: src,
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          size: response.headers.get('content-length') || 'unknown',
        })

        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`,
          )
        }

        // Convert response to blob and create object URL
        const blob = await response.blob()
        const blobUrl = URL.createObjectURL(blob)

        console.log('✅ Wayfinder fetched diagram data:', {
          originalUrl: src,
          blobUrl: blobUrl,
          blobSize: blob.size,
          blobType: blob.type,
          note: 'Blob URL is always relative to current origin (localhost:3000), but data was fetched from selected gateway',
        })
        setResolvedSrc(blobUrl)
      } catch (error) {
        console.warn('⚠️ Wayfinder request failed for diagram:', src, error)
        // Keep the original ar:// URL if request fails
        setResolvedSrc(src)
        setSelectedGateway(null)
      } finally {
        setIsLoading(false)
      }
    }

    resolveUrl()

    // Cleanup function to revoke blob URLs
    return () => {
      if (resolvedSrc.startsWith('blob:')) {
        URL.revokeObjectURL(resolvedSrc)
      }
    }
  }, [src, wayfinder, isReady, isArweaveLink])

  // Show loading state for ar:// links
  if (isArweaveLink && isLoading) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex h-64 w-full animate-pulse items-center justify-center rounded bg-gray-200">
          <span className="text-gray-500">Loading diagram...</span>
        </div>
        {(title || description) && (
          <p className="mt-2 text-center text-sm">
            {title && <strong>{title}</strong>}
            {title && description && ': '}
            {description}
          </p>
        )}
      </div>
    )
  }

  return (
    <Diagram
      src={resolvedSrc}
      title={title}
      description={description}
      originalSrc={isArweaveLink ? src : undefined}
      selectedGateway={selectedGateway}
    />
  )
}

export default DiagramWithWayfinder
