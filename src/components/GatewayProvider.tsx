'use client'

import { createContext, useContext, useEffect, useState } from 'react'
// import { ARIO, AOProcess } from '@ar.io/sdk/web';
// const { connect } = require("@permaweb/aoconnect");
const {
  Wayfinder,
  PreferredWithFallbackRoutingStrategy,
  FastestPingRoutingStrategy,
  StaticGatewaysProvider,
} = require('@ar.io/sdk')

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
    async function setupWayfinderWithPreferredGateway() {
      try {
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
            timeoutMs: 3000, // Give preferred gateway 3 seconds
            maxRetries: 2, // Try preferred gateway twice before falling back
          }),
          gatewaysProvider: new StaticGatewaysProvider({
            gateways: [currentGatewayUrl, fallbackGatewayUrl],
          }),
          logger: {
            debug: () => {}, // Disable debug logging
            info: () => {}, // Disable info logging
            warn: console.warn,
            error: console.error,
          },
        })

        // Test the setup with a simple resolution
        await wayfinderInstance.resolveUrl({
          originalUrl: 'ar://docs',
        })

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

        // Fallback to basic configuration
        const fallbackWayfinder = new Wayfinder({
          gatewaysProvider: new StaticGatewaysProvider({
            gateways: [`https://${FALLBACK_GATEWAY}`],
          }),
          logger: {
            debug: () => {}, // Disable debug logging
            info: () => {}, // Disable info logging
            warn: console.warn,
            error: console.error,
          },
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
      }
    }

    setupWayfinderWithPreferredGateway()
  }, [])

  // Commented out original ARIO-based implementation
  /*
  useEffect(() => {
    const currenDomain = window.location.hostname
    try{
      const ario = ARIO.init({
        process: new AOProcess({
          processId: 'qNvAoz0TgcH7DMg8BCVn8jF32QH5L6T29VjHxhHqqGE',
          ao: connect({
            CU_URL: 'https://cu.ardrive.io',
          }),
        }),
      })
    } catch (error) {
      console.error('Error initializing ARIO:', error);
    }

    console.log(`host: ${currenDomain}`)

    async function checkGateway() {
      const gateway = await ario.getGateway(currenDomain)
      console.log(`gateway: ${gateway}`)
    }

    checkGateway()
  },[])

  useEffect(() => {
    async function fetchGateways() {
      try {
        const ario = ARIO.init({
          process: new AOProcess({
            processId: "qNvAoz0TgcH7DMg8BCVn8jF32QH5L6T29VjHxhHqqGE",
            ao: connect({
              CU_URL: 'https://cu.ardrive.io',
            }),
          }),
        });

        let allGateways: Gateway[] = [];
        let hasMore = true;
        let cursor: string | undefined;

        while (hasMore) {
          const response = await ario.getGateways({
            limit: 1000,
            cursor,
            sortBy: 'weights.compositeWeight',
            sortOrder: 'desc',
          });

          allGateways = [...allGateways, ...response.items];
          hasMore = response.hasMore;
          cursor = response.nextCursor;
        }

        setGateways(allGateways);

        // Check if current domain matches any gateway
        const currentDomain = window.location.hostname;
        
        // Find all matching gateways (where fqdn is included in hostname)
        const matchingGateways = allGateways.filter(
          gateway => currentDomain.includes(gateway.settings?.fqdn || '')
        );

        // Find the gateway that most closely matches the current hostname
        const bestMatch = matchingGateways.reduce((best, current) => {
          if (!best) return current;
          
          const currentFqdn = current.settings?.fqdn || '';
          const bestFqdn = best.settings?.fqdn || '';
          
          // If one gateway's fqdn is longer than the other, prefer the longer one
          // as it's likely more specific to the current domain
          if (currentFqdn.length !== bestFqdn.length) {
            return currentFqdn.length > bestFqdn.length ? current : best;
          }
          
          // If lengths are equal, prefer the one that appears later in the hostname
          // as it's likely more specific to the current domain
          const currentIndex = currentDomain.indexOf(currentFqdn);
          const bestIndex = currentDomain.indexOf(bestFqdn);
          return currentIndex > bestIndex ? current : best;
        }, null as Gateway | null);

        setDefaultGateway(bestMatch?.settings?.fqdn || 'arweave.net');
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching gateways:', error);
        setIsLoading(false);
      }
    }

    fetchGateways();
  }, []);
  */

  return (
    <GatewayContext.Provider
      value={{ gateways, defaultGateway, isLoading, wayfinder }}
    >
      {children}
    </GatewayContext.Provider>
  )
}

export const useGateways = () => useContext(GatewayContext)
