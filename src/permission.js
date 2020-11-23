import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // progress bar
NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (store.getters.addRouters.length === 0) {
    store.dispatch("generateRoutes", {}).then(() => {
      // 动态添加路由
      router.addRoute(store.getters.addRouters);
      next();
    });
  }
  NProgress.done();
});
