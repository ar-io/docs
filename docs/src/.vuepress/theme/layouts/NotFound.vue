<template>
  <Layout :sidebar-items="sidebarItems">
    <div class="NotFound">
      <img src="/images/Lost-File-v4.gif" />
      <p><strong>404s suck!</strong> And we're sorry for this one.</p>
      <p>
        Good thing the permaweb has
        <a href="https://ardrive.io/fragility-of-the-internet/" target="_blank" rel="noreferrer">
          no more 404s
        </a>
      </p>
    </div>
  </Layout>
</template>

<script>
import Layout from "./Layout";

export default {
  name: "NotFound",
  components: {
    Layout,
  },
  computed: {
    sidebarItems() {
      const { themeConfig } = this.$site;
      // Use the root ("/") sidebar config as a fallback
      return themeConfig.sidebar ? themeConfig.sidebar["/"] || [] : [];
    },
  },
};
</script>

<style scoped>
.NotFound {
  text-align: center;
  padding: 2em;
}
</style>
