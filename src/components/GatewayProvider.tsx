'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import {
  Wayfinder,
  PreferredWithFallbackRoutingStrategy,
  FastestPingRoutingStrategy,
  StaticGatewaysProvider,
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
  wayfinder: Wayfinder | null
  isReady: boolean
}

const FALLBACK_GATEWAY = 'arweave.net'

const GatewayContext = createContext<GatewayContextType>({
  gateways: [],
  defaultGateway: FALLBACK_GATEWAY,
  wayfinder: null,
  isReady: false,
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

  const parts = hostname.split('.')
  if (parts.length >= 2) {
    // Return the last two parts (domain.tld)
    return parts.slice(-2).join('.')
  }

  return hostname
}

// Global wayfinder instance - singleton
let globalWayfinder: Wayfinder | null = null

// Create the global wayfinder instance
async function createGlobalWayfinder(): Promise<Wayfinder> {
  if (globalWayfinder) {
    return globalWayfinder
  }

  const currentDomain = window.location.hostname
  const gatewayDomain = getGatewayDomain(currentDomain)

  console.log('🚀 Creating global AR.IO Wayfinder for gateway:', gatewayDomain)

  const currentGatewayUrl = `https://${gatewayDomain}`
  const fallbackGatewayUrl = `https://${FALLBACK_GATEWAY}`

  // Set up gateways for preferred-with-fallback strategy
  const gateways = [currentGatewayUrl]

  // Always add fallback gateway if it's different from current
  if (gatewayDomain !== FALLBACK_GATEWAY) {
    gateways.push(fallbackGatewayUrl)
  }

  globalWayfinder = new Wayfinder({
    gatewaysProvider: new StaticGatewaysProvider({
      gateways,
    }),
    routingSettings: {
      strategy: new PreferredWithFallbackRoutingStrategy({
        preferredGateway: currentGatewayUrl,
        fallbackStrategy: new FastestPingRoutingStrategy({
          timeoutMs: 2000,
        }),
      }),
    },
    telemetrySettings: {
      enabled: true,
      clientName: 'ar-io-docs',
      clientVersion: '2.0.0',
      sampleRate: 1,
    } as any,
  })

  console.log('✅ Global Wayfinder created successfully')
  return globalWayfinder
}

export function GatewayProvider({ children }: { children: React.ReactNode }) {
  const [gateways, setGateways] = useState<Gateway[]>([])
  const [defaultGateway, setDefaultGateway] = useState(FALLBACK_GATEWAY)
  const [wayfinder, setWayfinder] = useState<Wayfinder | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const currentDomain = window.location.hostname
    const gatewayDomain = getGatewayDomain(currentDomain)

    // Set up basic gateway info immediately
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

    // Create the global wayfinder instance
    createGlobalWayfinder()
      .then((wayfinderInstance) => {
        setWayfinder(wayfinderInstance)
        setIsReady(true)
        console.log('✅ Gateway provider ready with global wayfinder')
      })
      .catch((error) => {
        console.error('❌ Failed to create global wayfinder:', error)
        setIsReady(false)
      })
  }, [])

  return (
    <GatewayContext.Provider
      value={{ gateways, defaultGateway, wayfinder, isReady }}
    >
      {children}
    </GatewayContext.Provider>
  )
}

export const useGateways = () => useContext(GatewayContext)

// Export utilities for use in other components
export { getGatewayDomain }
