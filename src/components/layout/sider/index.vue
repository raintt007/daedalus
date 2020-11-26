<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
    :style="style"
    :theme="sideTheme"
  >
    <route-menu
      :collapsed="collapsed"
      :menus="menus"
      :i18nRender="i18nRender"
    ></route-menu>
  </a-layout-sider>
</template>

<script>
import RouteMenu from "@/components/menu/RouteMenu.jsx";
export default {
  props: {
    mode: {
      type: String,
      default: "inline"
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    i18nRender: {
      required: false,
      default: false
    },
    theme: {
      type: String,
      required: false,
      default: "dark"
    },
    menus: {
      type: Array,
      required: true
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    RouteMenu
  },
  computed: {
    sideTheme() {
      return this.theme === "light" ? "light" : "dark";
    }
  },
  data() {
    return {
      style: {
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0
      },
      selectedKeys: ["1"],
      openKeys: []
    };
  },
  created() {
    console.log("menus", this.menus);
  },
  mounted() {}
};
</script>

<style lang="stylus" scoped></style>
