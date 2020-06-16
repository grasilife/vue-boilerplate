<template>
  <div class="page-home">
    home 视图
    <Menu :menus="menus"></Menu>
  </div>
</template>

<script>
import Menu from "../../components/Menu/index";
import { mapState, mapMutations, mapActions, mapGetters, Store } from "vuex";
export default {
  name: "home",

  mixins: [],

  components: {
    Menu
  },

  data() {
    return {
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
