<template>
    <div class="flex flex-col gap-4">

        <div class="w-full flex flex-col gap-6 mt-5 md:w-8/12">

            <div class="flex justify-between items-center">
                <h2 class="text-2xl text-slate-900 font-bold">Observations</h2>

                <button @click.prevent="actionUpdateObservationForm({open: true, saving: false, error: null})" class="flex items-center justify-between gap-2 border border-slate-500 rounded-md p-2 group hover:border-slate-900">
                    <span class="text-xs text-slate-500 font-medium group-hover:text-slate-900">New</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 fill-current group-hover:text-green-600" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>

            <!-- if fetching observations -->
            <span v-if="observationView.loading" class="flex items-center justify-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 animate-spin stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p class="text-base text-slate-600 font-normal">Loading</p>
            </span>

            <!-- if fetching observation returns an error -->
            <span v-if="observationView.error != null" class="flex flex-col items-center justify-center">
                <p class="text-sm text-rose-500 font-medium">{{observationView.error}}</p>
                <span>
                    <AppButton @click.prevent="actionFetchObservation()" :type="'plain'" :name="'Try again'" :loading="observationView.loading" :loadingText="'Loading'" />
                </span>
            </span>

            <!-- if no observation yet -->
            <span v-if="noObservation()" class="flex item-center justify-center">
                <p class="text-base text-slate-500 font-light">This student has no observations yet</p>
            </span>


            <!-- if observations exists -->
            <div class="flex flex-col gap-4">
                <AppObservationCard v-for="observation in observationView.data" :key="observation.id" :observation="observation" />
            </div>

            <span class="flex items-center justify-start">
                <router-link :to="{name: 'studentdata'}" class="group flex items-center text-blue-500 font-light gap-1 hover:text-blue-600 md:gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current group-hover:animate-bounce-h" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    <p class="text-xs md:text-base">Details</p>
                </router-link>
            </span>
        
        </div>

        <teleport to='body'>
            <div v-if="observationForm.open" class="w-screen h-screen absolute top-0 left-0 flex justify-center items-center bg-slate-500/50 backdrop-blur z-50">
                <AppObservationForm />
            </div>
        </teleport>

        <!-- delete modal -->
        <teleport to='body'>
           <div v-if="observationDelete.open" class="w-screen h-screen absolute top-0 left-0 flex justify-center items-center bg-slate-500/50 backdrop-blur z-50">
                <AppNotificationModal :type="'delete'" :title="'Delete observation'" :text="'Are you sure you want to delete this observation?'">
                        <AppButton @click.prevent="actionUpdateObservationDelete({open: false, id: ''})" :name="'Cancle'" :type="'plain'" />
                        <AppButton @click.prevent="actionDeleteObservation()" :name="'Delete'" />
                </AppNotificationModal>
            </div>
        </teleport>

    </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import AppButton from "./AppButton.vue";
import AppObservationForm from "./AppObservationForm.vue";
import AppObservationCard from "./AppObservationCard.vue";
import AppNotificationModal from "./AppNotificationModal.vue";

export default {
    name: "AppStudentsDataObservation",
    components: {AppObservationForm, AppObservationCard, AppNotificationModal, AppButton},
    computed: {
        ...mapState({
            observationForm: state => state.observationForm,
            observationView: state => state.observationView,
            observationDelete: state => state.observationDelete,
        }),
    },
    methods: {
        ...mapActions([
            "actionUpdateObservationForm",
            "actionUpdateObservationDelete",
            "actionDeleteObservation",
            "actionFetchObservation",
        ]),
        noObservation() {
            if (this.observationView.data.length < 1) return true
            else return false
        }
    },
    created() {
        this.actionFetchObservation();
    },
}
</script>