import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store'

//配置全局axios
import axios from 'axios'
Vue.prototype.axios = axios

//时间插件
import moment from "moment"
Vue.prototype.$moment = moment

//element-ui组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  el: "#onlineEdit",
  router,
  store,
  render: (h) => h(App),
});
