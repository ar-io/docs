'use client'

import { createContext, useContext, useState, useEffect } from 'react'

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
  wayfinderReady: boolean
}

const FALLBACK_GATEWAY = 'arweave.net'

const GatewayContext = createContext<GatewayContextType>({
  gateways: [],
  defaultGateway: FALLBACK_GATEWAY,
  isLoading: false,
  wayfinderReady: false,
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

// Simple txId validation (43 characters, alphanumeric + - and _)
const isValidTxId = (str: string): boolean => {
  return /^[a-zA-Z0-9_-]{43}$/.test(str)
}

// Simple ARNS name validation (basic domain-like format)
const isValidArnsName = (str: string): boolean => {
  return (
    /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(str) &&
    str.length > 0 &&
    str.length <= 51
  )
}

export function GatewayProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)
  const [wayfinderReady, setWayfinderReady] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Try to load wayfinder-react
    const loadWayfinder = async () => {
      try {
        await import('@ar.io/wayfinder-react')
        setWayfinderReady(true)
        console.log('✅ Wayfinder-react loaded successfully')
      } catch (error) {
        console.warn('⚠️ Failed to load wayfinder-react:', error)
        setWayfinderReady(false)
      }
    }

    loadWayfinder()
  }, [])

  // During SSR, provide basic context
  if (!isClient) {
    return (
      <GatewayContext.Provider
        value={{
          gateways: [],
          defaultGateway: FALLBACK_GATEWAY,
          isLoading: true,
          wayfinderReady: false,
        }}
      >
        {children}
      </GatewayContext.Provider>
    )
  }

  const currentDomain = window.location.hostname
  const gatewayDomain = getGatewayDomain(currentDomain)

  // Set up gateway info
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

  return (
    <GatewayContext.Provider
      value={{
        gateways: availableGateways,
        defaultGateway: gatewayDomain,
        isLoading: false,
        wayfinderReady,
      }}
    >
      {children}
    </GatewayContext.Provider>
  )
}

export const useGateways = () => useContext(GatewayContext)

// Export utilities for use in other components
export { isValidTxId, isValidArnsName, getGatewayDomain }
