/*
 * @Author: 付国强
 * @Date: 2020-02-25 15:19:23
 * @LastEditors: 付国强
 * @LastEditTime: 2020-02-25 16:56:08
 * @Description:
 */
export const routes = [
  {
    name: "home",
    component: () => import("../views/home/index.vue"),
    path: "/"
  }
];
