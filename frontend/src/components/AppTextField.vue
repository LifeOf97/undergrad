<template>
    <div class="flex flex-col space-y-2" v-bind="$attrs">

        <label :for="label" class="text-xs text-slate-900 font-medium md:text-base">{{label}}</label>

        <div :class="color == 'rose' ? 'hover:border-rose-500 focus-within:border-rose-500':'hover:border-green-500 focus-within:border-green-500'" class="relative bg-slate-50 rounded-md shadow border-2 border-transparent">
            <textarea :name="label" :id="label" :rows="rows" :cols="cols" :placeholder="placeholder" @input="$emit('update:modelValue', $event.target.value)" class="w-full resize-none text-slate-800 text-sm font-medium p-2 bg-transparent placeholder-slate-300 focus:outline-none md:text-base"></textarea>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "AppTextField",
    props: {
        modelModifiers: {
            default: () => ({})
        },
        label: {type: String, required: false},
        color: {type: String, required: false, default: "rose"},
        placeholder: {type: String, required: false},
        cols: {type: String, required: false, default: "30"},
        rows: {type: String, required: false, default: "10"},
    },
    emits: ["update:modelValue"],
    inheritAttrs: false,
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
    }
}
</script>