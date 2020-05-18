/*
 * @Author: 付国强
 * @Date: 2020-02-25 15:19:20
 * @LastEditors: 付国强
 * @LastEditTime: 2020-02-25 16:32:09
 * @Description:
 */
import Vue from "vue";
import Router from "vue-router";
import { routes } from "@/routes/index";
Vue.use(Router);
const router = new Router({
  mode: "history",
  routes: routes
});
export default router;
