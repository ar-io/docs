'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

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

const FALLBACK_GATEWAY = 'arweave.net'

const GatewayContext = createContext<GatewayContextType>({
  gateways: [],
  defaultGateway: FALLBACK_GATEWAY,
  isLoading: true,
  wayfinder: null,
})

// Client-only Wayfinder implementation
function WayfinderProvider({ children }: { children: React.ReactNode }) {
  const [gateways, setGateways] = useState<Gateway[]>([])
  const [defaultGateway, setDefaultGateway] = useState(FALLBACK_GATEWAY)
  const [wayfinder, setWayfinder] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function setupWayfinder() {
      const currentDomain = window.location.hostname

      try {
        console.log('Setting up AR.IO SDK Wayfinder')

        // Dynamic import but only on client side
        const {
          Wayfinder,
          PreferredWithFallbackRoutingStrategy,
          FastestPingRoutingStrategy,
          StaticGatewaysProvider,
        } = await import('@ar.io/sdk/web')

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

        // If SDK fails, set up minimal fallback state
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

// Fallback provider for SSR
function FallbackProvider({ children }: { children: React.ReactNode }) {
  return (
    <GatewayContext.Provider
      value={{
        gateways: [],
        defaultGateway: FALLBACK_GATEWAY,
        isLoading: true,
        wayfinder: null,
      }}
    >
      {children}
    </GatewayContext.Provider>
  )
}

// Dynamic import with no SSR to avoid chunk loading issues
export const GatewayProvider = dynamic(
  () => Promise.resolve(WayfinderProvider),
  {
    ssr: false,
    loading: () => (
      <FallbackProvider>
        <div />
      </FallbackProvider>
    ),
  },
)

export const useGateways = () => useContext(GatewayContext)
