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
  wayfinder: any // The configured Wayfinder instance (null for now)
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
  const [wayfinder] = useState<any>(null) // Simplified: no SDK for now
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setIsLoading(false)
      return
    }

    // Simple setup without AR.IO SDK to avoid chunk loading issues
    const currentDomain = window.location.hostname

    console.log(
      `Setting up simple gateway provider with domain: ${currentDomain}`,
    )

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

    setGateways(availableGateways)
    setDefaultGateway(currentDomain)
    setIsLoading(false)

    console.log(
      `✅ Simple gateway provider ready with domain: ${currentDomain}`,
    )
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
