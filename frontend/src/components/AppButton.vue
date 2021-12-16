<template>
    <div class="">

        <button v-if="type == 'plain'" class="w-full text-sm text-slate-600 font-bold rounded-md p-2 border tracking-wide transition-all duration-200 active:outline-none hover:text-slate-900">{{name}}</button>

        <button v-else :class="color == 'rose' ? 'bg-rose-500 hover:bg-rose-600':'bg-green-500 hover:bg-green-600'" class="w-full text-sm text-slate-50 font-bold rounded-md py-2 px-4 tracking-wide transition-all duration-200 active:outline-none">{{name}}</button>
        
    </div>
</template>

<script>
export default {
    name: "AppButton",
    props: {
        name: {type: String, required: false, default: "Submit"},
        type: {type: String, required: false},
        color: {type: String, required: false, default: "rose"},
    },
}
</script>