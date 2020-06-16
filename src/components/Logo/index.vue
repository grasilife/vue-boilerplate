<!--
 * @Author: 付国强
 * @Date: 2020-02-28 14:22:25
 * @LastEditors: 付国强
 * @LastEditTime: 2020-06-16 19:33:14
 * @Description:
 -->
<template>
  <div class="comp-logo">
    <div class="title">
      <img src="../../assets/img/logo.png" class="titleImg" />
    </div>
    <div class="titleName">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: "Logo",

  props: {
    title: {
      type: String,
      required: true,
      default: function() {
        return "业务中台客户端";
      }
    }
  },

  mixins: [],

  components: {},

  data() {
    return {
      theme: "primary",
      userName: "付国强"
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
