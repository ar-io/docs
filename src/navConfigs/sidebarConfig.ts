import { NavGroup } from "@/components/Navigation"
import { title } from "process"

export const mainNavigation: Array<NavGroup> = [
{
    title: 'Learn',
    links: [
        {
            title: "Introduction",
            href: "/learn/introduction"
        },
        {
            title: 'Concepts',
            children: [
                {
                    title: "ArNS",
                    href: "/learn/concepts/arns"
                },
                {
                    title: "Arweave",
                    href: "/learn/concepts/arweave"
                },
                {
                    title: "Manifests",
                    href: "/learn/concepts/manifests"
                },
                {
                    title: "Normalized Addresses",
                    href: "/learn/concepts/normalized-addresses"
                },
                {
                    title: "Sandboxing",
                    href: "/learn/concepts/sandboxing"
                },
                {
                    title: "Wayfinder",
                    href: "/learn/concepts/wayfinder"
                }
            ]
        },
        {
            title: "Guides",
            children: [
                // {
                //     title: "ANTs",
                //     href: "/learn/guides/ants",
                //     children: [
                //         {
                //             title: "Registering",
                //             href: "/learn/guides/ants/registering"
                //         },
                //         {
                //             title: "Managing",
                //             href: "/learn/guides/ants/managing"
                //         }
                //     ]
                // },
                {
                    title: "ANTs on Bazar",
                    href: "/learn/guides/ants-on-bazar"
                }
            ]
        },
        {
            title: "Foundation",
            href: "/learn/foundation"
        },
        {
            title: "ar.io Labs",
            href: "/learn/labs"   
        },
        {
            title: "Token",
            href: "/learn/token"   
        }
    ]
},
{
    title: "Build",
    links: [
        {
            title: "ar.io SDK",
            href: '/build/ar-io-sdk'
        },
        {
            title: "Gateways",
            href: "/build/gateways"
        },
        {
            title: "Guides",
            href: "/build/guides/gql"
        }
    ]
}
  ]



  export const secondaryNavigation: Array<NavGroup> = [
    {
        title: "Build",
        links: [
            {
                title: "ar.io SDK",
                href: "/build/ar-io-sdk",
                children: [
                    {
                        title: "Getting Started",
                        href: "/build/ar-io-sdk/getting-started"
                    },
                    {
                        title: "Configurations",
                        href: "/build/ar-io-sdk/configurations"
                    },
                    {
                        title: "Tokens",
                        href: "/build/ar-io-sdk/tokens"
                    },
                    {
                        title: "APIs",
                        href: "/build/ar-io-sdk/APIs"
                    },
                    {
                        title: "ANTs",
                        href: "/build/ar-io-sdk/ANTs"
                    },
                    {
                        title: "Logging",
                        href: "/build/ar-io-sdk/logging"
                    },
                    {
                        title: "Pagination",
                        href: "/build/ar-io-sdk/pagination"
                    },
                    {
                        title: "Resources",
                        href: "/build/ar-io-sdk/resources"
                    },
                    {
                        title: "Examples",
                        href: "/build/ar-io-sdk/examples"
                    },
                    {
                        title: "Upgrade Guides",
                        href: "/build/ar-io-sdk/upgrade-guides"
                    },
                    // {
                    //     title: "IO",
                    //     href: "/build/ar-io-sdk/io/general/init",
                    //     children: [
                    //         {
                    //             title: "init",
                    //             href: "/build/ar-io-sdk/io/general/init"
                    //         },
                    //         {
                    //             title: "getBalance",
                    //             href: "/build/ar-io-sdk/io/general/get-balance"
                    //         },
                    //         {
                    //             title: "getBalances",
                    //             href: "/build/ar-io-sdk/io/general/get-balances"
                    //         },
                    //         {
                    //             title: "getInfo",
                    //             href: "/build/ar-io-sdk/io/general/get-info"
                    //         },
                    //         {
                    //             title: "getTokenSupply",
                    //             href: "/build/ar-io-sdk/io/general/get-token-supply"
                    //         },
                    //         {
                    //             title: "transfer",
                    //             href: "/build/ar-io-sdk/io/general/transfer"
                    //         }
                    //     ]
                    // },
                    {
                        title: "Release Notes",
                        href: "/build/ar-io-sdk/release-notes"
                    }
                ]
            }
        ]
    }
  ]