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
        const matchingGateway = allGateways.find(
          gateway => gateway.settings?.fqdn === currentDomain
        );
        // console.log("host name")
        // console.log(window.location.hostname)
        setDefaultGateway(matchingGateway?.settings?.fqdn || 'arweave.net');
        // console.log("default gateway")
        // console.log(defaultGateway)
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