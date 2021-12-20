<template>
    <div class="relative w-full h-screen flex bg-slate-100">

        <!-- start of left nav -->
        <div :class="nav ? 'opacity-100':'-translate-x-full opacity-0'" class="absolute top-0 left-0 w-full h-screen bg-transparent overflow-hidden backdrop-blur-sm transition-all duration-200 lg:contents z-50 lg:fixed lg:backdrop-blur-none">
            <div class="relative w-10/12 h-screen flex flex-col items-center space-y-20 pb-10 bg-slate-100 lg:w-1/5">
                <div class="absolute top-5 right-5 lg:hidden">
                    <AppCloseButton @click.prevent="actionUpdateNav({state: false})" />
                </div>
                <AppTextLogo :color="'rose'" />
                <AppLeftNavLinks />
            </div>
        </div>
        <!-- end of side nav -->

        <!-- start of main view -->
        <div class="w-full h-full bg-transparent p-0 overflow-hidden xl:py-4">
            
            <div class="w-full h-full bg-white p-4 overflow-y-auto shadow-inner xl:rounded-l-2xl xl:px-8 xl:py-4">
                <div class="flex justify-between items-center top-10 right-16 z-20 xl:fixed">
                    <AppLeftNavButton />
                    <AppStaffId :staffData="staffData" />
                </div>

                <router-view v-slot="{Component}">
                    <transition name="slide">
                        <component :is='Component' />
                    </transition>
                </router-view>
            </div>

        </div>
        <!-- end of main view -->

        <teleport to='body'>
            <div v-if="signout" class="w-screen h-screen absolute top-0 left-0 flex justify-center items-center bg-slate-500/50 backdrop-blur z-50">
                <AppNotificationModal :type="'signout'" :title="'Sign out'" :text="'Are you sure you want to sign out?'">
                        <AppButton @click.prevent="actionUpdateSignout({state: false}), actionUpdateNav({state: false})" :name="'Cancle'" :type="'plain'" />
                        <AppButton @click.prevent="signOut()" :name="'Sign out'" />
                </AppNotificationModal>
            </div>
        </teleport>

    </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import AppButton from "@/components/AppButton.vue";
import AppStaffId from "@/components/AppStaffId.vue";
import AppTextLogo from "@/components/AppTextLogo.vue";
import AppCloseButton from "@/components/AppCloseButton.vue";
import AppLeftNavLinks from "@/components/AppLeftNavLinks.vue";
import AppLeftNavButton from "@/components/AppLeftNavButton.vue";
import AppStaffDashBoard from "@/components/AppStaffDashBoard.vue";
import AppNotificationModal from "@/components/AppNotificationModal.vue";

export default {
    name: "AuthView",
    props: {
        staffId: {type: String, required: true},
    },
    components: {
        AppStaffId, AppTextLogo, AppLeftNavLinks, AppCloseButton, AppStaffDashBoard,
        AppLeftNavButton, AppNotificationModal, AppButton
    },
    computed: {
        ...mapState({
            nav: state => state.nav,
            signout: state => state.signout,
            staffData: state => state.staffData,
        }),
    },
    methods: {
        ...mapActions([
            "actionUpdateNav",
            "actionUpdateSignout",
            "actionSignout",
            "actionResetStaffData"
        ]),
        async signOut() {
            this.actionUpdateNav({state: false});
            await this.$router.push({name: "home"});
            this.actionSignout({state: false});
        }
    },
}
</script>