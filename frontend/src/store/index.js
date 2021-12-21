import { createStore } from 'vuex'
import Cookies from "js-cookie";
import axios from "axios";

// axios settings
// axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
axios.defaults.baseURL = "http://192.168.43.208:8000/api/";
axios.defaults.timeout = 9000;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

// cookies settings
Cookies.set("staff_id", "");


export default createStore({
  state: {
    nav: false,
    signout: false,
    qform: false,
    qformEdit: false,
    qview: false,
    oform: false,
    isAuthenticating: false,
    isAuthenticated: false,
    staffToken: null,
    staffData: "",
    signinError: null,
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
    updateIsAuthenticatingState(state, payload) {
      state.isAuthenticating = payload.state;
    },
    updateIsAuthenticatedState(state, payload) {
      state.isAuthenticated = payload.state;
    },
    updateStaffTokenState(state, payload) {
      state.staffToken = payload.token;
    },
    updateStaffDataState(state, payload) {
      state.staffData = payload.detail;
    },
    updateSigninErrorState(state, payload) {
      state.signinError = payload.detail;
    },
  },
  actions: {
    actionUpdateNav(context, payload) {
      // commit updateNavState mutation
      context.commit("updateNavState", payload);
    },
    actionUpdateSignout(context, payload) {
      // commit updateSignoutState mutation
      context.commit("updateSignoutState", payload);
    },
    actionUpdateQform(context, payload) {
      // commit updateQformState mutation
      context.commit("updateQformState", payload);
    },
    actionUpdateQformEdit(context, payload) {
      // commit updateQformEditState mutation
      context.commit("updateQformEditState", payload);
    },
    actionUpdateQview(context, payload) {
      // commit updateQviewState mutation
      context.commit("updateQviewState", payload);
    },
    actionUpdateOform(context, payload) {
      // commit updateOformState mutation
      context.commit("updateOformState", payload);
    },
    async actionSignin(context, payload) {
      // action to signin a staff. First set isAuthenticating state to true
      context.commit("updateIsAuthenticatingState", {state: true});
      // then post the staffid/password using axios to get the staff token.
      await axios.post("auth/signin/", {username: payload.staffId, password: payload.password})
        .then((resp) => {
          // if success response, update staffToken state with the returned token,
          // set isAuthenticated to true, signinError state back to null,
          // isAuthenticating state to false and update staff_id cookie.
          context.commit("updateStaffTokenState", {...resp.data})
          context.commit("updateIsAuthenticatedState", {state: true});
          context.commit("updateSigninErrorState", {detail: null});
          context.commit("updateIsAuthenticatingState", {state: false});
          Cookies.set("staff_id", payload.rememberMe ? `${payload.staffId}`:"", {expires: 366})
          // console.log(resp.data);
          // then dispatch the actionGetStaffData action to get the staff data.
          context.dispatch("actionGetStaffData", payload)
        })
        .catch((err) => {
          // if error response. set staffToken state to null, set isAuthenticating
          // and isAuthenticated state to false, set signinError state to the error
          // text and set staffData state to null
          context.commit("updateStaffTokenState", {token: null});
          context.commit("updateIsAuthenticatingState", {state: false});
          context.commit("updateIsAuthenticatedState", {state: false});
          context.commit("updateSigninErrorState", {
            detail: err.toString().slice(7).startsWith("Network") ? "Please check your network connection":"Incorrect staff id/password"
          });
          context.commit("updateStaffDataState", {detail: ""});
          // console.log(err.toString().slice(7));
        });
    },
    async actionGetStaffData(context, payload) {
      // action to get the currently signed in staff data
      await axios.get(`staffs/${payload.staffId}/`)
        .then((resp) => {
          // if success response, update staffData with the returned data
          // console.log(resp.data)
          context.commit("updateStaffDataState", {detail: resp.data})
        })
        .catch((err) => {console.log(err.response.data)});
    },
    actionResetStaffData(context) {
      // action to reset the staffData state.
      context.commit("updateStaffDataState", {detail: ""})
    },
    async actionSignout(context, payload) {
      // action to sign out a staff, first set staffToken to null, set
      // isAuthenticated state to false and staffData to an empty string.
      context.commit("updateStaffTokenState", {token: null});
      context.commit("updateIsAuthenticatedState", {state: false});
      context.commit("updateStaffDataState", {detail: ""})
      // also dispatch actionUpdateSignout to update signout state.
      context.dispatch("actionUpdateSignout", payload)
    }
  },
  modules: {
  }
})
