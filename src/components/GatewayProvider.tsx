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

  // Extract root gateway domain from subdomains
  const getGatewayDomain = (hostname: string) => {
    // If it's localhost or an IP, use as-is
    if (
      hostname === 'localhost' ||
      hostname.includes('localhost') ||
      /^\d+\.\d+\.\d+\.\d+/.test(hostname)
    ) {
      return hostname
    }

    // For domains like docs.atticus.black, extract atticus.black
    const parts = hostname.split('.')
    if (parts.length >= 2) {
      // Return the last two parts (domain.tld)
      return parts.slice(-2).join('.')
    }

    return hostname
  }

  const gatewayDomain = getGatewayDomain(currentDomain)

  // Fallback function for basic ar:// link resolution
  const fallbackResolver = {
    resolveUrl: ({ originalUrl }: { originalUrl: string }) => {
      if (originalUrl.startsWith('ar://')) {
        const txId = originalUrl.replace('ar://', '')
        // Handle special case for ARNS names
        if (txId.match(/^[a-zA-Z0-9_-]+$/)) {
          // If it looks like an ARNS name and we're on a real gateway, try subdomain resolution
          if (
            gatewayDomain !== 'localhost' &&
            !gatewayDomain.includes('localhost')
          ) {
            return Promise.resolve(`https://${txId}.${gatewayDomain}`)
          }
        }
        return Promise.resolve(`https://${gatewayDomain}/${txId}`)
      }
      return Promise.resolve(originalUrl)
    },
  }

  // Check if we've had repeated failures and should skip SDK loading temporarily
  const failureCount = parseInt(
    localStorage?.getItem('ar-io-sdk-failures') || '0',
    10,
  )
  const lastFailure = parseInt(
    localStorage?.getItem('ar-io-sdk-last-failure') || '0',
    10,
  )
  const now = Date.now()

  // Skip SDK loading if we've had 3+ failures in the last hour
  if (failureCount >= 3 && now - lastFailure < 60 * 60 * 1000) {
    console.log(
      '⚠️ Skipping AR.IO SDK loading due to repeated failures, using fallback resolver',
    )
    return fallbackResolver
  }

  try {
    console.log('Attempting to load AR.IO SDK for Wayfinder...')

    // Add timeout to the import itself with shorter timeout for production
    const timeoutMs = process.env.NODE_ENV === 'production' ? 3000 : 10000
    const importPromise = import('@ar.io/sdk/web')
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('SDK import timeout')), timeoutMs),
    )

    const sdk = (await Promise.race([importPromise, timeoutPromise])) as any

    const {
      Wayfinder,
      PreferredWithFallbackRoutingStrategy,
      FastestPingRoutingStrategy,
      StaticGatewaysProvider,
    } = sdk

    console.log('AR.IO SDK loaded successfully, creating Wayfinder...')

    const currentGatewayUrl = `https://${gatewayDomain}`
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
      // Clear any previous failure tracking on success
      localStorage?.removeItem('ar-io-sdk-failures')
      localStorage?.removeItem('ar-io-sdk-last-failure')
    } catch (testError) {
      console.warn('Wayfinder test failed, but continuing:', testError)
    }

    return wrappedWayfinder
  } catch (error) {
    console.warn('Failed to load AR.IO SDK, using fallback resolver:', error)

    // Track failures for production resilience
    try {
      const newFailureCount = failureCount + 1
      localStorage?.setItem('ar-io-sdk-failures', newFailureCount.toString())
      localStorage?.setItem('ar-io-sdk-last-failure', Date.now().toString())

      if (newFailureCount >= 3) {
        console.log(
          '⚠️ AR.IO SDK has failed multiple times, will skip loading for 1 hour',
        )
      }
    } catch (e) {
      // Ignore localStorage errors
    }

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

    // Extract root gateway domain from subdomains - same logic as in createWayfinder
    const getGatewayDomain = (hostname: string) => {
      if (
        hostname === 'localhost' ||
        hostname.includes('localhost') ||
        /^\d+\.\d+\.\d+\.\d+/.test(hostname)
      ) {
        return hostname
      }
      const parts = hostname.split('.')
      if (parts.length >= 2) {
        return parts.slice(-2).join('.')
      }
      return hostname
    }

    const gatewayDomain = getGatewayDomain(currentDomain)

    // Always set up basic gateway info immediately
    const availableGateways: Gateway[] = [
      {
        settings: { fqdn: gatewayDomain },
        weights: { compositeWeight: 2 },
      },
    ]

    if (gatewayDomain !== FALLBACK_GATEWAY) {
      availableGateways.push({
        settings: { fqdn: FALLBACK_GATEWAY },
        weights: { compositeWeight: 1 },
      })
    }

    setGateways(availableGateways)
    setDefaultGateway(gatewayDomain)

    // Attempt to create wayfinder asynchronously
    createWayfinder()
      .then((wayfinderInstance) => {
        setWayfinder(wayfinderInstance)
        setIsLoading(false)
        console.log(
          `✅ Gateway provider ready with wayfinder for: ${gatewayDomain}`,
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
                // If it looks like an ARNS name and we're on a real gateway, try subdomain resolution
                if (
                  gatewayDomain !== 'localhost' &&
                  !gatewayDomain.includes('localhost')
                ) {
                  return Promise.resolve(`https://${txId}.${gatewayDomain}`)
                }
              }
              return Promise.resolve(`https://${gatewayDomain}/${txId}`)
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
