export interface NavGroup {
    title: string;
    links: Array<{
      title: string;
      href: string;
    }>;
  }
  
  export const navigation: Array<NavGroup> = [
{
    title: 'General',
    links: [
        {
            title: 'Token',
            href: '/token'
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