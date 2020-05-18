/*
 * @Author: 付国强
 * @Date: 2020-02-25 17:29:49
 * @LastEditors: 付国强
 * @LastEditTime: 2020-02-25 17:29:57
 * @Description:
 */
import Vue from "vue";
Object.defineProperty(Vue.prototype, "$eventBus", { value: new Vue() });
