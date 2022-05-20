<template>
    <div class="w-full z-50">

        <div ref="topnav" class="w-11/12 mx-auto flex items-center justify-between bg-transparent py-6 z-10 md:py-8 md:w-10/12">
            
            <div>
                <AppTextLogo :color="'rose'" />
            </div>


            <div :class="menu ? 'scale-100 opacity-100':'scale-0 opacity-0'" class="absolute top-0 left-0 flex flex-col items-center justify-between bg-white/70 backdrop-blur h-44 shadow-lg w-full duration-150 md:shadow-none md:flex-none md:relative md:top-0 md:contents">

                <!-- start nav of close btn -->
                <button @click.prevent="menu = !menu" class="cursor-pointer pt-4 outline-none md:hidden">
                    <svg v-if="menu" class="w-10 h-10 fill-slate-700" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z"></path>
                    </svg>
                </button>
                <!-- end nav of close btn -->

                <div class="flex flex-col gap-2 justify-end items-center p-4 w-full md:flex-row md:p-0 md:bg-transparent">
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


            <button @click.prevent="menu = !menu" class="cursor-pointer outline-none md:hidden">
                <svg class="w-10 h-10 fill-slate-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 18H3V16H21V18ZM21 13H3V11H21V13ZM21 8H3V6H21V8Z"></path>
                </svg>
            </button>


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
    methods: {
        closeNav(e) {
            if (!this.$el.contains(e.target)) {
                this.menu = false;
                console.log(this.menu)
            }
        },
    },
    mounted() {
        document.addEventListener("click", this.closeNav)
    },
}
</script>