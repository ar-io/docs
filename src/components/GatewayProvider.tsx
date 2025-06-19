'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import {
  Wayfinder,
  PreferredWithFallbackRoutingStrategy,
  FastestPingRoutingStrategy,
  StaticGatewaysProvider,
  arnsRegex,
  txIdRegex,
} from '@ar.io/wayfinder-core'

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

// Create fallback resolver with proper transaction ID vs ARNS name detection
const createFallbackResolver = (gatewayDomain: string) => {
  return {
    resolveUrl: ({ originalUrl }: { originalUrl: string }) => {
      if (originalUrl.startsWith('ar://')) {
        const identifier = originalUrl.replace('ar://', '')

        // Use the regex patterns from wayfinder-core to properly detect ARNS vs transaction IDs
        if (arnsRegex.test(identifier)) {
          // This is an ARNS name - use subdomain resolution
          if (
            gatewayDomain !== 'localhost' &&
            !gatewayDomain.includes('localhost')
          ) {
            return Promise.resolve(`https://${identifier}.${gatewayDomain}`)
          }
          // For localhost, use path-based resolution for ARNS too
          return Promise.resolve(`https://${gatewayDomain}/${identifier}`)
        } else if (txIdRegex.test(identifier)) {
          // This is a transaction ID - always use path-based resolution
          return Promise.resolve(`https://${gatewayDomain}/${identifier}`)
        } else {
          // Unknown format, default to path-based
          return Promise.resolve(`https://${gatewayDomain}/${identifier}`)
        }
      }
      return Promise.resolve(originalUrl)
    },
  }
}

// Wayfinder setup with proper error handling
async function createWayfinder() {
  const currentDomain = window.location.hostname
  const gatewayDomain = getGatewayDomain(currentDomain)
  const fallbackResolver = createFallbackResolver(gatewayDomain)

  try {
    console.log('Creating AR.IO Wayfinder for gateway:', gatewayDomain)

    const currentGatewayUrl = `https://${gatewayDomain}`
    const fallbackGatewayUrl = `https://${FALLBACK_GATEWAY}`

    const wayfinder = new Wayfinder({
      gatewaysProvider: new StaticGatewaysProvider({
        gateways: [currentGatewayUrl, fallbackGatewayUrl],
      }),
      routingSettings: {
        strategy: new PreferredWithFallbackRoutingStrategy({
          preferredGateway: currentGatewayUrl,
          fallbackStrategy: new FastestPingRoutingStrategy({
            timeoutMs: 2000,
          }),
        }),
      },
    })

    // Wrap wayfinder to ensure it never returns undefined and handle errors gracefully
    const wrappedWayfinder = {
      resolveUrl: async ({ originalUrl }: { originalUrl: string }) => {
        try {
          const result = await wayfinder.resolveUrl({ originalUrl })
          const resultStr = result.toString()
          console.log('✅ Wayfinder resolved:', originalUrl, '->', resultStr)
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

    // Test wayfinder with a simple resolution
    try {
      await wrappedWayfinder.resolveUrl({ originalUrl: 'ar://test' })
      console.log('✅ Wayfinder test successful')
    } catch (testError) {
      console.warn('Wayfinder test failed, but continuing:', testError)
    }

    return wrappedWayfinder
  } catch (error) {
    console.warn('Failed to create Wayfinder, using fallback resolver:', error)
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

    // Attempt to create wayfinder
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
        // Create fallback resolver
        const fallbackResolver = createFallbackResolver(gatewayDomain)
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
