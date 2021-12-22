<template>
    <div class="w-full h-full">

        <div class="flex flex-col pt-3 xl:p-0">
            <AppStaffGreet :staffData="staffData" class="mt-10 mb-4 xl:mt-14" />
            
            <div class="w-full flex flex-col xl:flex-row xl:space-x-4">

                <!-- main -->
                <div class="w-full flex flex-col xl:w-8/12">
                    <AppStaffDashBoardHeader />

                    <div class="flex flex-col space-y-5 my-10">
                        <h1 class="text-xl text-slate-900 font-medium">Questionnaires</h1>

                        <!-- if fetching questionnaire returns an error -->
                        <span v-if="questionnaires.error != null" class="flex flex-col items-center justify-center">
                            <p class="text-sm text-rose-500 font-medium">{{questionnaires.error}}</p>
                            <span>
                                <AppButton @click.prevent="actionRetrieveQuestionnaires()" :type="'plain'" :name="'Try again'" :loading="questionnaires.loading" :loadingText="'Loading'" />
                            </span>
                        </span>
                        <!-- if fetching questionnaire is in process -->
                        <span v-if="questionnaires.loading" class="flex items-center justify-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 animate-spin stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p class="text-base text-slate-600 font-normal">Loading</p>
                        </span>

                        <!-- if no questionnaires yet -->
                        <span v-if="questionnaireLen()" class="flex item-center justify-center">
                            <p class="text-base text-slate-500 font-light">You do not have any questionnaire</p>
                        </span>
                        <!-- if questionnaires are available -->
                        <div v-else class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <AppQuestion v-for="question in questionnaires.data" :key="question.id" :question="question" />
                        </div>
                    </div>
                </div>
                <!-- main -->

                <!-- calender/date -->
                <div class="w-full flex flex-col text-2xl font-black pb-10 xl:fixed xl:top-44 xl:right-8 xl:w-3/12">
                    <div class="flex flex-col space-y-6">
                        <span class="flex flex-col items-start leading-3">
                            <p class="text-sm text-slate-500 font-normal">{{today.weekday}}</p>
                            <p class="text-lg text-slate-900 font-medium">{{today.full}}</p>
                        </span>
                        <AppCalendar />
                    </div>
                </div>
                <!-- calender/date -->

            </div>

        </div>

        <!-- start of teleport for questionnaire form -->
        <teleport to='body'>
            <div v-if="questionnaireForm.open|questionnaireEdit.open">
                <AppQuestionForm />
            </div>
        </teleport>
        <!-- start of teleport for questionnaire form -->

        <!-- start of teleport for questionnaire form -->
        <teleport to='body'>
            <div v-if="questionnaireView.open">
                <AppQuestionView />
            </div>
        </teleport>
        <!-- start of teleport for questionnaire form -->
        
    </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import {DateTime} from "luxon";
import AppButton from "./AppButton.vue";
import AppQuestion from "./AppQuestion.vue";
import AppCalendar from "./AppCalendar.vue";
import AppStaffGreet from "./AppStaffGreet.vue";
import AppQuestionForm from "./AppQuestionForm.vue";
import AppQuestionView from "./AppQuestionView.vue";
import AppStaffDashBoardHeader from "./AppStaffDashBoardHeader.vue";

export default {
    name: "AppStaffDashBoard",
    components: {
        AppStaffGreet, AppStaffDashBoardHeader, AppQuestion,
        AppCalendar, AppQuestionForm, AppQuestionView, AppButton,
    },
    data() {
        return {
            today: {
                weekday: DateTime.now().setLocale("en-US").toLocaleString({weekday: 'long'}),
                full: DateTime.now().setLocale("en-US").toLocaleString(DateTime.DATE_FULL),
            },
        }
    },
    computed: {
        ...mapState({
            questionnaireForm: state => state.questionnaireForm,
            questionnaireEdit: state => state.questionnaireEdit,
            questionnaireView: state => state.questionnaireView,
            questionnaires: state => state.questionnaires,
            staffData: state => state.staffData,
        }),
    },
    methods: {
        ...mapActions([
            "actionUpdateQuestionnaireForm",
            "actionUpdateQuestionnaireView",
            "actionRetrieveQuestionnaires",
        ]),
        questionnaireLen() {
            if (this.questionnaires.data.length < 1) return true
            else return false;
        },
    },
    created() {
        this.actionRetrieveQuestionnaires();
    },
}
</script>