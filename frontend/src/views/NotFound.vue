<template>
    <div class="relative w-screen h-screen bg-white">

        <img :src="story" class="w-full h-full">

        <router-link :to="{name: 'home'}" class="absolute top-5 left-5 px-6 py-4 group flex items-center text-slate-50 bg-rose-500 rounded-md gap-1 hover:bg-rose-600 md:gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current group-hover:animate-bounce-h" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <p class="text-base font-bold md:text-lg">Back home</p>
        </router-link>

    </div>
</template>

<script>
export default {
    name: "NotFound",
    data() {
        return {
            story: require("@/assets/images/notfound.svg").default,
        }
    },
}
</script>