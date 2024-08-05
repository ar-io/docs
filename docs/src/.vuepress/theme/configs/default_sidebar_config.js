module.exports = [
  {
    title: "Welcome",
    path: "/",
  },
  {
    title: "White Paper",
    path: "https://arweave.net/lNjWn3LpyhKC95Kqe-x8X2qgju0j98MhucdDKK85vc4",
  },
  {
    title: "Network Overview",
    children: [
      {
        title: "Introduction",
        path: "/introduction",
      },
      {
        title: "Arweave and the Permaweb",
        path: "/arweave",
      },
      {
        title: "The IO Token",
        path: "/token.md",
      },
      {
        title: "Gateway Architecture",
        path: "/gateways/gateways",
      },
      {
        title: "Gateway Network",
        path: "/gateway-network",
      },
      {
        title: "Arweave name System (ArNS)",
        path: "/arns.md",
      },
      {
        title: "Observation and Incentive Protocol",
        path: "/gateways/ar-io-node/arnsoip/observer",
      },
    ],
  },
  {
    title: "Gateway Operators",
    children: [
      {
        title: "Getting Started",
        children: [
          {
            title: "Overview",
            path: "/gateways/ar-io-node/overview",
          },
          {
            title: "Setting up on Windows",
            path: "/gateways/ar-io-node/windows-setup",
          },
          {
            title: "Setting up on Linux",
            path: "/gateways/ar-io-node/linux-setup",
          },
          {
            title: "Join the Network",
            path: "/gateways/ar-io-node/testnet",
          },
          {
            title: "Upgrading",
            path: "/gateways/ar-io-node/upgrading",
          },
        ],
      },
      {
        title: "Advanced Configurations",
        path: "/gateways/ar-io-node/advanced-config",
      },
      {
        title: "Bundler Sidecar",
        path: "/gateways/ar-io-node/bundler"
      },
      {
        title: "Delegated Staking",
        path: "/gateways/ar-io-node/delegated-staking",
      },
      {
        title: "Environmental Variables",
        path: "/gateways/ar-io-node/env",
      },
      {
        title: "AR.IO HTTP API",
        path: "/gateways/ar-io-node/api",
      },
      {
        title: "AR.IO Admin API",
        path: "/gateways/ar-io-node/admin/admin-api",
      },
      {
        title: "Upgrading to Observer",
        path: "/gateways/ar-io-node/observer-upgrade",
      },
      {
        title: "Troubleshooting",
        path: "/gateways/ar-io-node/troubleshooting",
      },
      {
        title: "Troubleshooting Observer",
        path: "/gateways/ar-io-node/observer-troubleshooting",
      },
      {
        title: "Release Notes",
        path: "/gateways/ar-io-node/release-notes",
      },
    ],
  },
  // {
  //   title: "Ecosystem and Community",
  //   children: [
  //     {
  //       title: "AR.IO Foundation",
  //       path: "/foundation",
  //     },
  //     {
  //       title: "AR.IO Labs",
  //       path: "/labs",
  //     },
  //     {
  //       title: "Community Resources",
  //       path: "/community-resources",
  //     },
  //   ],
  // },
  {
    title: "Concepts",
    // sidebarDepth: 3,
    children: [
      {
        title: "ar:// (ARCSS)",
        path: "/concepts/arcss",
      },
      {
        title: "manifests",
        path: "/concepts/manifests",
        
      },
      {
        title: "Browser Sandboxing",
        path: "/concepts/sandboxing",
      },
    ],
  },
  {
    title: "SDK",
    path: "/guides/sdk"
  },
  {
    title: "SDK Release Notes",
    path: "/guides/sdk-release-notes"
  },
  {
    title: "Guides",
    children: [
      {
        title: "Arweave Name System (ArNS)",
        children: [
          {
            title: "ArNS App",
            children: [
              {
                title: "Overview",
                path: "/guides/arns/overview",
              },
              {
                title: "Registering a Name",
                path: "/guides/arns/registering",
              },
              {
                title: "Managing Assets",
                path: "/guides/arns/managing",
              },
            ],
          },
        ],
      },
      {
        title: "GraphQL",
        path: "/guides/gql",
      },
      {
        title: "Delegated Staking",
        path: "/guides/delegated-staking",
      },
      {
        title: "Experimental",
        children: [
          {
            title: "AO ArNS Resolver",
            path: "/experimental/ao-resolver",
          },
          {
            title: "AO ANT",
            path: "/experimental/ao-ant",
          },
          {
            title: "Farcaster Frames",
            path: "/gateways/ar-io-node/experimental/frames",
          },
        ],
      },
      // {
      //   title: "Contribute to Docs",
      //   path: "/contribute",
      // },
    ],
  },
  {
    title: "Glossary",
    path: "/glossary",
  },
  {
    title: "Community Resources",
    path: "/community-resources",
  },
];
