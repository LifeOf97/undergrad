<template>
    <div class="">

        <button :disabled="disabled ? true:false" v-if="type == 'plain'" class="w-full text-sm text-slate-600 font-bold rounded-md p-2 border border-slate-600 tracking-wide transition-all duration-200 active:outline-none hover:text-slate-900 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-400 disabled:cursor-not-allowed">{{name}}</button>

        <button :disabled="disabled ? true:false" v-else :class="color == 'rose' ? 'bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300':'bg-green-500 hover:bg-green-600 disabled:bg-green-300'" class="w-full text-sm text-slate-50 font-bold rounded-md py-2 px-4 tracking-wide transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed disabled:hover:shadow-none">{{name}}</button>
        
    </div>
</template>

<script>
export default {
    name: "AppButton",
    props: {
        name: {type: String, required: false, default: "Submit"},
        type: {type: String, required: false},
        color: {type: String, required: false, default: "rose"},
        disabled: {type: Boolean, required: false, default: false},
    },
}
</script>