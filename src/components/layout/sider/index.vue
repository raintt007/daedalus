<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
    :style="style"
    :theme="sideTheme"
  >
    <Menu
      :mode="mode"
      :theme="theme"
      :openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      @select=""
      @openChange=""
    >
    </Menu>
    <!-- <a-menu
      theme="dark"
      mode="inline"
      v-model:selectedKeys="selectedKeys"
    >
      <a-menu-item key="1">
        <user-outlined />
        <span>nav 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <video-camera-outlined />
        <span>nav 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <upload-outlined />
        <span>nav 3</span>
      </a-menu-item>
    </a-menu> -->
  </a-layout-sider>
</template>

<script>
import Menu from "ant-design-vue/es/menu";
import Icon from "ant-design-vue/es/icon";

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
      type: Boolean,
      required: false,
      default: false
    },
    theme: {
      type: String,
      required: false,
      default: "dark"
    },
    menuData: {
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
    Menu,
    Icon
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
    console.log(this.menuData);
  },
  mounted() {
    this.updateMenu();
  },
  methods: {
    updateMenu() {
      const routes = this.$route.matched.concat();
      const { hidden } = this.$route.meta;
      if (routes.length >= 3 && hidden) {
        routes.pop();
        this.selectedKeys = [routes[routes.length - 1].path];
      } else {
        this.selectedKeys = [routes.pop().path];
      }
      const openKeys = [];
      if (this.mode === "inline") {
        routes.forEach(item => {
          item.path && openKeys.push(item.path);
        });
      }
      this.collapsed
        ? (this.cachedOpenKeys = openKeys)
        : (this.openKeys = openKeys);
    }
  },
  selectMenu(menu) {
    this.selectedKeys = menu.selectedKeys;
    this.$emit("select", menu);
  },
  handleOpenChange(openKeys) {
    // 在水平模式下时，不再执行后续
    if (this.mode === "horizontal") {
      this.openKeys = openKeys;
      return;
    }
    const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key));
    if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
      this.openKeys = openKeys;
    } else {
      this.openKeys = latestOpenKey ? [latestOpenKey] : [];
    }
  },
  renderMenuItem() {
    const { mode, theme, menus, i18nRender } = this;
    const handleOpenChange = openKeys => {
      // 在水平模式下时，不再执行后续
      if (mode === "horizontal") {
        this.openKeys = openKeys;
        return;
      }
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key));
      if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };

    const dynamicProps = {
      props: {
        mode,
        theme,
        openKeys: this.openKeys,
        selectedKeys: this.selectedKeys
      },
      on: {
        select: menu => {
          this.selectedKeys = menu.selectedKeys;
          this.$emit("select", menu);
        },
        openChange: handleOpenChange
      }
    };

    const menuItems = menus.map(item => {
      if (item.hidden) {
        return null;
      }
      return renderMenu(h, item, i18nRender);
    });
    return <Menu {...dynamicProps}>{menuItems}</Menu>;
  }
};
</script>

<style lang="stylus" scoped></style>
