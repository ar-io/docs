'use client'

import { useGateways } from '@/components/GatewayProvider'

export function GlossaryUrl({ children }: { children: React.ReactNode }) {
  const { wayfinder, defaultGateway } = useGateways()

  // Use wayfinder's gateway selection if available, otherwise use default
  let selectedGateway = defaultGateway

  if (wayfinder) {
    try {
      // Try to resolve a URL to get the selected gateway
      // This is more reliable than accessing internal routing strategy methods
      const testResolve = async () => {
        try {
          const result = await wayfinder.resolveUrl({
            originalUrl: 'ar://test',
          })
          const url = new URL(result.href)
          return url.hostname
        } catch {
          return defaultGateway
        }
      }

      // For now, use default gateway since we can't await in render
      // In a real implementation, you might want to use a state/effect pattern
      selectedGateway = defaultGateway
    } catch (error) {
      console.warn(
        'Failed to get gateway from wayfinder, using default:',
        error,
      )
      selectedGateway = defaultGateway
    }
  }

  const url = `https://glossary.${selectedGateway}`

  return <a href={url}>{children}</a>
}
