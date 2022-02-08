<template>
    <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-slate-500/50 backdrop-blur-sm z-40 selection:bg-rose-500 selection:text-slate-50">

        <div class="relative w-11/12 h-auto max-w-[91.6%] max-h-[90%] p-7 rounded-md shadow-lg bg-white overflow-y-auto md:p-10 lg:w-7/12">

            <!-- close button -->
            <AppCloseButton data-test="close-btn" @click.prevent="actionUpdateQuestionnaireView({open: false, data: '', error: null})" class="absolute top-7 right-7" />
            <!-- close button -->

            <div class="w-full flex flex-col mt-10 mx-auto">
                <div class="mb-7">
                    <h1 class="text-xl text-center text-slate-900 font-bold tracking-wide underline underline-offset-4 md:text-3xl">{{questionnaireView.data.title}}</h1>
                </div>

                <span class="flex justify-between items-center mb-2">
                    <AppStaffId :staffData="staffData" />
                    <p class="text-xs text-slate-500 font-medium">{{published(questionnaireView.data.created)}}</p>
                </span>

                <!-- filter for -->
                <span class="flex flex-wrap gap-2">
                    <p v-for="filter in questionnaireView.data.categories.split(',').slice(1)" :key="filter" class="text-xs text-slate-500 bg-slate-50 rounded-md px-2 py-1">{{filter}}</p>
                </span>
                <!-- filter for -->

                <!-- question text -->
                <p class="text-slate-600 text-xs font-medium my-6 whitespace-pre-line md:text-sm">
                    {{questionnaireView.data.question}}
                </p>
                <!-- question text -->

                <!-- question buttons -->
                <div class="flex items-center justify-end gap-3 border-t pt-4">
                    <AppButton data-test="edit-btn" @click.prevent="actionUpdateQuestionnaireEdit({open: true, saving: false, error: null}), actionUpdateQuestionnaireView({open: false, data: questionnaireView.data, error: null})" :name="'Edit'" :type="'plain'" />
                    <AppButton data-test="delete-btn" @click.prevent="toDelete = true" :name="'Delete'" :color="'rose'" />
                </div>
                <!-- question buttons -->

            </div>

        </div>

        <teleport to="body">
            <div v-if="toDelete" class="w-screen h-screen absolute top-0 left-0 flex justify-center items-center bg-slate-500/50 backdrop-blur z-50">
                <AppNotificationModal :type="'delete'" :title="'Delete questionnaire'" :text="'Are you sure you want to delete this questionnaire?'">
                    <AppButton @click.prevent="toDelete = false" :name="'Cancle'" :type="'plain'" />
                    <AppButton @click.prevent="actionDeleteQuestionnaire({delete: questionnaireView.data.id}), toDelete = false" :name="'Delete'" :color="'rose'" :loading="loading" :loadingText="'Deleting'" />
                </AppNotificationModal>
            </div>
        </teleport>

    </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import {DateTime} from "luxon";
import AppButton from "./AppButton.vue";
import AppStaffId from "./AppStaffId.vue";
import AppCloseButton from "./AppCloseButton.vue";
import AppNotificationModal from "./AppNotificationModal.vue";

export default {
    name: "AppQuestionView",
    components: {AppCloseButton, AppStaffId, AppButton, AppNotificationModal},
    data() {
        return {
            completed: false,
            toDelete: false,
            loading: false,
        }
    },
    computed: {
        ...mapState({
            questionnaireView: state => state.questionnaireView,
            questionnaireEdit: state => state.questionnaireEdit,
            staffData: state => state.staffData,
        }),
    },
    methods: {
        ...mapActions([
            "actionUpdateQuestionnaireForm",
            "actionUpdateQuestionnaireView",
            "actionUpdateQuestionnaireEdit",
            "actionDeleteQuestionnaire",
        ]),
        published(value) {
            return DateTime.fromISO(value).setLocale("en-US").toLocaleString(DateTime.DATETIME_MED);
        },
    },
}
</script>