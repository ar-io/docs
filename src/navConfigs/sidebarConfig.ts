import { NavGroup } from '@/components/Navigation'
import { title } from 'process'

export const mainNavigation: Array<NavGroup> = [
  {
    title: 'General',
    links: [
      {
        title: 'Introduction',
        href: '/learn/introduction',
      },

      {
        title: 'Guides',
        children: [
          {
            title: 'ANTs on Bazar',
            href: '/learn/guides/ants-on-bazar',
          },
        ],
      },
      {
        title: 'Foundation',
        href: '/learn/foundation',
      },
      {
        title: 'ar.io Labs',
        href: '/learn/labs',
      },
      {
        title: 'Token',
        href: '/learn/token',
      },
    ],
  },
  {
    title: 'Concepts',
    links: [
      {
        title: 'ArNS',
        href: '/learn/concepts/arns',
      },
      {
        title: 'Arweave',
        href: '/learn/concepts/arweave',
      },
      {
        title: 'Manifests',
        href: '/learn/concepts/manifests',
      },
      {
        title: 'Normalized Addresses',
        href: '/learn/concepts/normalized-addresses',
      },
      {
        title: 'Sandboxing',
        href: '/learn/concepts/sandboxing',
      },
      {
        title: 'Wayfinder',
        href: '/learn/concepts/wayfinder',
      },
    ],
  },
  {
    title: 'Guides',
    links: [
      {
        title: 'ANTs on Bazar',
        href: '/learn/guides/ants-on-bazar',
      },
    ],
  },
]

export const secondaryNavigation: Array<NavGroup> = [
  {
    title: 'ar.io SDK',
    links: [
      {
        title: 'Info',
        href: '/build/ar-io-sdk',
      },
      {
        title: 'Getting Started',
        href: '/build/ar-io-sdk/getting-started',
      },
      {
        title: "Release Notes",
        href: "/build/ar-io-sdk/release-notes"
      },
      {
        title: "ARIO class",
        children: [
            {
                title: "General",
                children: [
                    {
                        title: "getInfo",
                        href: "/build/ar-io-sdk/ario/general/get-info"
                    },
                    {
                        title: "getTokenSupply",
                        href: "/build/ar-io-sdk/ario/general/get-token-supply"
                    },
                    {
                        title: "getBalance",
                        href: "/build/ar-io-sdk/ario/general/get-balance"
                    },
                    {
                        title: "getBalances",
                        href: "/build/ar-io-sdk/ario/general/get-balances"
                    },
                    {
                        title: "transfer",
                        href: "/build/ar-io-sdk/ario/general/transfer"
                    }
                ]
            },
            {
                title: "Gateways",
                children: [
                    {
                        title: "getGateway",
                        href: "/build/ar-io-sdk/gateways/get-gateway"
                    },
                    {
                        title: "getGateways",
                        href: "/build/ar-io-sdk/gateways/get-gateways"
                    },
                    {
                        title: "joinNetwork",
                        href: "/build/ar-io-sdk/gateways/join-network"
                    },
                    {
                        title: "leaveNetwork",
                        href: "/build/ar-io-sdk/gateways/leave-network"
                    },
                    {
                        title: "updateGatewaySettings",
                        href: "/build/ar-io-sdk/gateways/update-gateway-settings"
                    },
                    {
                        title: "increaseOperatorStake",
                        href: "/build/ar-io-sdk/gateways/increase-operator-stake"
                    },
                    {
                        title: "decreaseOperatorStake",
                        href: "/build/ar-io-sdk/gateways/decrease-operator-stake"
                    },
                    {
                        title: "increaseDelegateStake",
                        href: "/build/ar-io-sdk/gateways/increase-delegate-stake"
                    },
                    {
                        title: "decreaseDelegateStake",
                        href: "/build/ar-io-sdk/gateways/decrease-delegate-stake"
                    },
                    {
                        title: "instantWithdrawal",
                        href: "/build/ar-io-sdk/gateways/instant-withdrawal"
                    },
                    {
                        title: "cancelWithdrawal",
                        href: "/build/ar-io-sdk/gateways/cancel-withdrawal"
                    },
                    {
                        title: "redelegateStake",
                        href: "/build/ar-io-sdk/gateways/redelegate-stake"
                    },
                    {
                        title: "getRedelegationFee",
                        href: "/build/ar-io-sdk/gateways/get-redelegation-fee"
                    },
                    {
                        title: "getDelegations",
                        href: "/build/ar-io-sdk/gateways/get-delegations"
                    },
                    {
                        title: "getAllowedDelegates",
                        href: "/build/ar-io-sdk/gateways/get-allowed-delegates"
                    },
                    {
                        title: "getGatewayDelegates",
                        href: "/build/ar-io-sdk/gateways/get-gateway-delegates"
                    },
                    {
                        title: "getGatewayVaults",
                        href: "/build/ar-io-sdk/gateways/get-gateway-vaults"
                    },
                ]
            },
            
        ]
      },

    ],
  },
]
