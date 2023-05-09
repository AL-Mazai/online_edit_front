import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
//配置全局axios
import axios from 'axios'
Vue.prototype.axios = axios
//时间插件
import moment from "moment"
Vue.prototype.$moment = moment

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  el: "#onlineEdit",
  router,
  render: (h) => h(App),
});
