<template>
  <div class="dashboard-wrapper">
    dashboard
    <button @click="jump">跳转</button>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
  mounted() {},
  methods: {
    jump() {
      this.$router.push({
        name: "Home"
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.dashboard-wrapper {
    height: 100vh;
    background-color #fff;
}
</style>
