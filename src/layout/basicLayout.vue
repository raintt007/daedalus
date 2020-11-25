<template>
  <a-layout class="layout-wrapper">
    <ui-sider
      v-model:collapsed="collapsed"
      :menus="menus"
      :i18nRender="i18nRender"
    ></ui-sider>
    <!-- <div
      :style="
        `margin-right: ${sideMenuWidth};width: ${sideMenuWidth}; min-width: ${sideMenuWidth};max-width: ${sideMenuWidth};`
      "
      class="virtual-side"
    ></div> -->
    <a-layout class="layout-main" :style="`margin-left: ${sideMenuWidth};`">
      <ui-header v-model:collapsed="collapsed"></ui-header>
      <a-layout-content class="layout-content">
        <router-view />
      </a-layout-content>
      <ui-footer></ui-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import uiHeader from "@/components/layout/header/index";
import uiSider from "@/components/layout/sider/index";
import uiFooter from "@/components/layout/footer/index";
import { i18nRender } from "@/locales";
import { mapState, mapMutations, mapGetters } from "vuex";
import { SIDEBAR_TYPE, TOGGLE_MOBILE_TYPE } from "@/store/mutation-types";
export default {
  components: {
    uiHeader,
    uiSider,
    uiFooter
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => {
        return state.permission.addRouters;
      }
    }),
    sideMenuWidth() {
      return this.collapsed ? "80px" : "200px";
    }
  },
  data() {
    return {
      collapsed: false,
      isMobile: false,
      menus: []
    };
  },
  watch: {
    mainMenu() {
      const routes = this.mainMenu.find(item => item.path === "/");
      this.menus = (routes && routes.children) || [];
    },
    collapsed() {
      this.$store.commit(SIDEBAR_TYPE, this.collapsed);
    },
    isMobile() {
      this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile);
    }
  },
  created() {
    const routes = this.mainMenu.find(item => item.path === "/");
    this.menus = (routes && routes.children) || [];
  },
  mounted() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Edge") > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed;
        setTimeout(() => {
          this.collapsed = !this.collapsed;
        }, 16);
      });
    }
  },
  methods: {
    i18nRender
  }
};
</script>

<style lang="stylus" scoped>
.layout-wrapper {
  display: flex;

  .layout-content {
    overflow: initial;
    margin: 24px 16px;
    flex: 1;
  }

  .layout-main {
    transition: all 0.2s;
  }

  .virtual-side {
    transition: all 0.2s;
  }
}
</style>
