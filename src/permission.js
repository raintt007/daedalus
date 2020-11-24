import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // progress bar
NProgress.configure({
  showSpinner: false
});
router.beforeEach(async to => {
  NProgress.start();
  // 路由没有加载
  if (store.getters.addRouters.length === 0) {
    await store.dispatch("generateRoutes", {
      roles: {
        permissionList: ["admin"]
      }
    });
    // 动态添加路由
    router.addRoute(...store.getters.addRouters);

    return to.fullPath;
  }
  NProgress.done();
});
