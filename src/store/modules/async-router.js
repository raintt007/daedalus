import { constantRouterMap } from "@/config/router.config";
import { generatorDynamicRouter } from "@/utils/routerUtils";
const permission = {
  state: {
    routes: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    generateRoutes({ commit }, data) {
      return new Promise((resolve, reject) => {
        generatorDynamicRouter()
          .then(routes => {
            commit("SET_ROUTERS", routes);
            resolve();
          })
          .catch(e => {
            reject(e);
          });
      });
    }
  }
};

export default permission;
