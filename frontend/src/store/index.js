import { createStore } from 'vuex'
import Cookies from "js-cookie";
import axios from "axios";

// axios settings
axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
// axios.defaults.baseURL = "http://192.168.43.208:8000/api/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 9000;

// cookies settings
Cookies.set("staff_id", "");

export default createStore({
  state: {
    nav: false,
    signout: false,
    auth: {
      isAuthenticating: false,
      isAuthenticated: false,
      authToken: null,
      error: null,
    },
    staffData: "",
    staffError: null,
    questionnaires: {
      data: "",
      loading: false,
      error: null,
    },
    questionnaireForm: {
      open: false,
      saving: false,
      error: null,
    },
    questionnaireEdit: {
      open: false,
      saving: false,
      error: null,
    },
    questionnaireView: {
      open: false,
    },
    observationForm: {
      open: false,
      saving: false,
      error: null,
    },
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
    updateAuthState(state, payload) {
      state.auth.isAuthenticating = payload.isAuthenticating;
      state.auth.isAuthenticated = payload.isAuthenticated;
      state.auth.authToken = payload.token;
      state.auth.error = payload.error;
    },
    updateStaffDataState(state, payload) {
      state.staffData = payload.detail;
    },
    updateStaffErrorState(state, payload) {
      state.staffError = payload.error;
    },
    updateQuestionnaire(state, payload) {
      state.questionnaires.data = payload.detail;
      state.questionnaires.loading = payload.loading;
      state.questionnaires.error = payload.error;
    },
    updateQuestionnaireForm(state, payload) {
      // mutation to update the qform state
      state.questionnaireForm.open = payload.open;
      state.questionnaireForm.saving = payload.saving;
      state.questionnaireForm.error = payload.error;
    },
    updateQuestionnaireEdit(state, payload) {
      // mutation to update the qform state
      state.questionnaireEdit.open = payload.open;
      state.questionnaireEdit.saving = payload.saving;
      state.questionnaireEdit.error = payload.error;
    },
    updateObservationForm(state, payload) {
      // mutation to update the qform state
      state.observationForm.open = payload.open;
      state.observationForm.saving = payload.saving;
      state.observationForm.error = payload.error;
    },
    updateQuestionnaireView(state, payload) {
      // mutation to update the qform state
      state.questionnaireView.open = payload.open;
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
    actionUpdateQuestionnaireForm(context, payload) {
      // commit updateQuestionnaireForm mutation
      context.commit("updateQuestionnaireForm", payload);
    },
    actionUpdateQuestionnaireEdit(context, payload) {
      // commit updateQuestionnaireEdit mutation
      context.commit("updateQuestionnaireEdit", payload);
    },
    actionUpdateQuestionnaireView(context, payload) {
      // commit updateQuestionnaireView mutation
      context.commit("updateQuestionnaireView", payload);
    },
    actionUpdateObservationForm(context, payload) {
      // commit updateObservationForm mutation
      context.commit("updateObservationForm", payload);
    },
    async actionSignin(context, payload) {
      // action to signin a staff. First set isAuthenticating state to true
      context.commit("updateAuthState", {isAuthenticating: true});
      // then post the staffid/password using axios to get the staff token.
      await axios.post("auth/signin/", {username: payload.staffId, password: payload.password})
        .then((resp) => {
          // if success response, update auth state staffToken state with the returned token,
          // set isAuthenticated to true, signinError state back to null,
          // isAuthenticating state to false and update staff_id cookie.
          context.commit("updateAuthState", {
            ...resp.data,
            isAuthenticated: true,
            isAuthenticating: false,
            error: null,
          })
          Cookies.set("staff_id", payload.rememberMe ? `${payload.staffId}`:"", {expires: 366})
          // console.log(resp.data);
          // then dispatch the actionGetStaffData action to get the staff data.
          context.dispatch("actionGetStaffData", payload)
        })
        .catch((err) => {
          // if error response. set auth staffToken state to null, isAuthenticating
          // and isAuthenticated state to false, set signinError state to the error
          // text and set staffData state to null.
          context.commit("updateAuthState", {
            token: null,
            isAuthenticating: false,
            isAuthenticated: false,
            error: err.toString().slice(7).startsWith("Network") ? "Please check your network connection":"Incorrect staff id/password",
          })
          // console.log(err.toString().slice(7));
        });
    },
    async actionGetStaffData(context, payload) {
      // action to get the currently signed in staff data
      await axios.get(`staffs/${payload.staffId}/`)
        .then((resp) => {
          // if success response, update auth staffData state with the returned data
          context.commit("updateStaffDataState", {detail: resp.data})
        })
        .catch((err) => {console.log(err.response.data)});
    },
    async actionSignout(context, payload) {
      // action to sign out a staff, first set auth staffToken state to null,
      // isAuthenticated state to false and staffData to an empty string.
      context.commit("updateAuthState", {
        token: null,
        isAuthenticating: false,
        isAuthenticated: false,
        error: null,
      });
      // also dispatch actionUpdateSignout to update signout state.
      context.dispatch("actionUpdateSignout", payload)
    },
    async actionCreateQuestionnaire(context, payload) {
      // action to create a questionnaire. First update actionUpdateQuestionnaireForm state
      // to set open and saving to true
      context.commit("updateQuestionnaireForm", {open: true, saving: true, error: null})
      axios.post(
          `staffs/${context.state.staffData.staff_id}/questionnaires/create/`,
          {...payload},
          {headers: {"Authorization": `token ${context.state.auth.authToken}`}}
        )
        .then(() => {
          // if success response, update actionUpdateQuestionnaireForm state to set open
          // and saving to false.
          context.commit("updateQuestionnaireForm", {open: false, saving: false, error: null})
          // then dispath the actionRetrieveQuestionnaires to update the questionnaire list.
          context.dispatch("actionRetrieveQuestionnaires");
          // console.log(resp.data)
        })
        .catch(() => {
          // if failed response, update actionUpdateQuestionnaireForm state to set error
          // to an error text, open state to true and saving state to false.
          context.commit("updateQuestionnaireForm", {open: true, saving: false, error: "Please check your internet connection."})
          // console.log(err.response.data)
        });
    },
    async actionRetrieveQuestionnaires(context) {
      // action to get all questionnaire by the currently logged in staff, first update
      // questionnaire loading state to true.
      context.commit("updateQuestionnaire", {detail: "", loading: true, error: null})
      await axios.get(`staffs/${context.state.staffData.staff_id}/questionnaires/`, {headers: {"Authorization": `token ${context.state.auth.authToken}`}})
        .then((resp) => {
          // if success response, update questionnaire loading state to false and set
          // data state to the returned list of questionnaire.
          context.commit("updateQuestionnaire", {detail: resp.data.reverse(), loading: false, error: null})
          // console.log(resp.data);
        })
        .catch(() => {
          // if failed response, update questionnaires loading state to false and update
          // error state to the error message.
          context.commit("updateQuestionnaire", {detail: "", loading: false, error: "An error occured"})
          // console.log(err.response.data);
        });
    }
  },
  modules: {
  }
})
