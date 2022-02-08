import { createStore } from "vuex";
import {DateTime} from "luxon"
import {mount} from "@vue/test-utils";
import AppQuestionView from "@/components/AppQuestionView.vue";


describe("AppQuestionView.vue", () => {

    // needed datas
    const created = "2022-01-15";
    const data = {
        id: 1,
        title: "Question view",
        question: "Did you test your code",
        created: created,
        categories: "art, science, commercial"
    }
    const dateToString = DateTime.fromISO(created).setLocale("en-US").toLocaleString(DateTime.DATETIME_MED);

    // components store specifics
    const store = createStore({
        state() {
            return {
                questionnaireView: { open: false, data: data, error: null,},
                questionnaireEdit: { open: false, saving: false, error: null,}            
            }
        }
    })
    store.dispatch = jest.fn()

    // test component wrapper
    const wrapper = mount(AppQuestionView, {
        global: {
            data() {
                return {
                    completed: false,
                    toDelete: false,
                    loading: false,
                }
            },
            plugins: [store],
            stubs: {
                AppStaffId: true
            }
        }
    })

    // tests
    test("Close button dispatches actionUpdateQuestionnaireView action", async () => {
        // trigger click
        await wrapper.get("[data-test='close-btn']").trigger("click")

        // assert
        expect(store.dispatch).toHaveBeenCalledTimes(1)
        expect(store.dispatch).toHaveBeenCalledWith(
            "actionUpdateQuestionnaireView",
            {open: false, data: "", error: null}
        )
    })

    test("Store questionnaireView state is rendered correctly", () => {
        expect(wrapper.find("h1").text()).toBe(data.title)
        expect(wrapper.html()).toContain(dateToString)
        expect(wrapper.html()).toContain("art")
        expect(wrapper.html()).toContain("science")
        expect(wrapper.html()).toContain("commercial")
        expect(wrapper.html()).toContain("Did you test your code")
    })

    test("Edit button dispatches actionUpdateQuestionnaireEdit and actionUpdateQuestionnaireView actions", async () => {
        // trigger  click
        await wrapper.get("[data-test='edit-btn']").trigger("click")

        // assert
        expect(store.dispatch).toHaveBeenCalledTimes(3)
        expect(store.dispatch).toHaveBeenCalledWith(
            "actionUpdateQuestionnaireEdit",
            {open: true, saving: false, error: null}
        )
        expect(store.dispatch).toHaveBeenCalledWith(
            "actionUpdateQuestionnaireView",
            {open: false, data: data, error: null}
        )
    })
})
