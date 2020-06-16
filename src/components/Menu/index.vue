<!--
 * @Author: 付国强
 * @Date: 2020-06-15 22:06:42
 * @LastEditors: 付国强
 * @LastEditTime: 2020-06-16 00:33:04
 * @Description:
-->
<template>
  <div class="comp-menu">
    <a-menu :mode="mode" theme="dark" :selectedKeys="[selectKey]">
      <a-menu-item v-for="item in menus" :key="item.key" @click="changeMenu(item)">
        <router-link :to="{ path: item.path }">
          <a-icon v-if="item.icon" :type="item.icon" />
          <span>{{ item.title }}</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters, Store } from "vuex";
export default {
  name: "Menu",

  props: {
    menus: {
      type: Array,
      required: true,
      default: function() {
        return [];
      }
    },
    mode: {
      type: String,
      required: false,
      default: function() {
        return "vertical";
      }
    }
  },

  mixins: [],

  components: {},

  data() {
    return {
      selectKey: ""
    };
  },

  computed: {},

  watch: {
    "$route.path": function() {
      this._initMenus();
    }
  },

  created() {
    this._initMenus();
  },

  mounted() {},

  destroyed() {},

  methods: {
    _initMenus() {
      console.log(this.$route, "this.$route");
      const currentMenu = this._findCurrentMenu(this.menus, this.$route.path);
      if (!currentMenu) return;
      const { key } = currentMenu;
      this.selectKey = key;
    },
    _findCurrentMenu(menus, currentPath) {
      for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        const { path } = menu;
        if (path === currentPath) return menu;

        const currentMenu = this._findCurrentMenu(menu.children || [], currentPath);
        if (currentMenu) return currentMenu;
      }
      return null;
    },
    // 切换菜单
    changeMenu(item) {
      const { key } = item;
      this.selectKey = key;
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "./style.less";
</style>
