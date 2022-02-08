<template>
    <div class="h-full flex flex-col justify-between">
        <!-- start of nav links -->
        <div class="flex flex-col gap-4">
            <router-link data-test="dashboard" @click="actionUpdateNav({state: false})" :to="{name: 'dashboard'}" active-class="text-slate-50 bg-slate-500" class="group flex items-center text-slate-600 gap-3 rounded-lg p-2 transition-all duration-150 hover:bg-slate-500">
                <svg class="w-6 h-6 fill-current group-hover:text-slate-50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21H13V15H21V21ZM11 21H3V11H11V21ZM21 13H13V3H21V13ZM11 9H3V3H11V9Z"></path>
                </svg>
                <p class="text-sm group-hover:text-slate-50">Dashboard</p>
            </router-link>
            <router-link data-test="schedule" @click="actionUpdateNav({state: false})" :to="{name: 'myschedules'}" active-class="text-slate-50 bg-slate-500" class="group flex items-center text-slate-600 gap-3 rounded-lg p-2 transition-all duration-150 hover:bg-slate-500">
                <svg class="w-6 h-6 fill-current group-hover:text-slate-50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4H7V2H9V4H15V2H17V4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22ZM5 10V20H19V10H5ZM5 6V8H19V6H5ZM17 18H15V16H17V18ZM13 18H11V16H13V18ZM9 18H7V16H9V18ZM17 14H15V12H17V14ZM13 14H11V12H13V14ZM9 14H7V12H9V14Z"></path>
                </svg>
                <p class="text-sm group-hover:text-slate-50">My Schedules</p>
            </router-link>
            <router-link data-test="student" @click="actionUpdateNav({state: false})" :to="{name: 'mystudents'}" :class="myStudent ? 'text-slate-50 bg-slate-500':''" class="group flex items-center text-slate-600 gap-3 rounded-lg p-2 transition-all duration-150 hover:bg-slate-500">
                <svg class="w-6 h-6 fill-current group-hover:text-slate-50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 3C6.23858 3 4 5.23858 4 8C4 10.7614 6.23858 13 9 13C11.7614 13 14 10.7614 14 8C14 5.23858 11.7614 3 9 3ZM6 8C6 6.34315 7.34315 5 9 5C10.6569 5 12 6.34315 12 8C12 9.65685 10.6569 11 9 11C7.34315 11 6 9.65685 6 8Z"></path>
                    <path d="M16.9084 8.21828C16.6271 8.07484 16.3158 8.00006 16 8.00006V6.00006C16.6316 6.00006 17.2542 6.14956 17.8169 6.43645C17.8789 6.46805 17.9399 6.50121 18 6.5359C18.4854 6.81614 18.9072 7.19569 19.2373 7.65055C19.6083 8.16172 19.8529 8.75347 19.9512 9.37737C20.0496 10.0013 19.9987 10.6396 19.8029 11.2401C19.6071 11.8405 19.2719 12.3861 18.8247 12.8321C18.3775 13.2782 17.8311 13.6119 17.2301 13.8062C16.6953 13.979 16.1308 14.037 15.5735 13.9772C15.5046 13.9698 15.4357 13.9606 15.367 13.9496C14.7438 13.8497 14.1531 13.6038 13.6431 13.2319L13.6421 13.2311L14.821 11.6156C15.0761 11.8017 15.3717 11.9248 15.6835 11.9747C15.9953 12.0247 16.3145 12.0001 16.615 11.903C16.9155 11.8059 17.1887 11.639 17.4123 11.416C17.6359 11.193 17.8035 10.9202 17.9014 10.62C17.9993 10.3198 18.0247 10.0006 17.9756 9.68869C17.9264 9.37675 17.8041 9.08089 17.6186 8.82531C17.4331 8.56974 17.1898 8.36172 16.9084 8.21828Z"></path>
                    <path d="M19.9981 21C19.9981 20.475 19.8947 19.9551 19.6938 19.47C19.4928 18.9849 19.1983 18.5442 18.8271 18.1729C18.4558 17.8017 18.0151 17.5072 17.53 17.3062C17.0449 17.1053 16.525 17.0019 16 17.0019V15C16.6821 15 17.3584 15.1163 18 15.3431C18.0996 15.3783 18.1983 15.4162 18.2961 15.4567C19.0241 15.7583 19.6855 16.2002 20.2426 16.7574C20.7998 17.3145 21.2417 17.9759 21.5433 18.7039C21.5838 18.8017 21.6217 18.9004 21.6569 19C21.8837 19.6416 22 20.3179 22 21H19.9981Z"></path>
                    <path d="M16 21H14C14 18.2386 11.7614 16 9 16C6.23858 16 4 18.2386 4 21H2C2 17.134 5.13401 14 9 14C12.866 14 16 17.134 16 21Z"></path>
                </svg>
                <p class="text-sm group-hover:text-slate-50">My Students</p>
            </router-link>
        </div>
        <!-- end of nav links -->

        <!-- start of sign out -->
        <div>
            <button @click.prevent="actionUpdateSignout({state: true})" class="group flex items-center text-slate-600 gap-3 rounded-lg p-2 transition-all duration-150 hover:bg-slate-500">
                <svg class="w-6 h-6 fill-current group-hover:text-slate-50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z"></path>
                </svg>
                <p class="text-sm group-hover:text-slate-50">Sign out</p>
            </button>
        </div>
        <!-- end of sign out -->

    </div>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
    name: "AppLeftNavLinks",
    computed: {
        ...mapState({
            nav: state => state.nav,
        }),
        myStudent() {
            if (this.$route.fullPath.includes("mystudents")) return true
            else return false
        }
    },
    methods: {
        ...mapActions([
            "actionUpdateNav",
            "actionUpdateSignout",
        ]),
    },
}
</script>