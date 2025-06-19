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

// Completely isolated wayfinder setup
async function createWayfinder() {
  const currentDomain = window.location.hostname

  // Fallback function for basic ar:// link resolution
  const fallbackResolver = {
    resolveUrl: ({ originalUrl }: { originalUrl: string }) => {
      if (originalUrl.startsWith('ar://')) {
        const txId = originalUrl.replace('ar://', '')
        // Handle special case for ARNS names
        if (txId.match(/^[a-zA-Z0-9_-]+$/)) {
          // If it looks like an ARNS name and we're on a gateway, try subdomain resolution
          if (
            currentDomain !== 'localhost' &&
            !currentDomain.includes('localhost')
          ) {
            return Promise.resolve(`https://${txId}.${currentDomain}`)
          }
        }
        return Promise.resolve(`https://${currentDomain}/${txId}`)
      }
      return Promise.resolve(originalUrl)
    },
  }

  try {
    console.log('Attempting to load AR.IO SDK for Wayfinder...')

    // Use standard dynamic import
    const sdk = await import('@ar.io/sdk/web')

    const {
      Wayfinder,
      PreferredWithFallbackRoutingStrategy,
      FastestPingRoutingStrategy,
      StaticGatewaysProvider,
    } = sdk

    console.log('AR.IO SDK loaded successfully, creating Wayfinder...')

    const currentGatewayUrl = `https://${currentDomain}`
    const fallbackGatewayUrl = `https://${FALLBACK_GATEWAY}`

    const wayfinder = new Wayfinder({
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

    // Wrap wayfinder to ensure it never returns undefined
    const wrappedWayfinder = {
      resolveUrl: async ({ originalUrl }: { originalUrl: string }) => {
        try {
          const result = await wayfinder.resolveUrl({ originalUrl })
          // If wayfinder returns undefined or empty, use fallback
          if (!result) {
            console.warn(
              `Wayfinder returned ${result} for ${originalUrl}, using fallback`,
            )
            return fallbackResolver.resolveUrl({ originalUrl })
          }
          // Convert URL object to string if needed
          const resultStr = result.toString()
          if (resultStr === originalUrl) {
            console.warn(
              `Wayfinder returned original URL for ${originalUrl}, using fallback`,
            )
            return fallbackResolver.resolveUrl({ originalUrl })
          }
          return resultStr
        } catch (error) {
          console.warn(
            `Wayfinder failed for ${originalUrl}, using fallback:`,
            error,
          )
          return fallbackResolver.resolveUrl({ originalUrl })
        }
      },
    }

    // Test wayfinder with a timeout
    try {
      const testResult = await Promise.race([
        wrappedWayfinder.resolveUrl({ originalUrl: 'ar://test' }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Wayfinder test timeout')), 3000),
        ),
      ])
      console.log('✅ Wayfinder test successful:', testResult)
    } catch (testError) {
      console.warn('Wayfinder test failed, but continuing:', testError)
    }

    return wrappedWayfinder
  } catch (error) {
    console.warn('Failed to load AR.IO SDK, using fallback resolver:', error)
    return fallbackResolver
  }
}

export function GatewayProvider({ children }: { children: React.ReactNode }) {
  const [gateways, setGateways] = useState<Gateway[]>([])
  const [defaultGateway, setDefaultGateway] = useState(FALLBACK_GATEWAY)
  const [wayfinder, setWayfinder] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const currentDomain = window.location.hostname

    // Always set up basic gateway info immediately
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

    setGateways(availableGateways)
    setDefaultGateway(currentDomain)

    // Attempt to create wayfinder asynchronously
    createWayfinder()
      .then((wayfinderInstance) => {
        setWayfinder(wayfinderInstance)
        setIsLoading(false)
        console.log(
          `✅ Gateway provider ready with wayfinder for: ${currentDomain}`,
        )
      })
      .catch((error) => {
        console.error('Gateway provider failed to initialize wayfinder:', error)
        // Create a basic fallback resolver
        const fallbackResolver = {
          resolveUrl: ({ originalUrl }: { originalUrl: string }) => {
            if (originalUrl.startsWith('ar://')) {
              const txId = originalUrl.replace('ar://', '')
              // Handle special case for ARNS names
              if (txId.match(/^[a-zA-Z0-9_-]+$/)) {
                // If it looks like an ARNS name and we're on a gateway, try subdomain resolution
                if (
                  currentDomain !== 'localhost' &&
                  !currentDomain.includes('localhost')
                ) {
                  return Promise.resolve(`https://${txId}.${currentDomain}`)
                }
              }
              return Promise.resolve(`https://${currentDomain}/${txId}`)
            }
            return Promise.resolve(originalUrl)
          },
        }
        setWayfinder(fallbackResolver)
        setIsLoading(false)
        console.log('⚠️ Gateway provider using fallback resolver')
      })
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
