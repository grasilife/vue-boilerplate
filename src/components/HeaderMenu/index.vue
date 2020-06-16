<template>
  <div class="comp-header-menu">
    <div class="header-menu-logo">
      <Logo :title="systemName"></Logo>
    </div>

    <div class="header-menu-others">
      <div class="header-menu">
        <Menu :menus="menus" mode="horizontal"></Menu>
      </div>
      <div class="header-other">
        <a-icon type="bell" class="icon" />
        <div class="avatar">
          <a-avatar icon="user" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "../Logo/index";
import Menu from "../Menu//index";
import { mapState, mapMutations, mapActions, mapGetters, Store } from "vuex";
export default {
  name: "HeaderMenu",

  props: {},

  mixins: [],

  components: {
    Logo,
    Menu
  },

  data() {
    return {
      systemName: "营销系统",
      menus: [
        {
          key: "Home",
          title: "主页",
          path: "/"
        },
        {
          key: "VueMicroApp",
          title: "Vue 主页",
          path: "/vue"
        },
        {
          key: "VueMicroAppList",
          title: "Vue 列表页",
          path: "/vue/list"
        }
      ]
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {}
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "./style.less";
</style>
