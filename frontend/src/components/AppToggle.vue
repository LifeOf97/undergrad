<template>
    <div>

        <label :for="label" class="flex flex-col">

            <div :class="[modelValue ? 'bg-green-500':'bg-slate-200', textPos == 'top' ? 'order-2':'order-1']" class="relative flex items-center w-14 h-7 rounded-full shadow-inner cursor-pointer">
                <div :class="modelValue ? 'translate-x-[1.9rem]':'translate-x-px'" class="w-6 h-6 rounded-full bg-white shadow transition-all duration-200"></div>
            </div>

            <p :class="textPos == 'top' ? 'order-1 mb-2':'order-2 mt-2'" class="flex-initial text-slate-600 text-sm font-medium cursor-pointer hover:text-slate-900">{{text}}</p>
        </label>

        <input type="checkbox" :name="label" :id="label" @change="$emit('update:modelValue', $event.target.checked)" class="hidden">
        
    </div>
</template>

<script>
export default {
    name: "AppToggle",
    props: {
        modelValue: {type: Boolean, required: false},
        label: {type: String, required: false, default: "toggle"},
        text: {type: String, required: false},
        textPos: {type: String, required: false, default: "bottom"}
    },
    emits: ["update:modelValue"],
}
</script>