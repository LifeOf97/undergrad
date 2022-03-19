<template>
    <div class="w-full z-50">

        <div ref="topnav" class="w-11/12 mx-auto flex items-center justify-between bg-transparent py-6 z-10 md:py-8 md:w-10/12">
            <AppTextLogo :color="'rose'" />


            <div class="flex gap-2 relative">

                <div class="flex gap-2 w-full">
                    <span>
                        <router-link :to="getCurrentRouteName == 'home' ? {name: 'aboutus'} : {name: 'home'}" class="text-sm text-slate-700 font-bold rounded-md border border-rose-600 py-2 px-4 tracking-wide transition-all duration-200 capitalize hover:bg-rose-600 hover:text-white">{{ getCurrentRouteName == 'home' ? 'about':'home' }}</router-link>
                    </span>
                    <span>
                        <router-link v-if="getAuthToken" :to="getAuthUser == 'staff' ? {name: 'staff', params: {staffId: staffData.staff_id}}:{name: 'student', params: {department: studentData.department, level: studentData.level, regNo: studentData.reg_no}}" class="text-sm text-slate-50 font-bold rounded-md py-2 px-4 tracking-wide transition-all duration-200 bg-rose-500 hover:scale-105 hover:bg-rose-600 hover:shadow-lg">Dashboard</router-link>
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
            studentData: state => state.studentData,
        }),
        getAuthToken() {
            return Cookies.get("authToken")
        },
        getCurrentRouteName() {
            return this.$route.name;
        },
        getAuthUser() {
            const user = Cookies.get("authUser")
            if (user.startsWith("STF")) return "staff"
            else return "student" 
        },
    },
}
</script>