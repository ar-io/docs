export interface NavGroup {
    title: string;
    links: Array<{
      title: string;
      href: string;
    }>;
  }
  
  export const navigation: Array<NavGroup> = [
{
    title: 'Concepts',
    links: [
        {
            title: 'Manifests',
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
    title: "Gateways",
    links: [
        {
            title: "Gateways",
            href: '/gateways'
        }
    ]
}
  ]