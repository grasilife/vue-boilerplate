<template>
  <div id="app">
    <LayoutView></LayoutView>
  </div>
</template>
<script>
import LayoutView from "./components/LayoutView/index";
import { mapState, mapMutations, mapActions, mapGetters, Store } from "vuex";
export default {
  name: "app",

  props: {},

  mixins: [],

  components: {
    LayoutView
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
<style lang="less" rel="stylesheet/less">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
