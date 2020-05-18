<!--
 * @Author: 付国强
 * @Date: 2020-02-25 15:19:23
 * @LastEditors: 付国强
 * @LastEditTime: 2020-02-25 17:20:49
 * @Description:
 -->
<template>
  <div>
    <h2>{{ useName }}</h2>
    <!-- 添加按钮 -->
    <div>
      <button @click="changeName">change to json</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  computed: {
    // 对象中的state 和数组中的localJobTitle 都是和login中的参数一一对应。
    ...mapState({
      useName: state => state.views.login.useName
    })
  },
  methods: {
    changeName() {
      this.$store.dispatch("views/login/changeName", "Jason");
    }
  }
};
</script>
