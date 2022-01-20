<template>
    <div class="flex flex-col">

        <label :for="label" :class="labelColor == 'black' ? 'text-slate-900':'text-slate-50'" class="text-xs font-medium md:text-base">{{label}}</label>

        <div :class="color == 'rose' ? 'hover:border-rose-500 focus-within:border-rose-500':'hover:border-green-500 focus-within:border-green-500'" class="relative flex bg-slate-50 rounded-md shadow border-2 border-transparent">

            <input 
                :type="inputType"
                :id="label"
                :name="label"
                :placeholder="placeholder"
                :required="required"
                :autofocus="autofocus"
                :value="modelValue"
                @input="emitValue"
                class="w-full text-slate-600 text-sm font-medium bg-transparent p-2 placeholder-slate-300 focus:outline-none">

            <!-- this button is only available when the input field is a password type -->
            <button title="show password" v-if="type == 'password'" @click.prevent="togglePassword()" class="flex-initial flex justify-center items-center mr-3 font-extrabold text-2xl z-10">
                <svg xmlns="http://www.w3.org/2000/svg" v-if="showPassword" class="fill-current text-slate-500 h-5 w-5" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" v-else class="fill-current text-slate-500 h-5 w-5" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
            </button>

        </div>


    </div>
</template>

<script>
export default {
    name: "AppInputField",
    props: {
        modelValue: {type: String, required: false},
        modelModifiers: {default: () => ({})},
        type: {type: String, required: false, default: "text"},
        label: {type: String, required: false, default: "Text"},
        labelColor: {type: String, required: false, default: "black"},
        color: {type: String, required: false, default: "rose"},
        placeholder: {type: String, required: false},
        required: {type: Boolean, required:false, default: false},
        autofocus: {type: Boolean, required:false, default: false},
    },
    emits: ["update:modelValue"],
    data() {
        return {
            inputType: this.type,
            showPassword: false
        }
    },
    methods: {
        emitValue(e) { // adding modifiers
            let value = e.target.value;
            if (this.modelModifiers.capitalize) {
                value = value.charAt(0).toUpperCase() + value.slice(1);
            }
            else if (this.modelModifiers.upper) {
                value = value.toUpperCase();
            }
            else if (this.modelModifiers.lower) {
                value = value.toLowerCase();
            }
            this.$emit("update:modelValue", value)
        },
        togglePassword() {
            this.showPassword = !this.showPassword;
            this.inputType = this.showPassword ? "text":"password"; 
        },
    },
}
</script>