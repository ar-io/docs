'use client'

import { useGateways } from '@/components/GatewayProvider'

export function GlossaryUrl({ children }: { children: React.ReactNode }) {
  const { wayfinder, defaultGateway } = useGateways()

  // Use wayfinder's routing strategy to select the best gateway, with fallback
  let selectedGateway = defaultGateway

  if (wayfinder && wayfinder.routingStrategy) {
    try {
      selectedGateway = wayfinder.routingStrategy.getGateways()[0]
    } catch (error) {
      console.warn(
        'Failed to get gateway from wayfinder, using default:',
        error,
      )
    }
  }

  const url = `https://glossary.${selectedGateway}`

  return <a href={url}>{children}</a>
}
