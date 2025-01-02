import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'

const guides = [
  {
    href: '/build/gateways',
    name: 'Run a Gateway',
    description: 'Get your AR.IO Gateway up and running correctly and quickly.',
  },
  {
    href: '/learn/arns',
    name: 'Use ArNS',
    description:
      'Learn the process of purchasing and managing an ArNS name.',
  },
  {
    href: '/build/guides/permaweb-deploy',
    name: 'Deploy a dApp',
    description:
      'Learn how to easily deploy a website or application on the permaweb.',
  },
  {
    href: '/learn/guides/ants-on-bazar',
    name: 'ANTs on Bazar',
    description: 'In a few simple steps, learn how to make an ANT tradable on Bazar.',
  },
  {
    href: '/build/guides/gql',
    name: 'GraphQL',
    description: 'Learn how to leverage GraphQL to efficiently fetch data via AR.IO gateways.',
  },
]

export function Guides() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="guides">
        Guides
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-4 dark:border-white/5">
        {guides.map((guide) => (
          <div key={guide.href}>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              {guide.name}
            </h3>
            <p className="mt-1 text-base text-zinc-600 dark:text-zinc-400">
              {guide.description}
            </p>
            <p className="mt-4">
              <Button href={guide.href} variant="text" arrow="right">
                Read more
              </Button>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
