"use client"
import React, { useState, useEffect } from 'react';
import Diagram from '@/components/Diagram';
import wayfinder from '@/utils/wayfinder';

interface DiagramWithWayfinderProps {
  src: string;
  title?: string;
  description?: string;
}

const DiagramWithWayfinder: React.FC<DiagramWithWayfinderProps> = ({ src, title, description }) => {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);

  useEffect(() => {
    const processUrl = async () => {
      const result = await wayfinder(src);
      setProcessedSrc(result);
    };

    processUrl();
  }, [src]);

  if (!processedSrc) {
    // Show a loading state
    return <div className='text-center'>Loading image...</div>;
  }

  return <Diagram src={processedSrc} title={title} description={description} />;
};

export default DiagramWithWayfinder;
