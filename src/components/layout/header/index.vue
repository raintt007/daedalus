<template>
  <a-layout-header class="layout-header">
    <menu-unfold-outlined
      v-if="collapsed"
      class="trigger"
      @click="changeCollapsed(false)"
    />
    <menu-fold-outlined v-else class="trigger" @click="changeCollapsed(true)" />
  </a-layout-header>
</template>

<script>
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  props: {
    collapsed: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {};
  },
  methods: {
    changeCollapsed(status) {
      this.$emit("update:collapsed", status);
    }
  }
};
</script>

<style lang="stylus" scoped>
.layout-header {
  background-color: #fff;
    padding: 0;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }
}
</style>
