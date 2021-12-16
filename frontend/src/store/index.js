import { createStore } from 'vuex'

export default createStore({
  state: {
    nav: false,
    qform: false,
    qview: false,
  },
  mutations: {
    updateNavState(state, payload) {
      // mutation to update the nav state
      state.nav = payload.state;
    },
    updateQformState(state, payload) {
      // mutation to update the qform state
      state.qform = payload.state;
    },
    updateQviewState(state, payload) {
      // mutation to update the qform state
      state.qview = payload.state;
    },
  },
  actions: {
    commitUpdateNav(context, payload) {
      // commit updateNavState mutation
      context.commit("updateNavState", payload);
    },
    commitUpdateQform(context, payload) {
      // commit updateNavState mutation
      context.commit("updateQformState", payload);
    },
    commitUpdateQview(context, payload) {
      // commit updateNavState mutation
      context.commit("updateQviewState", payload);
    },
  },
  modules: {
  }
})
