import { createStore } from "vuex";
import {mount} from "@vue/test-utils";
import AppLeftNavButton from "@/components/AppLeftNavButton.vue";


describe("AppLeftNavButton.vue", () => {
    // component store specifics
    const store = createStore({
        state() {
            return { nav: false }
        },
    })
    store.dispatch = jest.fn()

    // components instance
    const wrapper = mount(AppLeftNavButton, {
        global: {
            plugins: [store]
        }
    })

    test("A button is rendered", () => {
        expect(wrapper.find("button").exists()).toBeTruthy()
    })

    test("Button click should dispatch actionUpdateNav action", async () => {
        await wrapper.get("button").trigger("click")

        // assert dispatch was called
        expect(store.dispatch).toHaveBeenCalledWith(
            "actionUpdateNav",
            {state: true}
        )
    })
})