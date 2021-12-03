<template>
    <div class="relative w-full h-full flex bg-blueGray-100">

        <!-- start of side nav -->
        <div :class="nav ? 'opacity-100':'-translate-x-full opacity-0'" class="absolute top-0 left-0 w-full h-screen bg-transparent overflow-hidden backdrop-blur-lg transition-all duration-200 lg:contents lg:relative lg:backdrop-blur-none">
            <!-- start of nav links -->
            <div class="relative w-10/12 h-screen flex flex-col items-center space-y-20 pb-10 bg-blueGray-100 lg:w-1/5">
                <!-- start of close btn. available on small and medium screens -->
                <div class="absolute top-5 right-5 lg:hidden">
                    <AppCloseButton @click.prevent="nav = false" />
                </div>
                <!-- end of close btn -->
                <AppTextLogo />
                <AppLeftNavLinks />
            </div>
            <!-- end of nav links -->
        </div>
        <!-- end of side nav -->

        <!-- start of main view -->
        <div class="w-full h-screen bg-transparent p-4 md:py-4 md:pl-0 md:pr-4">
            
            <div class="w-full h-full bg-white rounded-2xl">
                <button @click="nav = true">Show Nav</button>
            </div>

        </div>
        <!-- end of main view -->

    </div>
</template>

<script>
import AppTextLogo from "@/components/AppTextLogo.vue";
import AppCloseButton from "@/components/AppCloseButton.vue";
import AppLeftNavLinks from "@/components/AppLeftNavLinks.vue";


export default {
    name: "AuthView",
    components: {AppTextLogo, AppLeftNavLinks, AppCloseButton,},
    data() {
        return {
            nav: false,
        }
    },
}
</script>