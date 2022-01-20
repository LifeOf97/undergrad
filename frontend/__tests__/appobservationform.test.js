import { createStore } from "vuex";
import {mount} from "@vue/test-utils";
import AppObservationForm from "@/components/AppObservationForm.vue";

describe("AppObservationForm.vue", () => {
    // component store instance
    const store = createStore({
        state() {
            return {
                observationForm: { open: false, saving: false, error: null}
            }
        }
    })
    store.dispatch = jest.fn()

    // test component instance
    const wrapper = mount(AppObservationForm, {
        shallow: true,
        global: {
            plugins: [store]
        }
    })

    test("Close/Cancle button dispatches actionUpdateObservationForm action when clicked", async () => {
        // trigger close button
        await wrapper.get("[data-test='close-btn']").trigger("click")
        
        // assert an action was dispatched
        expect(store.dispatch).toHaveBeenCalledTimes(1)
        expect(store.dispatch).toHaveBeenCalledWith(
            "actionUpdateObservationForm",
            {open: false, saving: false, error: null}
        )

        // trigger cancle button
        await wrapper.get("[data-test='cancle-btn']").trigger("click")
        
        // assert an action was dispatched
        expect(store.dispatch).toHaveBeenCalledTimes(2)
        expect(store.dispatch).toHaveBeenCalledWith(
            "actionUpdateObservationForm",
            {open: false, saving: false, error: null}
        )
    })

    test("Dispatches actionCreateObservation action when form is submitted", async () => {
        // update component data
        wrapper.setData({detail: "We test"})

        // trigger form submit button
        await wrapper.get("form").trigger("submit")

        // assert actionCreateObservation action was dispatched with the detail data argument
        expect(store.dispatch).toHaveBeenCalledTimes(3)
        expect(store.dispatch).toHaveBeenCalledWith(
            "actionCreateObservation",
            {data: {detail: "We test"} }
        )
    })
})