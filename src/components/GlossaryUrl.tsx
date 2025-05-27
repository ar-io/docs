'use client'

import { useGateways } from '@/components/GatewayProvider'

export async function GlossaryUrl({ children }: { children: React.ReactNode }) {
  const { defaultGateway } = useGateways();
  const url = `https://glossary.permagate.io`.replace('permagate.io', defaultGateway);
  return <a href={url}>{children}</a>;
} 