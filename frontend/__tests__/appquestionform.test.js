import {mount} from "@vue/test-utils";
import AppQuestionForm from "@/components/AppQuestionForm.vue";
import { createStore, Store } from "vuex";


describe("AppQuestionForm.vue", () => {
    // components store specifics
    const store = createStore({
        state() {
            return {
                questionnaireForm: { open: false, saving: false, error: null,},
                questionnaireView: { open: false, data: "", error: null,},
                questionnaireEdit: { open: false, saving: false, error: null,},            
            }
        }
    })
    store.dispatch = jest.fn()

    // needed datas
    const data = {
        title: "",
        question: "",
        completed: false,
        filter: [],
   }

   // test component wrapper
   const wrapper = mount(AppQuestionForm, {
       data() { return data },
       global: { plugins: [store] }
   })

    // tests
    test("Close and forn cancle button should dispatch actionUpdateQuestionnaireForm and actionUpdateQuestionnaireEdit action", async () => {
        // click the close button
        await wrapper.get("[data-test='close-btn']").trigger("click")

        // assert
        expect(store.dispatch).toHaveBeenCalledTimes(2)
        expect(store.dispatch).toHaveBeenCalledWith(
            "actionUpdateQuestionnaireForm",
            {open: false, saving: false, error: null}
        )
        expect(store.dispatch).toHaveBeenCalledWith(
            "actionUpdateQuestionnaireEdit",
            {open: false, saving: false, error: null}
        )

        // click the form cancle button
        await wrapper.get("[data-test='cancle-btn']").trigger("click")

        // assert
        expect(store.dispatch).toHaveBeenCalledTimes(4)
        expect(store.dispatch).toHaveBeenCalledWith(
            "actionUpdateQuestionnaireForm",
            {open: false, saving: false, error: null}
        )
        expect(store.dispatch).toHaveBeenCalledWith(
            "actionUpdateQuestionnaireEdit",
            {open: false, saving: false, error: null}
        )
    })

    test("Error field is only rendered when questionnaireForm.error or questionnaireEdit.error is not null ", async () => {
        expect(wrapper.find("[data-test='error']").exists()).toBeFalsy()
    })

    test("All gender, level and departments should be rendered", () => {
        expect(wrapper.html()).toContain("male")
        expect(wrapper.html()).toContain("female")
        expect(wrapper.html()).toContain("jss1")
        expect(wrapper.html()).toContain("jss2")
        expect(wrapper.html()).toContain("jss3")
        expect(wrapper.html()).toContain("sss1")
        expect(wrapper.html()).toContain("sss2")
        expect(wrapper.html()).toContain("sss3")
        expect(wrapper.html()).toContain("art")
        expect(wrapper.html()).toContain("commercial")
        expect(wrapper.html()).toContain("science")
        expect(wrapper.html()).toContain("social science")
    })

    test("Only save form button should be rendered", () => {
        // assert
        expect(wrapper.find("[data-test='create-btn']").exists()).toBeFalsy()
        expect(wrapper.find("[data-test='save-btn']").exists()).toBeTruthy()
    })

})