<template>
    <div class="w-full z-50">

        <div ref="topnav" class="w-11/12 mx-auto flex items-center justify-between bg-transparent py-6 z-10 md:py-8 md:w-10/12">
            <AppTextLogo :color="'rose'" />


            <div class="flex gap-2">

                <button @click="menu = !menu" class="p-2 bg-blue-500 text-white rounded-md cursor-pointer outline-none hover:bg-blue-600 md:hidden">Menu</button>

                <div :class="menu ? 'opacity-100 translate-y-20':'opacity-0 -translate-y-40'" class="absolute top-0 left-0 w-full duration-300 md:relative md:top-0 md:contents">
                    <div class="flex gap-2 justify-end bg-white p-4 w-full md:p-0 md:bg-transparent">
                        <div class="flex gap-2">
                            <router-link :to="getCurrentRouteName == 'home' ? {name: 'aboutus'} : {name: 'home'}" class="text-sm text-slate-700 font-bold rounded-md border border-rose-600 py-2 px-4 tracking-wide transition-all duration-200 capitalize hover:bg-rose-600 hover:text-white">{{ getCurrentRouteName == 'home' ? 'about':'home' }}</router-link>
                            <a href="https://web-cgims.herokuapp.com/admin" target="_blank" class="text-sm text-slate-700 font-bold rounded-md border border-rose-600 py-2 px-4 tracking-wide transition-all duration-200 capitalize hover:bg-rose-600 hover:text-white">Admin</a>
                        </div>
                        <div class="flex">
                            <router-link v-if="getAuthToken" :to="getAuthUser == 'staff' ? {name: 'staff', params: {staffId: staffData.staff_id}}:{name: 'student', params: {department: studentData.department, level: studentData.level, regNo: studentData.reg_no}}" class="text-sm text-slate-50 font-bold rounded-md py-2 px-4 tracking-wide transition-all duration-200 bg-rose-500 hover:scale-105 hover:bg-rose-600 hover:shadow-lg">Dashboard</router-link>
                            <router-link v-else :to="{name: 'signin'}" class="text-sm text-slate-50 font-bold rounded-md py-2 px-4 tracking-wide transition-all duration-200 bg-rose-500 hover:scale-105 hover:bg-rose-600 hover:shadow-lg">Sign in</router-link>
                        </div>
                    </div>
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
    data() {
        return {
            menu: false,
        }
    },
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