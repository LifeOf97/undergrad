import {mount} from "@vue/test-utils";
import AppButton from "@/components/AppButton.vue";

describe("AppButton.vue", () => {
    const wrapper = mount(AppButton);

    test("Make sure AppButton is in default state", () => {
        expect(wrapper.findAll("button")).toHaveLength(1)
        expect(wrapper.get("button").text()).toBe("Submit")
        expect(wrapper.get("button").text()).not.toBe("Loading")
        expect(wrapper.get("button").attributes()).toHaveProperty("type")
        expect(wrapper.get("button").attributes()).not.toHaveProperty("disabled")
    })

    test("Loading state is rendered", async () => {
        // assert that submit text is rendered when loading prop is false
        expect(wrapper.get("button").text()).toBe("Submit")

        // set loading prop to true
        await wrapper.setProps({loading: true})

        // assert that Submitting text is rendered when loading is true
        expect(wrapper.get("button").text()).toBe("Submitting") 
    })
})