<template>
    <div class="h-screen overflow-y-auto flex flex-col justify-between">

        <div>
            <!-- start of staff nav links -->
            <AppStaffLinks v-if="getAuthUser == 'staff'" />
            <!-- end of staff nav links -->

            <!-- start of student nav links -->
            <AppStudentLinks v-else />
            <!-- end of student nav links -->
        </div>

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
import AppStaffLinks from "@/components/AppStaffLinks.vue";
import AppStudentLinks from "@/components/AppStudentLinks.vue";
import Cookies from "js-cookie";

export default {
    name: "AppLeftNavLinks",
    components: {AppStaffLinks, AppStudentLinks},
    computed: {
        ...mapState({
            nav: state => state.nav,
        }),
        getAuthUser() {
            if (Cookies.get("authUser").startsWith("STF")) return "staff"
            else return "student" 
        }
    },
    methods: {
        ...mapActions([
            "actionUpdateSignout",
        ]),
    },
}
</script>