import {mount} from "@vue/test-utils";
import AppInputField from "@/components/AppInputField.vue";

describe("AppInputField.vue", () => {
    const wrapper = mount(AppInputField)

    test("Check default input/label attributes", () => {
        expect(wrapper.get("label").text()).toBe("Text")
        expect(wrapper.get("input").attributes("type")).toBe("text")
        // input id/name should equal th label value
        expect(wrapper.get("input").attributes("id")).toBe("Text")
        expect(wrapper.get("input").attributes("name")).toBe("Text")
        expect(wrapper.get("input").attributes()).not.toHaveProperty("required")
        expect(wrapper.get("input").attributes()).not.toHaveProperty("autofocus")
        // make sure password toggle button is not rendered
        expect(wrapper.find("button").exists()).toBeFalsy() 
    })

    test("Set programmer defined input/label props", async () => {
        // set props value
        await wrapper.setProps({
            type: "text",
            label: "Username",
            required: true,
            autofocus: true,
        })

        // assert
        expect(wrapper.get("label").text()).toBe("Username")
        expect(wrapper.get("input").attributes("type")).toBe("text")
        // input id/name should equal th label value
        expect(wrapper.get("input").attributes("id")).toBe("Username")
        expect(wrapper.get("input").attributes("name")).toBe("Username")
        expect(wrapper.get("input").attributes()).toHaveProperty("required")
        expect(wrapper.get("input").attributes()).toHaveProperty("autofocus")
    })

    test("Render button and text toggle method", async () => {
        // set props value
        await wrapper.setProps({ type: "password", label: "Password" })
        await wrapper.setData({inputType: "password"})

        // assert label/input is password
        expect(wrapper.get("label").text()).toBe("Password")
        expect(wrapper.get("input").attributes("type")).toBe("password")

        // button should be rendered if type is password
        expect(wrapper.find("button").exists()).toBeTruthy()

        //trigger button to show password
        await wrapper.get("button").trigger("click")
        // assert type is now text
        expect(wrapper.get("input").attributes("type")).toBe("text")

        // trigger button again to hide password
        await wrapper.get("button").trigger("click")
        // assert type is now back to password
        expect(wrapper.get("input").attributes("type")).toBe("password")

    })

    test("Emits update:modelValue with a value", async () => {
        // set input value
        await wrapper.get("input").setValue("koolkat")

        expect(wrapper.emitted()).toHaveProperty("update:modelValue")
        expect(wrapper.emitted("update:modelValue")[0][0]).toBe("koolkat")

    })

})