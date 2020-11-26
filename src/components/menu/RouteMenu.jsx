import Menu from "ant-design-vue/es/menu";
import "ant-design-vue/es/menu/style";
import { RouterLink } from "vue-router";
const { SubMenu, Item: MenuItem } = Menu;

const RouteMenuProps = {
  mode: {
    type: String,
    default: "inline"
  },
  collapsed: {
    type: Boolean,
    default: false
  },
  i18nRender: {
    required: false,
    default: false
  },
  theme: {
    type: String,
    required: false,
    default: "dark"
  },
  menus: {
    type: Array,
    required: true
  }
};

const renderMenu = (h, item, i18nRender) => {
  if (item && !item.hidden) {
    const bool = item.children && !item.hideChildrenInMenu;
    return bool
      ? renderSubMenu(h, item, i18nRender)
      : renderMenuItem(h, item, i18nRender);
  }
  return null;
};

const renderSubMenu = (h, item, i18nRender) => {
  return (
    <SubMenu
      key={item.path}
      title={
        <span>
          {renderIcon(h, item.meta.icon)}
          <span>{renderTitle(h, item.meta.title, i18nRender)}</span>
        </span>
      }
    >
      {!item.hideChildrenInMenu &&
        item.children.map(cd => renderMenu(h, cd, i18nRender))}
    </SubMenu>
  );
};

const renderMenuItem = (h, item, i18nRender) => {
  const meta = Object.assign({}, item.meta);
  const target = meta.target || null;
  const attrs = { href: item.path, target: target };
  if (item.children && item.hideChildrenInMenu) {
    // 把有子菜单的 并且 父菜单是要隐藏子菜单的
    // 都给子菜单增加一个 hidden 属性
    // 用来给刷新页面时， selectedKeys 做控制用
    item.children.forEach(cd => {
      cd.meta = Object.assign(cd.meta || {}, { hidden: true });
    });
  }
  return (
    <MenuItem key={item.path}>
      {target && "a" ? (
        <a href={attrs.href || null} target={attrs.target || null}>
          {renderIcon(h, meta.icon)}
          {renderTitle(h, meta.title, i18nRender)}
        </a>
      ) : (
        <RouterLink to={{ name: item.name }}>
          {renderIcon(h, meta.icon)}
          {renderTitle(h, meta.title, i18nRender)}
        </RouterLink>
      )}
    </MenuItem>
  );
};
// 渲染菜单icon
const renderIcon = (h, icon) => {
  if (icon === undefined || icon === "none" || icon === null) {
    return null;
  }
  const props = {};
  return typeof icon === "object" ? icon : (props.type = icon);
};
// 渲染标题
const renderTitle = (h, title, i18nRender) => {
  return <span>{(i18nRender && i18nRender(title)) || title}</span>;
};

const RouteMenu = {
  name: "RouteMenu",
  data() {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: []
    };
  },
  props: RouteMenuProps,
  render(h) {
    const { mode, theme, menus, i18nRender } = this;
    // 控制展开
    const handleOpenChange = openKeys => {
      if (mode === "horizontal") {
        this.openKeys = openKeys;
        return;
      }
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key));
      if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };
    const select = (item, key, selectedKeys) => {
      this.selectedKeys = selectedKeys;
      //   this.$emit("select", item);
      //   console.log(item);
    };
    const menuItems = menus.map(item => {
      if (item.hidden) {
        return null;
      }

      return renderMenu(h, item, i18nRender);
    });

    return (
      <Menu
        mode={mode}
        theme={theme}
        openKeys={this.openKeys}
        selectedKeys={this.selectedKeys}
        onSelect={select}
        onOpenChange={handleOpenChange}
      >
        {menuItems}
      </Menu>
    );
  },
  methods: {
    updateMenu() {
      const routes = this.$route.matched.concat();
      const { hidden } = this.$route.meta;
      if (routes.length >= 3 && hidden) {
        routes.pop();
        this.selectedKeys = [routes[routes.length - 1].path];
      } else {
        this.selectedKeys = [routes.pop().path];
      }
      const openKeys = [];
      if (this.mode === "inline") {
        routes.forEach(item => {
          item.path && openKeys.push(item.path);
        });
      }

      this.collapsed
        ? (this.cachedOpenKeys = openKeys)
        : (this.openKeys = openKeys);
    }
  },
  computed: {
    rootSubmenuKeys: vm => {
      const keys = [];
      vm.menus.forEach(item => keys.push(item.path));
      return keys;
    }
  },
  created() {
    this.$watch("$route", () => {
      this.updateMenu();
    });
    this.$watch("collapsed", val => {
      if (val) {
        this.cachedOpenKeys = this.openKeys.concat();
        this.openKeys = [];
      } else {
        this.openKeys = this.cachedOpenKeys;
      }
    });
  },
  mounted() {
    this.updateMenu();
  }
};
export default RouteMenu;
