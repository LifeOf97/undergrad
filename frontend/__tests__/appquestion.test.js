import {mount} from "@vue/test-utils";
import AppQuestion from "@/components/AppQuestion.vue";
import {DateTime} from "luxon";
import { createStore } from "vuex";

describe("AppQuestion.vue", () => {
    // needed variables
    const date = "2022-01-14"
    const dateCreated = DateTime.fromISO(date).toRelative()
    const question = {
        title: "Hello title",
        students: [1,2,3,4],
        created: date
    
    }
    // components store requirements
    const store = createStore({
        state() {
            return {
                questionnaireView: { open: false, data: "", error: null }
            }
        }
    })
    store.dispatch = jest.fn()

    // test component wrapper
    const wrapper = mount(AppQuestion, {
        props: { question },
        global: {
            plugins: [store]
        }
    })
    
    // tests
    test("Question props is renderd correctly", () => {
        // assert
        expect(wrapper.get("[data-test='title']").text()).toBe("Hello title")
        expect(wrapper.get("[data-test='students']").text()).toBe("4 student(s)")
        expect(wrapper.get("[data-test='duration']").text()).toBe(dateCreated)
    })

    test("Button click dispatches actionUpdateQuestionnaireView action", async () => {
        // trigger button click
        await wrapper.get("button").trigger("click")

        // assert
        expect(store.dispatch).toHaveBeenCalledTimes(1)
        expect(store.dispatch).toHaveBeenCalledWith(
            "actionUpdateQuestionnaireView",
            {open: true, data: question, error: null}
        )
    })
})