<template>
    <div class="w-full h-screen flex bg-blueGray-100 p-4">
        <!-- start of side nav -->
        <div class="absolute top-0 left-0 py-10 w-10/12 h-screen flex flex-col items-center space-y-20 bg-blueGray-100 shadow-lg overflow-hidden">
            <AppTextLogo />
            <AppLeftNavLinks />
        </div>
        <!-- end of side nav -->

        <div class="w-full bg-blue-500 rounded-lg">2</div>
    </div>
</template>

<script>
import AppTextLogo from "@/components/AppTextLogo.vue";
import AppLeftNavLinks from "@/components/AppLeftNavLinks.vue";

export default {
    name: "AuthView",
    components: {AppTextLogo, AppLeftNavLinks,}
}
</script>