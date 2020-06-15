/*
 * @Author: 付国强
 * @Date: 2020-02-25 15:19:20
 * @LastEditors: 付国强
 * @LastEditTime: 2020-02-25 17:29:18
 * @Description:
 */
import Vue from "vue";
import App from "./App.vue";
import store from "./store/index";
import router from "./router";
import "./common/less/app.less";
import "./icons";
import "./filters";
import "./plugins/element";
import "./plugins/eventBus";

/* eslint-disable */
Vue.config.productionTip = process.env.NODE_ENV === "production";

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
