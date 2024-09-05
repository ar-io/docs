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

    // Check if we are on the staging site hosted on GitHub Pages
    const isStaging = window.location.hostname === 'ar-io.github.io';

    // Adjust the redirect paths based on the base URL
    let redirectPath = redirects[normalizedPath];
    if (redirectPath && isStaging) {
      // Prepend '/docs' to the redirect path for the GitHub Pages base
      redirectPath = `/docs${redirectPath}`;
    }

    if (redirectPath) {
      // Preserve the hash in the URL
      next({ path: redirectPath, hash: to.hash });
    } else {
      next(); // Proceed to the requested page if no redirect is found
    }
  });

  // ...apply other enhancements for the site.
}
