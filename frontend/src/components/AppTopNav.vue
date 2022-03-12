<template>
    <div class="w-full z-50">

        <div ref="topnav" class="w-11/12 mx-auto flex items-center justify-between bg-transparent py-6 z-10 md:py-8 md:w-10/12">
            <AppTextLogo :color="'rose'" />


            <div class="flex gap-2 relative">

                <div class="flex gap-2 w-full">
                    <span>
                        <router-link v-if="getCurrentRouteName == 'home'" :to="{name: 'aboutus'}" class="text-sm text-slate-700 font-bold rounded-md border border-rose-600 py-2 px-4 tracking-wide transition-all duration-200 hover:bg-rose-600 hover:text-white">About Us</router-link>
                        <router-link v-else  :to="{name: 'home'}" class="text-sm text-slate-700 font-bold rounded-md border border-rose-600 py-2 px-4 tracking-wide transition-all duration-200 hover:bg-rose-600 hover:text-white">Home</router-link>
                    </span>
                    <span>
                        <router-link v-if="getAuthToken" :to="{name: 'staff', params: {staffId: staffData.staff_id}}" class="text-sm text-slate-50 font-bold rounded-md py-2 px-4 tracking-wide transition-all duration-200 bg-rose-500 hover:scale-105 hover:bg-rose-600 hover:shadow-lg">Dashboard</router-link>
                        <router-link v-else :to="{name: 'signin'}" class="text-sm text-slate-50 font-bold rounded-md py-2 px-4 tracking-wide transition-all duration-200 bg-rose-500 hover:scale-105 hover:bg-rose-600 hover:shadow-lg">Sign in</router-link>
                    </span>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { mapState } from "vuex";
import AppTextLogo from "./AppTextLogo.vue";
import Cookies from "js-cookie";

export default {
    name: "AppTopNav",
    components: {AppTextLogo,},
    computed: {
        ...mapState({
            staffData: state => state.staffData,
        }),
        getAuthToken() {
            return Cookies.get("authToken")
        },
        getCurrentRouteName() {
            return this.$route.name;
        }
    },
}
</script>