import { createStore } from 'vuex'

export default createStore({
  state: {
    nav: false,
    signout: false,
    qform: false,
    qformEdit: false,
    qview: false,
    oform: false,
  },
  mutations: {
    updateNavState(state, payload) {
      // mutation to update the nav state
      state.nav = payload.state;
    },
    updateSignoutState(state, payload) {
      // mutation to update the nav state
      state.signout = payload.state;
    },
    updateQformState(state, payload) {
      // mutation to update the qform state
      state.qform = payload.state;
    },
    updateQformEditState(state, payload) {
      // mutation to update the qform state
      state.qformEdit = payload.state;
    },
    updateQviewState(state, payload) {
      // mutation to update the qform state
      state.qview = payload.state;
    },
    updateOformState(state, payload) {
      // mutation to update the qform state
      state.oform = payload.state;
    },
  },
  actions: {
    commitUpdateNav(context, payload) {
      // commit updateNavState mutation
      context.commit("updateNavState", payload);
    },
    commitUpdateSignout(context, payload) {
      // commit updateSignoutState mutation
      context.commit("updateSignoutState", payload);
    },
    commitUpdateQform(context, payload) {
      // commit updateQformState mutation
      context.commit("updateQformState", payload);
    },
    commitUpdateQformEdit(context, payload) {
      // commit updateQformEditState mutation
      context.commit("updateQformEditState", payload);
    },
    commitUpdateQview(context, payload) {
      // commit updateQviewState mutation
      context.commit("updateQviewState", payload);
    },
    commitUpdateOform(context, payload) {
      // commit updateOformState mutation
      context.commit("updateOformState", payload);
    },
  },
  modules: {
  }
})
