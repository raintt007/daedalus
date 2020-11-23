import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // progress bar
NProgress.configure({
  showSpinner: false
});
let tt = false;
router.addRoute({
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('@/pages/dashboard/dashboard.vue')
});
router.beforeEach((to, from, next) => {
  

    next()
    // trigger a redirection
 
  // NProgress.start();
  // if (store.getters.addRouters.length === 0) {
  //   store.dispatch("generateRoutes", {
  //     roles: {
  //       permissionList: ['admin']
  //     }
  //   }).then(() => {
  //     // 动态添加路由


  //   });
  // }
  // next();
  // NProgress.done();
});