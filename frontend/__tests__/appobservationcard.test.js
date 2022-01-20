import { createStore } from "vuex"
import {mount} from "@vue/test-utils";
import  AppObservationCard from "@/components/AppObservationCard.vue";
import {DateTime} from "luxon";


describe("AppObservationCard.vue", () => {
    // create store with components specifics
    const store = createStore({
        state() {
            return {
                observationDelete: {open: false, id: ""}
            }
        }})
    store.dispatch = jest.fn()
    
    // set data required
    const date = "2022-01-12"
    const dateToStrng = DateTime.fromISO(date).setLocale("en-US").toLocaleString(DateTime.DATE_MED);
    
    // component instance
    const wrapper = mount(AppObservationCard, {
        props: {
            observation: {
                id: 1,
                created: date,
                detail: "Happy Birthday!",
                staff_id: "STF8800"
            }
        },
        global: {plugins: [store]}
    })

    test("There should be 3 span tags in details summary tag body", () => {
        expect(wrapper.findAll("summary span")).toHaveLength(3)
    })

    test("Observation props is rendered correctly", () => {
        expect(wrapper.findAll("summary span")[0].text()).toBe(dateToStrng)
        expect(wrapper.findAll("summary span")[1].text()).toBe("Happy Birthday!")
        expect(wrapper.findAll("summary span")[2].text()).toBe("By: STF8800")
    })

    test("Dispatches actionUpdateObservationDelete action when delete button is clicked", async () => {
        // trigger click on delete button
        await wrapper.get("[data-test='btn-delete']").trigger("click")

        // assert dispatch was called with the right arguments
        expect(store.dispatch).toHaveBeenCalledWith(
            "actionUpdateObservationDelete",
            {open: true, id: 1}
        )
    })
})