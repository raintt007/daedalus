<template>
  <a-layout class="layout-wrapper">
    <ui-sider v-model:collapsed="collapsed" :menuData="menus"></ui-sider>
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
import uiHeader from "./header/index";
import uiSider from "./sider/index";
import uiFooter from "./footer/index";
import { mapState, mapMutations, mapGetters } from "vuex";
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
  created() {
    const routes = this.mainMenu.find(item => item.path === "/");
    this.menus = (routes && routes.children) || [];
    console.log(this.menus);
    // 处理侧栏收起状态
    this.$watch("collapsed", () => {
      this.$store.commit(SIDEBAR_TYPE, this.collapsed);
    });
    this.$watch("isMobile", () => {
      this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile);
    });
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
  }
};
</script>

<style lang="stylus" scoped>
.layout-wrapper {
    display flex;
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
