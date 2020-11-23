/*
 *  * 该插件可根据菜单配置自动生成 ANTD menu组件
 * menuOptions示例：
 * [
 *  {
 *    name: '菜单名称',
 *    path: '菜单路由',
 *    meta: {
 *      icon: '菜单图标',
 *      invisible: 'boolean, 是否不可见, 默认 false',
 *    },
 *    children: [子菜单配置]
 *  },
 *  {
 *    name: '菜单名称',
 *    path: '菜单路由',
 *    meta: {
 *      icon: '菜单图标',
 *      invisible: 'boolean, 是否不可见, 默认 false',
 *    },
 *    children: [子菜单配置]
 *  }
 * ]
 *
 * i18n: 国际化配置。系统默认会根据 options route配置的 path 和 name 生成英文以及中文的国际化配置，如需自定义或增加其他语言，配置
 * 此项即可。如：
 * i18n: {
 *   messages: {
 *     CN: {dashboard: {name: '监控中心'}}
 *     HK: {dashboard: {name: '監控中心'}}
 *   }
 * }
 */
import Menu from "ant-design-vue/es/menu";
import Icon from "ant-design-vue/es/icon";
import fastEqual from "fast-deep-equal";
const { Item, SubMenu } = Menu;
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: "dark"
    },
    mode: {
      type: String,
      required: false,
      default: "inline"
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    i18n: Object,
    openKeys: Array
  },
  data() {
    return {
      selectedKeys: [],
      sOpenKeys: [],
      cachedOpenKeys: []
    };
  },
  computed: {
    menuTheme() {
      return this.theme === "light" ? "light" : "dark";
    }
  },
  created() {
    if (this.options.length > 0 && !this.options[0].fullPath) {
      this.formatOptions(this.options, "");
    }
  },
  watch: {
    collapsed(val) {
      if (val) {
        this.cachedOpenKeys = this.sOpenKeys;
        this.sOpenKeys = [];
      } else {
        this.sOpenKeys = this.cachedOpenKeys;
      }
    },
    $route: function() {
      this.updateMenu();
    },
    sOpenKeys(val) {
      this.$emit("openChange", val);
      this.$emit("update:openKeys", val);
    }
  },
  methods: {
    // 渲染图标icon
    renderIcon(h, icon, key) {
      if (this.$scopedSlots.icon && icon && icon !== "none") {
        const vnodes = this.$scopedSlots.icon({
          icon,
          key
        });
        vnodes.forEach(vnode => {
          vnode.data.class = vnode.data.class || [];
          vnode.data.class.push("anticon");
        });
        return vnodes;
      }
    },
    renderMenuItem(h, menu) {
      let tag = "router-link";
      let config = {
        props: {
          to: menu.fullPath
        },
        attrs: {
          style: `overflow:hidden;white-space:normal;text-overflow:clip;`
        }
      };
      if (menu.meta && menu.meta.link) {
        tag = "a";
        config = {
          attrs: {
            style: "overflow:hidden;white-space:normal;text-overflow:clip;",
            href: menu.meta.link,
            target: "_blank"
          }
        };
      }
      return h(Item, { key: menu.fullPath }, [
        h(tag, config, [
          this.renderIcon(h, menu.meta ? menu.meta.icon : "none", menu.fullPath)
        ])
      ]);
    },
    // 渲染多级菜单
    renderSubMenu(h, menu) {
      let subItem = [
        h(
          "span",
          {
            slot: "title",
            attrs: {
              style: "overflow:hidden;white-space:normal;text-overflow:clip;"
            }
          },
          [
            this.renderIcon(
              h,
              menu.meta ? menu.meta.icon : "none",
              menu.fullPath
            )
          ]
        )
      ];
      let itemArr = [];
      menu.children.forEach(item => {
        itemArr.push(this.renderMenuItem(h, item));
      });
      return h(
        SubMenu,
        {
          key: menu.fullPath
        },
        subItem.concat(itemArr)
      );
    },
    // 渲染
    renderItem(h, menu) {
      const meta = menu.meta;
      if (!meta || !meta.invisible) {
        let renderChildren = false;
        const children = menu.children;
        if (children) {
          for (let i = 0; i < children.length; i++) {
            const childMeta = children[i].meta;
            if (!childMeta || childMeta.invisible) {
              renderChildren = true;
              break;
            }
          }
        }
        return menu.children && renderChildren
          ? this.renderSubMenu(h, menu)
          : this.renderMenuItem(h, menu);
      }
    },
    // 渲染菜单
    renderMenu(h, menuTree) {
      const menuArr = [];
      menuTree.forEach((item, index) => {
        menuArr.push(this.renderItem(h, item, "0", index));
      });
      return menuArr;
    },
    formatOptions(options, parentPath) {
      options.forEach(route => {
        let isFullPath = route.path.substring(0, 1) == "/";
        route.fullPath = isFullPath
          ? route.path
          : parentPath + "/" + route.path;
        if (route.children) {
          this.formatOptions(route.children, route.fullPath);
        }
      });
    },
    updateMenu() {
      const menuRoutes = this.$route.matched.filter(item => item.path !== "");
      this.selectedKeys = this.getSelectedKey(this.$route);
      let openKeys = menuRoutes.map(item => item.path);
      if (!fastEqual(openKeys, this.sOpenKeys)) {
        this.collapsed || this.mode === "horizontal"
          ? (this.cachedOpenKeys = openKeys)
          : (this.sOpenKeys = openKeys);
      }
    },
    getSelectedKey(route) {
      return route.matched.map(item => item.path);
    }
  },
  render(h) {
    return h(
      Menu,
      {
        props: {
          theme: this.menuTheme,
          mode: this.$props.mode,
          selectedKeys: this.selectedKeys,
          openKeys: this.openKeys ? this.openKeys : this.sOpenKeys
        },
        on: {
          "update:openKeys": val => {
            this.sOpenKeys = val;
          },
          click: obj => {
            obj.selectedKeys = [obj.key];
            this.$emit("select", obj);
          }
        }
      },
      this.renderMenu(h, this.options)
    );
  }
};
