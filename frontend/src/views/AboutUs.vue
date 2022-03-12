<template>
    <div class="w-full h-screen min-h-[40rem] border">


        <div class="w-full h-full">

            <!-- start of top nav -->
            <AppTopNav />
            <!-- end of top nav -->

            <div class="w-full h-full flex items-center justify-center">
                <h1 class="text-2xl font-black text-rose-500 md:text-6xl">About Us</h1>
            </div>


        </div>
        
    </div>
</template>

<script>
import AppTopNav from "@/components/AppTopNav.vue";

export default {
    name: "AbouUs",
    components: {AppTopNav},
}
</script>