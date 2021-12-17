<template>
    <div class="selection:bg-rose-500 selection:text-slate-50">

        <div class="flex flex-col gap-4 mt-16">

            <div class="flex items-center justify-center md:justify-start">
                <img :src="src4" class="w-60 aspect-[1/1] object-cover rounded-lg shadow">
            </div>

            <router-view v-slot="{Component}">
                <component :is='Component'></component>
            </router-view>
            
        </div>
        
    </div>
</template>

<script>
export default {
    name: "AppStudentsData",
    data() {
        return {
            src4: require("@/assets/images/ben-white-83tkHLPgg2Q-unsplash.jpg").default,
        }
    }
}
</script>