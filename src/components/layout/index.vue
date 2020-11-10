<template>
  <a-layout class="layout-wrapper">
    <ui-sider v-model:collapsed="collapsed"></ui-sider>
    <a-layout>
      <ui-header v-model:collapsed='collapsed'></ui-header>
      <a-layout-content class="layout-content">
        <router-view />
      </a-layout-content>
      <ui-footer></ui-footer>
    </a-layout>
  </a-layout>

</template>

<script>
import uiHeader from './header/index';
import uiSider from './sider/index';
import uiFooter from './footer/index';
export default {
  components: {
    uiHeader,
    uiSider,
    uiFooter
  },
  data() {
    return {
      collapsed: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.layout-wrapper {
    .layout-content {
        flex: 1;
    }
}
</style>