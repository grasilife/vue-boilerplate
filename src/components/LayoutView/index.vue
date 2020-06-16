<template>
  <div class="comp-layout-view">
    <div class="header">
      <HeaderMenu></HeaderMenu>
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeaderMenu from "../HeaderMenu/index";
import { mapState, mapMutations, mapActions, mapGetters, Store } from "vuex";
export default {
  name: "LayoutView",

  props: {},

  mixins: [],

  components: {
    HeaderMenu
  },

  data() {
    return {};
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
