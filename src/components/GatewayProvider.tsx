'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ARIO, AOProcess } from '@ar.io/sdk/web';
const { connect } = require("@permaweb/aoconnect");

type Gateway = {
  settings?: {
    fqdn: string;
  };
  weights: {
    compositeWeight: number;
  };
};

type GatewayContextType = {
  gateways: Gateway[];
  defaultGateway: string;
  isLoading: boolean;
};

const GatewayContext = createContext<GatewayContextType>({
  gateways: [],
  defaultGateway: 'arweave.net',
  isLoading: true,
});

export function GatewayProvider({ children }: { children: React.ReactNode }) {
  const [gateways, setGateways] = useState<Gateway[]>([]);
  const [defaultGateway, setDefaultGateway] = useState('arweave.net');
  const [isLoading, setIsLoading] = useState(true);


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
            // @ts-expect-error
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

  return (
    <GatewayContext.Provider value={{ gateways, defaultGateway, isLoading }}>
      {children}
    </GatewayContext.Provider>
  );
}

export const useGateways = () => useContext(GatewayContext); 