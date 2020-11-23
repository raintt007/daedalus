import Layout from "../components/layout/index";
/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: "/",
    name: "Home",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        metra: {
          title: "dashboard",
          icon: "bxAnaalyse",
          keepAlive: true,
          permission: []
        },
        component: () => import("@/pages/dashboard/dashboard")
      }
    ]
  },

  {
    path: "/404",
    component: () => import(/* webpackChunkName: "fail" */ "@/pages/error/404")
  }
];
