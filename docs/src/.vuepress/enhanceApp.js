/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */
import Vue from 'vue';
import store from './store';

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

  router.beforeEach((to, from, next) => {
    // List of redirects (old path to new path)
    const redirects = {
      '/arcss': '/wayfinder',  // Add more as needed
      '/gateways/ar-io-node/arnsoip/observer.html': '/gateways/ar-io-node/arnsoip/observer'
    };

    // Normalize the path by removing any trailing slash for easier matching
    const normalizedPath = to.path.replace(/\/$/, '');

    let redirectPath = redirects[normalizedPath];

    // Only check for the staging environment in the browser
    if (typeof window !== 'undefined') {
      const isStaging = window.location.hostname === 'ar-io.github.io';

      // Adjust the redirect paths based on the base URL for staging
      if (redirectPath && isStaging) {
        redirectPath = `/docs${redirectPath}`;
      }
    }

    if (redirectPath) {
      // Use router.push to ensure Vue Router handles the navigation properly
      // router.push({ path: redirectPath, hash: to.hash });
      window.location.replace(redirectPath)
    } else {
      next(); // Proceed to the requested page if no redirect is found
    }
  });

  // ...apply other enhancements for the site.
}
