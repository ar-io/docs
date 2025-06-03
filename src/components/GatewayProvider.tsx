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

const FALLBACK_GATEWAY = 'arweave.net'

const GatewayContext = createContext<GatewayContextType>({
  gateways: [],
  defaultGateway: FALLBACK_GATEWAY,
  isLoading: true,
  wayfinder: null,
})

// Create a mock wayfinder for fallback scenarios
const createMockWayfinder = (gateway: string) => ({
  resolveUrl: async ({ originalUrl }: { originalUrl: string }) => {
    const txId = originalUrl.replace('ar://', '')
    return { href: `https://${gateway}/${txId}` }
  },
  request: async ({ originalUrl }: { originalUrl: string }) => {
    const txId = originalUrl.replace('ar://', '')
    const response = await fetch(`https://${gateway}/${txId}`)
    return response
  },
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
      const isGitHubPages = window.location.hostname === 'ar-io.github.io'

      // For GitHub Pages, use a simplified approach to avoid chunk loading issues
      if (isGitHubPages) {
        console.log(
          'GitHub Pages detected, using mock wayfinder to avoid conflicts',
        )
        const mockWayfinder = createMockWayfinder(FALLBACK_GATEWAY)
        setWayfinder(mockWayfinder)
        setGateways([
          {
            settings: { fqdn: FALLBACK_GATEWAY },
            weights: { compositeWeight: 1 },
          },
        ])
        setDefaultGateway(FALLBACK_GATEWAY)
        setIsLoading(false)
        return
      }

      // For other environments, try to use the real AR.IO SDK
      try {
        console.log('Setting up real AR.IO SDK wayfinder')

        // Use dynamic import with additional error handling
        const sdkModule = await import('@ar.io/sdk').catch((error) => {
          console.warn('Failed to import AR.IO SDK:', error)
          throw new Error('SDK import failed')
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
            originalUrl: 'ar://docs',
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
        console.warn('Failed to setup AR.IO SDK, falling back to mock:', error)

        // Complete fallback to mock wayfinder
        const mockWayfinder = createMockWayfinder(FALLBACK_GATEWAY)
        setWayfinder(mockWayfinder)
        setGateways([
          {
            settings: { fqdn: FALLBACK_GATEWAY },
            weights: { compositeWeight: 1 },
          },
        ])
        setDefaultGateway(FALLBACK_GATEWAY)
        setIsLoading(false)

        console.log('✅ Mock wayfinder ready as fallback')
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
