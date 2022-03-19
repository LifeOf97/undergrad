<template>
    <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-slate-500/50 backdrop-blur-sm selection:bg-rose-500 selection:text-slate-50">

        <div class="relative w-11/12 h-auto rounded-md shadow-lg bg-white overflow-y-auto p-7 lg:w-9/12">

            <!-- close button -->
            <AppCloseButton data-test="close-btn" @click.prevent="actionUpdateObservationForm({open: false, saving: false, error: null})" class="absolute top-7 right-7" />
            <!-- close button -->

            <div class="w-full mx-auto flex flex-col gap-10 mt-20 lg:w-8/12">

                <div class="flex items-center justify-between">
                    <AppStaffId :staffData="staffData" />
                    <p class="text-xs text-slate-500 font-medium">{{today}}</p>
                </div>

                <div class="flex flex-col gap-2">
                    <p class="text-sm text-slate-500 font-normal">Create new observation for:</p>
                    <AppStudentId :studentData="studentView" />
                </div>

                <form @submit.prevent="actionCreateObservation({data: {detail: detail}})" class="flex flex-col gap-4">
                    <AppTextField v-model="detail" :label="'Observation'" :color="'rose'" :placeholder="'What have you observed?'" :required="true" />
                    <div class="flex justify-end gap-3 border-slate-100 pt-4">
                        <AppButton data-test="cancle-btn" @click.prevent="actionUpdateObservationForm({open: false, saving: false, error: null})" :name="'Cancle'" :type="'plain'" />
                        <AppButton data-test="create-btn" :name="'Create'" :color="'rose'" :loading="observationForm.saving" :loadingText="'Creating'" />
                    </div>
                </form>

            </div>

        </div>
        
    </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import {DateTime} from "luxon";
import AppButton from "./AppButton.vue";
import AppStaffId from "./AppStaffId.vue";
import AppStudentId from "./AppStudentId.vue";
import AppTextField from "./AppTextField.vue";
import AppCloseButton from "./AppCloseButton.vue";

export default {
    name: "AppObservationForm",
    components: {AppCloseButton, AppStaffId, AppStudentId, AppTextField, AppButton},
    data() {
        return {
            detail: "",
            today: DateTime.now().setLocale("en-US").toLocaleString(DateTime.DATE_MED),
        }
    },
    computed: {
        ...mapState({
            observationForm: state => state.observationForm,
            staffData: state => state.staffData,
            studentView: state => state.studentView,
        }),
    },
    methods: {
        ...mapActions([
            "actionUpdateObservationForm",
            "actionCreateObservation",
        ])
    },
}
</script>