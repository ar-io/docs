/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */
import Vue from "vue";
import store from "./store";

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
}) => {
  // Register Vuex store as a global mixin
  Vue.mixin({
    beforeCreate() {
      this.$store = store;
    },
  });

  if (typeof window !== "undefined") {
      console.log("latest enhanced loaded");
    router.beforeEach((to, from, next) => {
      // List of redirects (old path to new path)
      const redirects = {
        "/arcss": "/wayfinder", // Add more as needed
        "/gateways/ar-io-node/arnsoip/observer.html":
          "/gateways/ar-io-node/arnsoip/observer",
      };

      // Normalize the path by removing any trailing slash for easier matching
      const normalizedPath = to.path.replace(/\/$/, "");

      let redirectPath = redirects[normalizedPath];

      // Only check for the staging environment in the browser
      if (typeof window !== "undefined") {
        const isStaging = window.location.hostname === "ar-io.github.io";

        // Adjust the redirect paths based on the base URL for staging
        if (redirectPath && isStaging) {
          redirectPath = `/docs${redirectPath}`;
        }

        // Specific handling for `.html` pages to force a reload
        if (normalizedPath.endsWith(".html") && redirectPath) {
          window.location.href = redirectPath + (to.hash || "");
          window.location.reload()
          // return; // Ensure further navigation is prevented after reload
        }
      }

      if (redirectPath) {
        // For regular non-`.html` redirects
        window.location.replace(redirectPath + (to.hash || ""));
      } else {
        next(); // Proceed to the requested page if no redirect is found
      }
    });
  }

  // ...apply other enhancements for the site.
};
