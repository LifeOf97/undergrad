<template>
    <div class="w-screen h-screen min-h-[44rem] flex bg-rose-500 selection:text-slate-50 selection:bg-rose-500">

        <div class="relative w-full h-full flex flex-col items-center justify-center bg-white lg:w-1/2">

            <router-link ref="homebtn" :to="{name: 'home'}" class="absolute top-0 right-0 group flex items-center text-slate-50 font-light gap-1 px-2 py-1 rounded-bl-md bg-blue-500 hover:bg-blue-600 md:gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current group-hover:animate-bounce-h" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                <p class="text-xs md:text-base">Home</p>
            </router-link>

            <div class="w-9/12 mx-auto flex flex-col gap-5 md:w-7/12">

                <span class="flex flex-col items-center justify-center gap-3">
                    <AppTextLogo ref="logo" :position="'center'" />
                    <span ref="txt1">
                        <p class="text-slate-800 text-2xl font-black tracking-wide">Sign in to your account </p>
                    </span>
                </span>

                <ul>
                    <li v-if="auth.error != null" class="text-sm text-rose-500 font-medium list-disc list-inside">{{auth.error}}</li>
                    <!-- <li v-if="auth.authToken != null" class="text-sm text-rose-500 font-medium list-disc list-inside">{{auth.authToken}}</li> -->
                </ul>

                <!-- start of sign in tabs -->
                <div class="flex w-full">
                    <button v-for="tab in tabs" :key="tab" @click.prevent="activeTab = tab" :class="activeTab == tab ? 'text-white bg-rose-500':'bg-white text-slate-900'" class="flex-1 p-2 font-medium border border-slate-100 duration-300 hover:text-white hover:bg-rose-500 first:rounded-l-md last:rounded-r-md overflow-hidden">{{ tab }}</button>
                </div>
                <!-- end of sign in tabs -->

                <form id="form" @submit.prevent="signIn(activeTab)" class="w-full flex flex-col gap-5">
                    <AppInputField v-if="activeTab == 'staff'" v-model.upper="username" type="text" :required="true" label="Staff ID" placeholder="STFXXXX" color="rose" labelColor="black" />
                    <AppInputField v-else v-model.upper="username" type="text" :required="true" label="Reg No" placeholder="DEPARTMENT/CLASS/REGNO" color="rose" labelColor="black" />
                    <AppInputField v-model="password" :type="'password'" :required="true" :label="'password'" :color="'rose'" :labelColor="'black'" />

                    <span class="flex justify-between items-center">
                        <span class="flex gap-1">
                            <input v-model="rememberMe" type="checkbox" name="remember" id="remember" class="cursor-pointer accent-rose-500">
                            <label for="remember" class="text-slate-500 text-xs font-normal cursor-pointer">Remember me</label>
                        </span>

                        <button @click.prevent class="text-sm font-medium text-blue-500 hover:text-blue-600">
                            Forgot your password?
                        </button>
                    </span>

                    <AppButton ref="formbtn" :name="'Sign in'" :color="'rose'" :loading="auth.isAuthenticating" :loadingText="'Signing in'" :disabled="auth.isAuthenticating" />

                </form>
                
            </div>

        </div>


        <div class="w-1/2 h-full bg-transparent hidden lg:block">
            <img :src="story" class="w-full h-full object-cover" />
        </div>

        <!-- credits/attribute -->
        <span class="absolute bottom-3 right-10 text-slate-50 text-xs font-medium gap-1 z-10 hidden lg:flex">
            <p>Photo by</p>
            <a class="underline decoration-2 decoration-blue-600 cursor-pointer" target="_blank" href="https://unsplash.com/@te3pot?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Trung Pham Quoc</a>
            <p>on</p>
            <a class="underline decoration-2 decoration-blue-600 cursor-pointer" target="_blank" href="https://unsplash.com/s/photos/classroom?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
        </span>

    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Cookies from "js-cookie";
import AppButton from "@/components/AppButton.vue";
import AppTextLogo from "@/components/AppTextLogo.vue";
import AppInputField from "@/components/AppInputField.vue";
import gsap from "gsap";

export default {
    name: "Signin",
    components: {AppTextLogo, AppInputField, AppButton},
    data() {
        return {
            story: require("@/assets/images/trung-pham-quoc-YDWwCkdmcKM-unsplash.jpg").default,
            // story: require("@/assets/images/polyacad.jpg").default,
            username: "",
            password: "",
            rememberMe: false,
            activeTab: "staff",
            tabs: ["staff", "student"]
        }
    },
    computed: {
        ...mapState({
            auth: state => state.auth,
            staffData: state => state.staffData,
            studentData: state => state.studentData,
        }),
    },
    methods: {
        ...mapActions([
            "actionSigninStaff",
            "actionSigninStudent",
        ]),
        signIn(user) {
            // method to sign in a staff. First get staff login details.
            const data = {
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe,
            };
            // then dispatch an action to signin staff or student
            if (user == 'staff') return this.actionSigninStaff(data);
            else return this.actionSigninStudent(data);
        },
        animSignin() {
            // method to apply gsap animation to the sign in component
            const {homebtn, logo, txt1, formbtn} = this.$refs;
            const form = document.getElementById("form")
            const tl = gsap.timeline()
            tl.from([logo.$el, txt1, form, formbtn.$el], {duration: 0.5, y: 50, opacity: 0, stagger: 0.2, delay: 0.5})
              .from(homebtn, {duration: 1, y: -50, opacity: 0})
        },
    },
    watch: {
        staffData() {
            // watch staffData store state for changes so as to route
            // authenticated users to their dashboard.
            console.log("Watch staffData")
            this.$router.push({name: "staff", params: {staffId: this.staffData.staff_id}});
        },
        studentData() {
            // watch studentData store state for changes so as to route authenticated students to their dashboard.
            console.log("Watch studentsData")
            this.$router.push({name: "student", params: {department: this.studentData.department, level: this.studentData.level, regNo: this.studentData.reg_no}});
        },
    },
    mounted() {
        this.$nextTick(function() { // makes sure all components are rendered
            this.username = Cookies.get("user");
            this.rememberMe = Cookies.get("user") ? true:false;
            this.animSignin();
        });
    },
}
</script>