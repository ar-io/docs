'use client'

import { useGateways } from '@/components/GatewayProvider'

export function GlossaryUrl({ children }: { children: React.ReactNode }) {
  const { defaultGateway } = useGateways()

  return (
    <a
      href={`https://${defaultGateway}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline hover:text-blue-800"
    >
      {children || defaultGateway}
    </a>
  )
}
