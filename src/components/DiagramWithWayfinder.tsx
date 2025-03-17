"use client"
import React, { useState, useEffect } from 'react';
import Diagram from '@/components/Diagram';
import wayfinder from '@/utils/wayfinder';
import { useGateways } from '@/components/GatewayProvider';

interface DiagramWithWayfinderProps {
  src: string;
  title?: string;
  description?: string;
}

const DiagramWithWayfinder: React.FC<DiagramWithWayfinderProps> = ({ src, title, description }) => {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  const { defaultGateway, isLoading: gatewaysLoading } = useGateways();

  useEffect(() => {
    const processUrl = async () => {
      if (!gatewaysLoading) {
        const result = await wayfinder(src, defaultGateway);
        setProcessedSrc(result);
      }
    };

    processUrl();
  }, [src, defaultGateway, gatewaysLoading]);

  if (gatewaysLoading || !processedSrc) {
    return <div className='text-center'>Loading image from the Permaweb via <a href='/concepts/wayfinder'>Wayfinder</a>...</div>;
  }

  return <Diagram src={processedSrc} title={title} description={description} />;
};

export default DiagramWithWayfinder;
