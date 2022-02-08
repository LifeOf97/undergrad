import { createStore } from "vuex";
import {mount} from "@vue/test-utils";
import AppLeftNavLinks from "@/components/AppLeftNavLinks.vue";

describe("AppLeftNavLinks.vue", () => {
    // store with components instance
    const store = createStore({
        state() {
            return {nav: false, signout: false}
        }
    })
    store.dispatch = jest.fn()

    // component wrapper instance
    const wrapper = mount(AppLeftNavLinks, {
        global: { plugins: [store] },
    })

    test("3 router-link and 1 button should be rendered", () => {
        expect(wrapper.find("[data-test='dashboard']").exists()).toBeTruthy()
        expect(wrapper.find("[data-test='schedule']").exists()).toBeTruthy()
        expect(wrapper.find("[data-test='student']").exists()).toBeTruthy()
        expect(wrapper.find("button").exists()).toBeTruthy()
    })

    test("Dashboard link should navigate to staff dashboard and dispatch actionUpdateNav action when clicked", async () => {
        wrapper.get("[data-test='dashboard']").trigger("click")

        // assert that actionUpdateNav action was dispatched
        expect(store.dispatch).toHaveBeenCalledWith(
            "actionUpdateNav",
            {state: false}
        )
    })

    test("Shedule link should navigate to staff schedules and dispatch actionUpdateNav action when clicked", async () => {
        await wrapper.get("[data-test='schedule']").trigger("click")
        
        // assert that actionUpdateNav action was dispatched
        expect(store.dispatch).toHaveBeenCalledWith(
            "actionUpdateNav",
            {state: false}
        )
    })

    test("My student link should navigate to staff's student view and dispatch actionUpdateNav action when clicked", async () => {
        await wrapper.get("[data-test='student']").trigger("click")
        
        // assert that actionUpdateNav action was dispatched
        expect(store.dispatch).toHaveBeenCalledWith(
            "actionUpdateNav",
            {state: false}
        )
    })

    test("Signout button should dispatch actionUpdateSignout action on click", async () => {
        await wrapper.get("button").trigger("click")

        expect(store.dispatch).toHaveBeenCalledWith(
            "actionUpdateSignout",
            {state: true}
        )
    })
})