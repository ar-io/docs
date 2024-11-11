<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar
      v-if="shouldShowNavbar"
      @toggle-sidebar="toggleSidebar"
      @open-search-modal="openSearchModal"
    />

    <SearchModal
      v-if="this.isSearchModalOpen"
      @close-modal="closeSearchModal"
    />

    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>
    <slot></slot>

    <Home v-if="$page.frontmatter.home" />

    <Page v-else :sidebar-items="sidebarItems" :isLight="isLight">
      <template #top>
        <slot name="page-top" />
      </template>
      <template #bottom>
        <slot name="page-bottom" />
        <!-- <Footer v-if="shouldShowFooter" /> -->
      </template>
    </Page>
  </div>
</template>

<script>
import Home from "@theme/components/Home.vue";
import Navbar from "@theme/components/Navbar.vue";
import Page from "@theme/components/Page.vue";
import Sidebar from "@theme/components/Sidebar.vue";
import { resolveSidebarItems } from "../util";
import SearchModal from "../components/SearchModal.vue";
import Footer from "../components/Footer.vue";
import flexsearchSvc from "../components/search-dependencies/flexsearchSvc";

export default {
  name: "Layout",

  components: {
    Home,
    Page,
    Sidebar,
    Navbar,
    SearchModal,
    Footer,
  },

  watch: {
    isLight() {
      this.updateTheme();
    },
  },

  data() {
    return {
      isSidebarOpen: false,
      showSearchModal: false,
    };
  },

  computed: {
    shouldShowFooter() {
      const { themeConfig } = this.$site;
      return themeConfig.footer !== false;
    },

    isSearchModalOpen() {
      return this.$store.state.isSearchModalOpen;
    },

    isLight() {
      return this.$store.state.isLight;
    },

    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      );
    },

    shouldShowSidebar() {
      const { frontmatter } = this.$page;
      if (this.$page.path == ""){
        this.$page.path = "/"
        this.sidebarItems
        console.log("sidebarItems: ", this.sidebarItems)
        return resolveSidebarItems(this.$page, "/", this.$site, "/")
      }
      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      );
    },

    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
          "sidebar-open": this.isSidebarOpen,
          "no-sidebar": !this.shouldShowSidebar,
        },
        userPageClass,
      ];
    },
  },

  mounted() {
    
    this.setupKeyboardShortcuts();
    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });
    this.updateTheme();
    console.log("Layout: ", this.$page)
  },

  async created() {
    // Assuming `allPages` and `options` are accessible or can be derived at this point
    const allPages = this.$site.pages; // Or however you get all pages data
    const options = {}; // Define your options if any

    // Build the search index
    flexsearchSvc.buildIndex(allPages, options);
  },
  beforeDestroy() {
    // Cleanup event listener when component is destroyed
    window.removeEventListener("keydown", this.handleKeyDown);
  },

  methods: {
    setupKeyboardShortcuts() {
      this.handleKeyDown = (event) => {
        // Check for 'Ctrl+K' or 'Cmd+K'
        if ((event.ctrlKey || event.metaKey) && event.key === "k") {
          event.preventDefault(); // Prevent default behavior

          // Check if modal is already open and toggle accordingly
          if (this.showSearchModal) {
            this.closeSearchModal();
          } else {
            this.openSearchModal();
          }
        }
      };

      window.addEventListener("keydown", this.handleKeyDown);
    },
    openSearchModal() {
      this.$store.commit("openSearchModal");
      this.showSearchModal = true;
    },
    closeSearchModal() {
      console.log("close modal");
      this.showSearchModal = false;
      this.$store.commit("closeSearchModal");
    },

    updateTheme() {
      const bgColor = this.isLight ? "#fafafa" : "#0a0b09";
      const bgColor2 = this.isLight ? "#F1EFF0" : "#0a0b09";
      const searchColor = this.isLight ? "#ddd" : "#2e2e2e";
      const textColor = this.isLight ? "#111" : "white";
      const accentColor = this.isLight ? "#7B5A44" : "#DDAE8B";
      const LineColor = this.isLight ? "#ddd" : "#555";
      const BorderColor = this.isLight ? "#d1d1d1" : "#555";
      const CodeColor = this.isLight ? accentColor : accentColor;
      const CodeBG = this.isLight ? "#eaeaea" : "#222";
      const LinkColor = this.isLight ? "#DDAE8B" : "#7B5A44";
      const HomePageLinkColor = this.isLight ? "#666" : "#999";
      document.documentElement.style.setProperty("--BgColor1", bgColor);
      document.documentElement.style.setProperty("--BgColor2", bgColor2);
      document.documentElement.style.setProperty("--SearchColor", searchColor);
      document.documentElement.style.setProperty("--TextColor", textColor);
      document.documentElement.style.setProperty("--AccentColor", accentColor);
      document.documentElement.style.setProperty("--LineColor", LineColor);
      document.documentElement.style.setProperty("--BorderColor", BorderColor);
      document.documentElement.style.setProperty("--InLineCodeText", CodeColor);
      document.documentElement.style.setProperty("--InLineCodeBG", CodeBG);
      document.documentElement.style.setProperty("--LinkColor", LinkColor);
      document.documentElement.style.setProperty(
        "--HomePageLinkColor",
        HomePageLinkColor
      );
    },

    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
      this.$emit("toggle-sidebar", this.isSidebarOpen);
    },

    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    },
  },
};
</script>
