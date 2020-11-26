import { basicLayout, userLayout, routeView } from "@/layout";
import { DashboardOutlined } from "@ant-design/icons-vue";

export const asyncRouterMap = [
  {
    path: "/",
    name: "index",
    component: basicLayout,
    meta: { title: "home" },
    redirect: "/dashboard/workplace",
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/pages/home/home"),
        meta: {
          title: "menu.home",
          keepAlive: true,
          icon: <DashboardOutlined />,
          permission: ["dashboard"]
        }
      },
      {
        path: "/dashboard/workplace",
        name: "Workplace",
        component: () => import("@/pages/dashboard/dashboard"),
        meta: {
          title: "menu.dashboard.workplace",
          icon: <DashboardOutlined />,
          keepAlive: true,
          permission: ["dashboard"]
        }
      },
      {
        path: "/dashboard",
        name: "dashboard",
        redirect: "/dashboard/workplace",
        component: routeView,
        meta: {
          title: "menu.dashboard",
          keepAlive: true,
          icon: <DashboardOutlined />,
          permission: ["dashboard"]
        },
        children: [
          // 外部链接
          {
            path: "https://www.baidu.com/",
            name: "Monitor",
            meta: { title: "menu.dashboard.monitor", target: "_blank" }
          }
        ]
      }
    ]
  }
];

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: "/user",
    component: userLayout,
    redirect: "/user/login",
    hidden: true,
    children: [
      {
        path: "login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/pages/login/login")
      }
    ]
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import(/* webpackChunkName: "fail" */ "@/pages/error/404")
  }
];
