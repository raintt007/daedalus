<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
    :style="style"
  >
    <a-menu
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
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons-vue';
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  components: {
    UserOutlined, VideoCameraOutlined, UploadOutlined
  },
  data() {
    return {
      style: {
        overflow: 'auto', height: '100vh', position: 'fixed', left: 0
      },
      selectedKeys: ['1'],
    }
  }
}
</script>

<style lang="stylus" scoped></style>