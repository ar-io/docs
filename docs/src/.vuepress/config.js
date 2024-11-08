const { description } = require("../../package");
const default_sidebar_config = require("./theme/configs/default_sidebar_config");

const base = process.env.BASE_URL || "";

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "ar.io Docs",
  base: base,

  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["link", { rel: "icon", href: "/images/logo.png" }],
    [
      "meta",
      {
        property: "og:title",
        content: "ar.io Network Docs", // Replace 'Your Page Title' with the actual title of the page
      },
    ],
    [
      "meta",
      {
        name: "twitter:title",
        content: "ar.io Network Docs", // Ensure this matches your page title
      },
    ],

    [
      "meta",
      {
        property: "og:image",
        content:
          "https://res.cloudinary.com/dopbvlqgc/image/upload/v1706802732/ario_v2nv53.png",
      },
    ],
    [
      "meta",
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
    [
      "meta",
      {
        name: "twitter:image",
        content:
          "https://res.cloudinary.com/dopbvlqgc/image/upload/v1706802732/ario_v2nv53.png",
      },
    ],
    [
      "meta",
      {
        name: "twitter:site",
        content: "@ar_io_network", // Replace with your or your site's Twitter handle
      },
    ],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],

    [
      "script",
      {
        src: "https://plausible.io/js/script.js",
        defer: true,
        "data-domain": "docs.ar.io",
      },
    ],
    // ["link", { rel: "stylesheet", href: "/../assets/css/theme.css" }],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap",
      },
    ],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    // set to false to disable the footer across the entire docs portal.
    footer: true,

    fontFamily: {
      base: ["Dancing Script", "cursive"],
    },
    searchPlaceholder: "Ctrl + K",
    repo: "",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: false,
    initialOpenGroupIndex: -1,
    //logo path will need to be adjusted for deployment
    logo: `${base}/images/logo-party.gif`,
    // nav: nav_config,
    sidebar: {
      "/": default_sidebar_config,
    },
  },

  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       '@alias': '/404.md'
  //     }
  //   }
  // },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    "@vuepress/plugin-back-to-top",
    "@vuepress/plugin-medium-zoom",
    "vuepress-plugin-code-copy",
    "fulltext-search",
    require('./plugins/permalinkCollector')
  ],
};
