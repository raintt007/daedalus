<template>
  <a-layout class="layout-wrapper">
    <!-- <ui-sider v-model:collapsed="collapsed" :menuData="sideMenuData"></ui-sider> -->
    <div
      :style="
        `width: ${sideMenuWidth}; min-width: ${sideMenuWidth};max-width: ${sideMenuWidth};`
      "
      class="virtual-side"
    ></div>
    <a-layout class="layout-main">
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
// import uiSider from "@/components/layout/sider/index";
import uiFooter from "@/components/layout/footer/index";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  components: {
    uiHeader,
    // uiSider,
    uiFooter
  },
  computed: {
    ...mapGetters("setting", ["firstMenu", "subMenu", "menuData"]),
    sideMenuWidth() {
      return this.collapsed ? "80px" : "200px";
    }
  },
  data() {
    return {
      collapsed: false
    };
  }
};
</script>

<style lang="stylus" scoped>
.layout-wrapper {
  .layout-content {
    overflow: initial;
    margin: 24px 16px;
    flex: 1;
  }

  .virtual-side {
    transition: all 0.2s;
  }
}
</style>
