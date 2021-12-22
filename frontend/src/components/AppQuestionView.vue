<template>
    <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-slate-500/50 backdrop-blur-sm z-40 selection:bg-rose-500 selection:text-slate-50">

        <div class="relative w-11/12 h-[90%] rounded-md shadow-lg bg-white overflow-y-auto lg:w-9/12">

            <!-- close button -->
            <AppCloseButton @click.prevent="actionUpdateQuestionnaireView({open: false})" class="absolute top-7 right-7" />
            <!-- close button -->

            <div class="w-full flex flex-col gap-4 mt-16 mx-auto lg:w-10/12 xl:w-8/12">
                <div class="mb-5">
                    <h1 class="text-xl text-center text-slate-900 font-bold tracking-wide underline underline-offset-4 md:text-3xl">Topic of the question comes here</h1>
                </div>

                <span class="flex justify-between items-center">
                    <AppStaffId :staffData="staffData" />
                    <p class="text-xs text-slate-500 font-medium">{{published}}</p>
                </span>

                <!-- filter for -->
                <span class="ml-12 flex gap-4">
                    <p v-for="filter in filters" :key="filter" class="text-xs text-slate-500 bg-slate-50 rounded-md px-2 py-1">{{filter}}</p>
                </span>
                <!-- filter for -->

                <!-- question text -->
                <p class="text-slate-600 text-xs font-medium mt-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis,
                    lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo,
                    vel  Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus
                    venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum
                    facilisis leo, vel  Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit
                    amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent
                    elementum facilisis leo, vel  Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
                    purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim
                    praesent elementum facilisis leo, vel Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
                    purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim
                    praesent elementum facilisis leo, vel Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
                    purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim
                    praesent elementum facilisis leo, vel Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
                    purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim
                    praesent elementum facilisis leo, vel Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
                    purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim
                    praesent elementum facilisis leo, vel Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
                    purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim
                    praesent elementum facilisis leo, vel .
                </p>
                <!-- question text -->

                <!-- question buttons -->
                <div class="flex justify-between items-center gap-3 mt-10 border-t border-slate-200 pt-4">

                    <!-- toggle -->
                    <div>
                        <AppToggle v-model="completed" :text="'Completed by all students?'" :textPos="'top'" />
                    </div>
                    <!-- toggle -->

                    <div class="flex gap-3 ">
                        <AppButton @click.prevent="toDelete = true" :name="'Delete'" :type="'plain'" />
                        <AppButton @click.prevent="actionUpdateQuestionnaireEdit({open: true, saving: false}), actionUpdateQuestionnaireView({open: false})" :name="'Edit'" :color="'rose'" />
                    </div>
                </div>
                <!-- question buttons -->

            </div>

        </div>

        <teleport to="body">
            <div v-if="toDelete" class="w-screen h-screen absolute top-0 left-0 flex justify-center items-center bg-slate-500/50 backdrop-blur z-50">
                <AppNotificationModal :type="'delete'" :title="'Delete questionnaire'" :text="'Are you sure you want to delete this questionnaire?'">
                    <AppButton @click.prevent="toDelete = false" :name="'Cancle'" :type="'plain'" />
                    <AppButton @click.prevent="actionUpdateQuestionnaireView({open: false})" :name="'Delete'" :color="'rose'" :loading="loading" :loadingText="'Deleting'" />
                </AppNotificationModal>
            </div>
        </teleport>
        
    </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import {DateTime} from "luxon";
import AppButton from "./AppButton.vue";
import AppToggle from "./AppToggle.vue";
import AppStaffId from "./AppStaffId.vue";
import AppCloseButton from "./AppCloseButton.vue";
import AppNotificationModal from "./AppNotificationModal.vue";

export default {
    name: "AppQuestionView",
    components: {AppCloseButton, AppStaffId, AppButton, AppToggle, AppNotificationModal},
    data() {
        return {
            published: DateTime.now().setLocale("en-US").toLocaleString(DateTime.DATE_MED),
            filters: ["sss1", "science", "art", "commercial"],
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
        ]),
        editQuestion() {
            this.actionUpdateQuestionnaireView({open: false});
            this.actionUpdateQuestionnaireForm({open: true});
        }
    },
}
</script>