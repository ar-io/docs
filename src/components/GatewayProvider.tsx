'use client'

import { createContext, useContext, useEffect, useState } from 'react'
// import { ARIO, AOProcess } from '@ar.io/sdk/web';
// const { connect } = require("@permaweb/aoconnect");
const { Wayfinder, StaticGatewaysProvider } = require('@ar.io/sdk')

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
}

const GatewayContext = createContext<GatewayContextType>({
  gateways: [],
  defaultGateway: 'arweave.net',
  isLoading: true,
})

export function GatewayProvider({ children }: { children: React.ReactNode }) {
  const [gateways, setGateways] = useState<Gateway[]>([])
  const [defaultGateway, setDefaultGateway] = useState('arweave.net')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function testGatewayWithWayfinder() {
      try {
        const currentDomain = window.location.hostname
        const currentGatewayUrl = `https://${currentDomain}`
        const fallbackGatewayUrl = 'https://arweave.net'

        console.log(`Testing current domain: ${currentDomain}`)

        let availableGateways: Gateway[] = []
        let primaryGateway = 'arweave.net'

        // First, try with the current host
        try {
          const wayfinder = new Wayfinder({
            gatewaysProvider: new StaticGatewaysProvider({
              gateways: [currentGatewayUrl],
            }),
          })

          console.log(`Testing gateway: ${currentGatewayUrl}`)
          const testUrl = await wayfinder.resolveUrl({
            originalUrl: 'ar://docs',
          })
          console.log(
            `Successfully resolved URL with current gateway: ${testUrl}`,
          )

          // If we get here, the current gateway works - prioritize it
          availableGateways.push({
            settings: { fqdn: currentDomain },
            weights: { compositeWeight: 2 },
          })
          primaryGateway = currentDomain

          // Add fallback as secondary option (only if current host is not arweave.net)
          if (currentDomain !== 'arweave.net') {
            availableGateways.push({
              settings: { fqdn: 'arweave.net' },
              weights: { compositeWeight: 1 },
            })
          }
        } catch (error) {
          console.log(
            `Current gateway ${currentGatewayUrl} failed, using fallback`,
          )
          console.error('Current gateway error:', error)

          // Test fallback gateway to ensure it's working
          try {
            const fallbackWayfinder = new Wayfinder({
              gatewaysProvider: new StaticGatewaysProvider({
                gateways: [fallbackGatewayUrl],
              }),
            })

            console.log(`Testing fallback gateway: ${fallbackGatewayUrl}`)
            const fallbackUrl = await fallbackWayfinder.resolveUrl({
              originalUrl: 'ar://docs',
            })
            console.log(
              `Successfully resolved URL with fallback gateway: ${fallbackUrl}`,
            )
          } catch (fallbackError) {
            console.error('Fallback gateway also failed:', fallbackError)
          }

          // Only use fallback since current host failed
          availableGateways.push({
            settings: { fqdn: 'arweave.net' },
            weights: { compositeWeight: 1 },
          })
          primaryGateway = 'arweave.net'
        }

        setGateways(availableGateways)
        setDefaultGateway(primaryGateway)
        console.log('gateways', availableGateways)
        setIsLoading(false)
      } catch (error) {
        console.error('Error testing gateways with Wayfinder:', error)
        // Ensure fallback is always available even if everything fails
        setGateways([
          {
            settings: { fqdn: 'arweave.net' },
            weights: { compositeWeight: 1 },
          },
        ])
        setDefaultGateway('arweave.net')
        setIsLoading(false)
      }
    }

    testGatewayWithWayfinder()
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
    <GatewayContext.Provider value={{ gateways, defaultGateway, isLoading }}>
      {children}
    </GatewayContext.Provider>
  )
}

export const useGateways = () => useContext(GatewayContext)
