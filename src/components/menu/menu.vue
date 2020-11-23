<template>
  <div></div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {},
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => {
        return state.permission.addRouters;
      }
    })
  },
  mounted() {
    const routes = this.mainmenu.find(item => item.path === "/");
    this.menus = (routes && routes.children) || [];
  }
};
</script>

<style lang="stylus" scoped></style>
