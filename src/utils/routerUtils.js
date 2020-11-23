import {
  basicLayout
} from "@/layout";

const test = [
  {
    'name': 'dashboard',
    'parentId': 0,
    'id': 1,
    'meta': {
      'icon': 'dashboard',
      'title': '仪表盘',
      'show': true
    },
    'component': 'routeView',
    'redirect': '/dashboard/workplace'
  },
  {
    'name': 'workplace',
    'parentId': 1,
    'id': 7,
    'meta': {
      'title': '工作台',
      'show': true
    },
    'component': 'Workplace'
  },
]
// 前端路由表
const constantRouterComponents = {
  // 基础布局
  basicLayout,
  "Workplace": () => import('@/pages/dashboard/dashboard'),
  "403": () => import( /* webpackChunkName: "error" */ "@/pages/error/403")
};

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: "*",
  redirect: "/404",
  hidden: true
};
// 根级菜单
const rootRouter = {
  key: '',
  name: 'index',
  path: '',
  component: 'basicLayout',
  redirect: '/dashboard',
  meta: {
    title: '首页'
  },
  children: []
};

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = token => {
  return new Promise((resolve, reject) => {
    const menuNav = [];
    const childrenNav = [];
    listToTree(test, childrenNav, 0);
    rootRouter.children = childrenNav;
    menuNav.push(rootRouter);
    const routers = generator(menuNav);
    routers.push(notFoundRouter);
    
    resolve(routers);
  });
};
/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    const {
      title,
      show,
      hideChildren,
      hiddenHeaderContent,
      target,
      icon
    } =
    item.meta || {};
    console.log('test', item)
    const currentRouter = {
      path: item.path || `${(parent && parent.path) || ""}/${item.key}`,
      name: item.name || item.key || "",
      component: constantRouterComponents[item.component || item.key] ||
        (() => import(`@/pages/${item.component}`)),
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: title,
        icon: icon || undefined,
        hiddenHeaderContent: hiddenHeaderContent,
        target: target
        // permission: item.name
      }
    };
    if (!show) {
      currentRouter.hidden = true;
    }
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true;
    }
    if (!currentRouter.path.startsWith("http")) {
      currentRouter.path = currentRouter.path;
    }
    item.redirect && (currentRouter.redirect = item.redirect);
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter);
    }
    return currentRouter;
  });
};

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list, tree, parentId) => {
  list.forEach(item => {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: []
      };
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id);
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children;
      }
      // 加入到树中
      tree.push(child);
    }
  });
};