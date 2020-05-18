/*
 * @Author: 付国强
 * @Date: 2020-02-25 15:19:23
 * @LastEditors: 付国强
 * @LastEditTime: 2020-02-25 17:06:40
 * @Description:
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import login from "./modules/views/login";
import test from "./modules/components/test";
export default new Vuex.Store({
  strict: true,
  modules: {
    components: {
      namespaced: true,
      modules: {
        test: test
      }
    },
    views: {
      namespaced: true,
      modules: {
        login: login
      }
    }
  }
});
