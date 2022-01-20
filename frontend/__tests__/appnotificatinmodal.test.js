import {mount} from "@vue/test-utils";
import AppNotificationModal from "@/components/AppNotificationModal.vue";


describe("AppNotificationModal.vue", () => {
    const wrapper = mount(AppNotificationModal, {
        slots: {default: "Rendered content"}
    })

    test("Default values are rendered", () => {
        expect(wrapper.findAll("svg")).toHaveLength(1)
        expect(wrapper.get("[data-test='detail'] h4").text()).toBe("Title")
        expect(wrapper.get("[data-test='detail'] p").text()).toBe("Description")
    })

    test("Default slot renders when content is passed", () => {
        expect(wrapper.html()).toContain("Rendered content")
    })

})