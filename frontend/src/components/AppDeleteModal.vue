<template>
    <div class="w-96 h-auto flex flex-col items-center rounded-lg overflow-hidden shadow-lg shadow-red-500/20 bg-slate-50">
        
        <span class="w-full flex flex-col items-center justify-center gap-4 py-5 px-10 bg-white md:flex-row md:items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-rose-500 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span class="flex flex-col items-center gap-2 md:items-start">
                <h4 class="text-slate-900 text-lg font-semibold">Delete {{title}}</h4>
                <p class="text-slate-500 text-xs font-normal leading-3 md:text-sm">Are you sure you want to delete this {{title}}?</p>
            </span>
        </span>

        <div class="w-full flex flex-col gap-4 p-2 md:flex-row md:w-auto md:self-end">
            <slot></slot>
        </div>

    </div>
</template>

<script>
export default {
    name: "AppDeleteModal",
    props: {
        title: {type: String, required: false},
    }
}
</script>