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
      data: "",
      error: null,
    },
    observationForm: {
      open: false,
      saving: false,
      error: null,
    },
    scheduleForm: {
      saving: false,
      error: null
    },
    schedules: {
      data: "",
      loading: false,
      error: null,
    },
    scheduleDelete: {
      open: false,
      id: "",
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
      state.questionnaireForm.open = payload.open;
      state.questionnaireForm.saving = payload.saving;
      state.questionnaireForm.error = payload.error;
    },
    updateQuestionnaireEdit(state, payload) {
      state.questionnaireEdit.open = payload.open;
      state.questionnaireEdit.saving = payload.saving;
      state.questionnaireEdit.error = payload.error;
    },
    updateObservationForm(state, payload) {
      state.observationForm.open = payload.open;
      state.observationForm.saving = payload.saving;
      state.observationForm.error = payload.error;
    },
    updateQuestionnaireView(state, payload) {
      state.questionnaireView.open = payload.open;
      state.questionnaireView.data = payload.data;
      state.questionnaireView.error = payload.error;
    },
    updateScheduleForm(state, payload) {
      state.scheduleForm.saving = payload.saving;
      state.scheduleForm.error = payload.error;
    },
    updateSchedules(state, payload) {
      state.schedules.data = payload.data;
      state.schedules.loading = payload.loading;
      state.schedules.error = payload.error;
    },
    updateScheduleDelete(state, payload) {
      state.scheduleDelete.open = payload.open;
      state.scheduleDelete.id = payload.id;
    }
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
    actionUpdateScheduleDelete(context, payload) {
      // commit updateScheduleDelete mutation
      context.commit("updateScheduleDelete", payload);
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
    async actionUpdateQuestionnaire(context, payload) {
      // action to update a questionnaire. First update actionUpdateQuestionnaireEdit state
      // to set open and saving to true
      context.commit("updateQuestionnaireEdit", {open: true, saving: true, error: null})
      axios.patch(
          `staffs/${context.state.staffData.staff_id}/questionnaires/${payload.id}/update/`,
          {...payload.data},
          {headers: {"Authorization": `token ${context.state.auth.authToken}`}}
        )
        .then(() => {
          // if success response, update actionUpdateQuestionnaireEdit state to set open
          // and saving to false.
          context.commit("updateQuestionnaireEdit", {open: false, saving: false, error: null})
          // then dispath the actionRetrieveQuestionnaires to update the questionnaire list.
          context.dispatch("actionRetrieveQuestionnaires");
          // console.log(resp.data)
        })
        .catch(() => {
          // if failed response, update actionUpdateQuestionnaireEdit state to set error
          // to an error text, open state to true and saving state to false.
          context.commit("updateQuestionnaireEdit", {open: true, saving: false, error: "Please check your internet connection."})
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
          context.commit("updateQuestionnaire", {detail: resp.data, loading: false, error: null})
          // console.log(resp.data);
        })
        .catch(() => {
          // if failed response, update questionnaires loading state to false and update
          // error state to the error message.
          context.commit("updateQuestionnaire", {detail: "", loading: false, error: "An error occured"})
          // console.log(err.response.data);
        });
    },
    async actionDeleteQuestionnaire(context, payload) {
      // action to delete a questionnaire instance
      await axios.delete(
        `staffs/${context.state.staffData.staff_id}/questionnaires/${payload.delete}/delete/`,
        {headers: {"Authorization": `token ${context.state.auth.authToken}`}},)
        .then((resp) => {
          // if success response, update questionnaireView open state to false, data to empty string
          // error to null dispatch the actionRetrieveQuestionnaires to retrieve the questionnaire list.
          context.commit("updateQuestionnaireView", {open: false, data: "", error: null});
          context.dispatch("actionRetrieveQuestionnaires");
          console.log(resp);
        })
        .catch((err) => {
          // if failded response
          console.log(err.response.data);
        })
    },
    async actionCreateSchedule(context, payload) {
      // action to create a new schedule, first update scheduleForm saving and error state
      // then post the data to create.
      context.commit("updateScheduleForm", {saving: true, error: null})
      await axios.post(
        `staffs/${context.state.staffData.staff_id}/schedules/create/`,
        {...payload.data},
        {headers: {"Authorization": `token ${context.state.auth.authToken}`}},
      )
        .then((resp) => {
          // if success response, update scheduleForm saving and error state,
          // and dispatch the actionRetrieveSchedule action
          context.commit("updateScheduleForm", {saving: false, error: null})
          context.dispatch("actionRetrieveSchedule")
          console.log(resp.data)
        })
        .catch((err) => {
          // if failed response, update scheduleForm saving and error state
          context.commit("updateScheduleForm", {saving: false, error: "An error occured, try creating it again."})
          console.log(err.response.data);
        })
    },
    async actionUpdateSchedule(context, payload) {
      // action to update a schedule
      await axios.patch(
        `staffs/${context.state.staffData.staff_id}/schedules/${payload.id}/update/`,
        {completed: payload.completed},
        {headers: {"Authorization": `token ${context.state.auth.authToken}`}}
      )
        .then((resp) => {
          // if success response, dispatch the actionRetrieveSchedule action
          context.dispatch("actionRetrieveSchedule")
          console.log(resp.data)
        })
        .catch((err) => {
          // if failed response
          console.log(err.response);
        })
    },
    async actionRetrieveSchedule(context) {
      // action to retrieve all schedules belonging to the currently logged in user
      // first set scheduleView loading state to true and error to null, then make a get
      // request
      context.commit("updateSchedules", {loading: true, data: "", error: null})
      axios.get(`staffs/${context.state.staffData.staff_id}/schedules/`, {headers: {"Authorization": `token ${context.state.auth.authToken}`}})
        .then((resp) => {
          // if success response, update scheduleView data, loading and error state
          context.commit("updateSchedules", {loading: false, data: resp.data, error: null})
          console.log(resp.data)
        })
        .catch((err) => {
          // if failed response, update scheduleView data, laoding and error state
          context.commit("updateSchedules", {loading: false, data: "", error: "An error occured"})
          console.log(err.response.data)
        })
    },
    async actionDeleteSchedule(context) {
      // action to delete a schedule instance
      await axios.delete(
        `staffs/${context.state.staffData.staff_id}/schedules/${context.state.scheduleDelete.id}/delete/`,
        {headers: {"Authorization": `token ${context.state.auth.authToken}`}})
        .then((resp) => {
          // if success response, dispatch the actionUpdateScheduleDelete and
          // actionRetrieveSchedule action
          context.dispatch("actionUpdateScheduleDelete", {open: false, id: ""});
          context.dispatch("actionRetrieveSchedule");
          console.log(resp.data);
        })
        .catch((err) => {
          // if failed response
          console.log(err.response);
        })
    }
  },
  modules: {
  }
})
