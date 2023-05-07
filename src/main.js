import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import axios from "axios";

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(axios);
new Vue({
  el: "#onlineEdit",
  router,
  render: (h) => h(App),
});
