<template>
    <div class="">

        <button
            type="submit"
            :disabled="disabled"
            v-if="type == 'plain'"
            class="w-full text-xs text-slate-600 font-bold rounded-md p-2 border border-slate-600 tracking-wide transition-all duration-200 active:outline-none hover:text-slate-900 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-400 disabled:cursor-not-allowed md:text-sm">
            <span v-if="loading" class="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 animate-spin stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p>{{loadingText}}</p>
            </span>

            <p v-else-if="!loading">{{name}}</p>
        </button>

        <button
            type="submit"
            :disabled="disabled ? true:false"
            v-else
            :class="color == 'rose' ? 'bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300':'bg-green-500 hover:bg-green-600 disabled:bg-green-300'"
            class="w-full text-xs text-slate-50 font-bold rounded-md py-2 px-4 tracking-wide transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed disabled:hover:shadow-none md:text-sm">
            <span v-if="loading" class="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p>{{loadingText}}</p>
            </span>
            
            <p v-else-if="!loading">{{name}}</p>
        </button>
        
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
        loading: {type: Boolean, required: false, default: false},
        loadingText: {type: String, required: false, default: "Submitting"},
    },
}
</script>