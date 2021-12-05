import { createStore } from 'vuex'

export default createStore({
  state: {
    nav: false,
  },
  mutations: {
    updateNavState(state, payload) {
      // mutation to update the nav state
      state.nav = payload.state;
    }
  },
  actions: {
    commitUpdateNav(context, payload) {
      // commit updateNavState mutation
      context.commit("updateNavState", payload);
    },
  },
  modules: {
  }
})
