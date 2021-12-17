<template>
    <div class="w-full h-full">

        <div class="flex flex-col pt-3 xl:p-0">
            <AppStaffGreet class="mt-10 mb-4 xl:mt-14" />
            
            <div class="w-full flex flex-col xl:flex-row xl:space-x-4">

                <!-- main -->
                <div class="w-full flex flex-col xl:w-8/12">
                    <AppStaffDashBoardHeader />

                    <div class="flex flex-col space-y-5 my-10">
                        <h1 class="text-xl text-slate-900 font-medium">Questionnaires</h1>

                        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <AppQuestion v-for="n in [1,2,3,4]" :key="n" />
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
            <div v-if="qform">
                <AppQuestionForm />
            </div>
        </teleport>
        <!-- start of teleport for questionnaire form -->

        <!-- start of teleport for questionnaire form -->
        <teleport to='body'>
            <div v-if="qview">
                <AppQuestionView />
            </div>
        </teleport>
        <!-- start of teleport for questionnaire form -->
        
    </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import {DateTime} from "luxon";
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
        AppCalendar, AppQuestionForm, AppQuestionView,
    },
    data() {
        return {
            today: {
                weekday: DateTime.now().setLocale("en-US").toLocaleString({weekday: 'long'}),
                full: DateTime.now().setLocale("en-US").toLocaleString(DateTime.DATE_FULL),
            } 
        }
    },
    computed: {
        ...mapState({
            qform: state => state.qform,
            qview: state => state.qview,
        })
    },
    methods: {
        ...mapActions([
            "commitUpdateQform",
            "commitUpdateQview",
        ])
    }
}
</script>