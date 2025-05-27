'use client'
import React, { useState, useEffect } from 'react'
import Diagram from '@/components/Diagram'
import { useGateways } from '@/components/GatewayProvider'

const { Wayfinder, StaticGatewaysProvider } = require('@ar.io/sdk')

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
  const { gateways,defaultGateway, isLoading: gatewaysLoading } = useGateways()

  useEffect(() => {
    const processUrl = async () => {
      if (!gatewaysLoading && gateways[0]) {
        try {
          const wayfinder = new Wayfinder({
            gatewaysProvider: new StaticGatewaysProvider({
              gateways: [`https://${gateways[0].settings?.fqdn}`],
            }),
          })

          const result = await wayfinder.resolveUrl({
            originalUrl: src,
          })

          setProcessedSrc(result.href)
        } catch (error) {
          console.error('Error resolving URL with Wayfinder:', error)
          // Fallback to original src if wayfinder fails
          setProcessedSrc(src)
        }
      }
    }

    processUrl()
  }, [src, defaultGateway, gatewaysLoading])

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
