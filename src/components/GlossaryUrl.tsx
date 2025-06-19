'use client'

import { useGateways } from '@/components/GatewayProvider'

export function GlossaryUrl({ children }: { children: React.ReactNode }) {
  const { defaultGateway } = useGateways()

  // Since wayfinder is null, just use the default gateway directly
  const selectedGateway = defaultGateway

  return (
    <a
      href={`https://${selectedGateway}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline hover:text-blue-800"
    >
      {children || selectedGateway}
    </a>
  )
}
