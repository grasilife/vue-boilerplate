/*
 * @Author: 付国强
 * @Date: 2020-02-25 15:19:23
 * @LastEditors: 付国强
 * @LastEditTime: 2020-02-25 17:21:30
 * @Description:
 */
const state = {
  useName: "sam"
};
const mutations = {
  change_name(state, payload) {
    state.useName = payload;
  }
};
const actions = {
  changeName({ commit, rootState }, payload) {
    commit("change_name", payload);
  }
};
const getters = {
  localJobTitle(state, getters, rootState, rootGetters) {
    return rootGetters.jobTitle + " aka " + rootState.job;
  }
};
// namespaced 属性，限定命名空间
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
