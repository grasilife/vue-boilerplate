/*
 * @Author: 付国强
 * @Date: 2020-06-16 22:13:15
 * @LastEditors: 付国强
 * @LastEditTime: 2020-06-16 22:13:15
 * @Description:
 */
import Vue from "vue";
import { Button, ConfigProvider, Menu } from "ant-design-vue";
// Vue.use(Button);
// Vue.use(ConfigProvider);
// Vue.use(Button);
Vue.component(Button.name, Button);
Vue.component(ConfigProvider.name, ConfigProvider);
Vue.component(Menu.name, Menu);
Vue.component(Menu.Item.name, Menu.Item);
Vue.component(Menu.SubMenu.name, Menu.SubMenu);
Vue.component(Menu.Divider.name, Menu.Divider);
Vue.component(Menu.ItemGroup.name, Menu.ItemGroup);
