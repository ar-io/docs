'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Gateway = {
  settings?: {
    fqdn: string
  }
  weights: {
    compositeWeight: number
  }
}

type GatewayContextType = {
  gateways: Gateway[]
  defaultGateway: string
  isLoading: boolean
  wayfinder: any // The configured Wayfinder instance
}

const FALLBACK_GATEWAY = 'bobinstein.com'

const GatewayContext = createContext<GatewayContextType>({
  gateways: [],
  defaultGateway: FALLBACK_GATEWAY,
  isLoading: true,
  wayfinder: null,
})

export function GatewayProvider({ children }: { children: React.ReactNode }) {
  const [gateways, setGateways] = useState<Gateway[]>([])
  const [defaultGateway, setDefaultGateway] = useState(FALLBACK_GATEWAY)
  const [wayfinder, setWayfinder] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setIsLoading(false)
      return
    }

    async function setupWayfinder() {
      const currentDomain = window.location.hostname

      try {
        console.log('Setting up AR.IO SDK Wayfinder')

        // Use dynamic import for browser-compatible SDK
        const sdkModule = await import('@ar.io/sdk/web').catch((error) => {
          console.warn('Failed to import AR.IO SDK web version:', error)
          throw new Error('SDK web import failed')
        })

        const {
          Wayfinder,
          PreferredWithFallbackRoutingStrategy,
          FastestPingRoutingStrategy,
          StaticGatewaysProvider,
        } = sdkModule

        const currentGatewayUrl = `https://${currentDomain}`
        const fallbackGatewayUrl = `https://${FALLBACK_GATEWAY}`

        console.log(
          `Setting up Wayfinder with preferred gateway: ${currentDomain}`,
        )

        // Create Wayfinder with PreferredWithFallbackRoutingStrategy
        const wayfinderInstance = new Wayfinder({
          routingStrategy: new PreferredWithFallbackRoutingStrategy({
            preferredGateway: currentGatewayUrl,
            fallbackStrategy: new FastestPingRoutingStrategy({
              timeoutMs: 2000,
            }),
          }),
          gatewaysProvider: new StaticGatewaysProvider({
            gateways: [currentGatewayUrl, fallbackGatewayUrl],
          }),
        })

        // Test the setup with a timeout
        try {
          const testPromise = wayfinderInstance.resolveUrl({
            originalUrl: 'ar://test',
          })
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Wayfinder test timeout')), 3000),
          )
          await Promise.race([testPromise, timeoutPromise])
        } catch (testError) {
          console.warn(
            'Wayfinder test failed, but continuing with real SDK:',
            testError,
          )
        }

        // Setup gateway list for context
        const availableGateways: Gateway[] = [
          {
            settings: { fqdn: currentDomain },
            weights: { compositeWeight: 2 },
          },
        ]

        if (currentDomain !== FALLBACK_GATEWAY) {
          availableGateways.push({
            settings: { fqdn: FALLBACK_GATEWAY },
            weights: { compositeWeight: 1 },
          })
        }

        setWayfinder(wayfinderInstance)
        setGateways(availableGateways)
        setDefaultGateway(currentDomain)
        setIsLoading(false)

        console.log(
          `✅ Wayfinder ready with preferred gateway: ${currentDomain}`,
        )
      } catch (error) {
        console.error('Failed to setup AR.IO SDK Wayfinder:', error)

        // If SDK fails, set up minimal fallback state without mock wayfinder
        setWayfinder(null)
        setGateways([
          {
            settings: { fqdn: FALLBACK_GATEWAY },
            weights: { compositeWeight: 1 },
          },
        ])
        setDefaultGateway(FALLBACK_GATEWAY)
        setIsLoading(false)

        console.log(
          '⚠️ Wayfinder failed to initialize, components will use fallback behavior',
        )
      }
    }

    setupWayfinder()
  }, [])

  return (
    <GatewayContext.Provider
      value={{ gateways, defaultGateway, isLoading, wayfinder }}
    >
      {children}
    </GatewayContext.Provider>
  )
}

export const useGateways = () => useContext(GatewayContext)
