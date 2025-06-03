'use client'

import { createContext, useContext, useEffect, useState } from 'react'

// Only import and use wayfinder on the client side
let Wayfinder: any,
  PreferredWithFallbackRoutingStrategy: any,
  FastestPingRoutingStrategy: any,
  StaticGatewaysProvider: any

if (typeof window !== 'undefined') {
  const sdk = require('@ar.io/sdk')
  Wayfinder = sdk.Wayfinder
  PreferredWithFallbackRoutingStrategy =
    sdk.PreferredWithFallbackRoutingStrategy
  FastestPingRoutingStrategy = sdk.FastestPingRoutingStrategy
  StaticGatewaysProvider = sdk.StaticGatewaysProvider
}

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

    async function setupWayfinderWithPreferredGateway() {
      try {
        // Use dynamic import instead of require to prevent webpack conflicts
        const {
          Wayfinder,
          PreferredWithFallbackRoutingStrategy,
          FastestPingRoutingStrategy,
          StaticGatewaysProvider,
        } = await import('@ar.io/sdk')

        const currentDomain = window.location.hostname
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

        // Test the setup with a simple resolution (with timeout for static deployments)
        const testPromise = wayfinderInstance.resolveUrl({
          originalUrl: 'ar://docs',
        })

        // Add timeout for static deployments where network requests might fail
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Wayfinder test timeout')), 5000),
        )

        try {
          await Promise.race([testPromise, timeoutPromise])
        } catch (testError) {
          console.warn(
            'Wayfinder test failed, continuing with basic setup:',
            testError,
          )
        }

        // Setup gateway list for context (current domain gets priority)
        const availableGateways: Gateway[] = [
          {
            settings: { fqdn: currentDomain },
            weights: { compositeWeight: 2 }, // Higher weight for preferred
          },
        ]

        // Add fallback if it's different from current domain
        if (currentDomain !== FALLBACK_GATEWAY) {
          availableGateways.push({
            settings: { fqdn: FALLBACK_GATEWAY },
            weights: { compositeWeight: 1 }, // Lower weight for fallback
          })
        }

        setWayfinder(wayfinderInstance)
        setGateways(availableGateways)
        setDefaultGateway(currentDomain)
        setIsLoading(false)

        // Only log success, not verbose details
        console.log(
          `✅ Wayfinder ready with preferred gateway: ${currentDomain}`,
        )
      } catch (error) {
        console.error('Error setting up Wayfinder:', error)

        // Enhanced fallback to basic configuration for static deployments
        try {
          const { Wayfinder, StaticGatewaysProvider } = await import(
            '@ar.io/sdk'
          )

          const fallbackWayfinder = new Wayfinder({
            gatewaysProvider: new StaticGatewaysProvider({
              gateways: [`https://${FALLBACK_GATEWAY}`],
            }),
          })

          setWayfinder(fallbackWayfinder)
          setGateways([
            {
              settings: { fqdn: FALLBACK_GATEWAY },
              weights: { compositeWeight: 1 },
            },
          ])
          setDefaultGateway(FALLBACK_GATEWAY)
          setIsLoading(false)

          console.log('✅ Wayfinder fallback configuration loaded')
        } catch (fallbackError) {
          console.error(
            'Critical error: Failed to initialize Wayfinder fallback:',
            fallbackError,
          )
          // Set a basic mock wayfinder as last resort
          setWayfinder({
            resolveUrl: async ({ originalUrl }: { originalUrl: string }) => {
              const txId = originalUrl.replace('ar://', '')
              return { href: `https://${FALLBACK_GATEWAY}/${txId}` }
            },
          })
          setDefaultGateway(FALLBACK_GATEWAY)
          setIsLoading(false)
        }
      }
    }

    setupWayfinderWithPreferredGateway()
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
