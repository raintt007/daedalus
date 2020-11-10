import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import router from "./router";
import store from "./store";
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);

// const i18n = initI18n('CN', 'US'); // 国际化
app.config.productionTip = false;
app
    .use(Antd)
    .use(store)
    .use(router)
    .mount("#app");
