<template>
    <div class="w-full flex items-center justify-between p-9 bg-rose-500 rounded-md">

        <div class="flex flex-col items-start justify-start space-y-6">

            <div class="flex flex-col space-y-2">
                <p class="text-2xl text-slate-50 font-black leading-7 md:text-4xl md:leading-10">Keep Your<br>Students Engaged</p>
                <p class="text-slate-200 text-xs font-normal leading-4 md:text-sm md:leading-5">Ask your students relevant questions to help<br>them decide their career path.</p>
            </div>

            <button @click.prevent="actionUpdateQuestionnaireForm({open: true, saving: false, data: '', error: null})" class="text-base text-slate-900 font-medium bg-slate-50 p-3 rounded-lg duration-200 hover:scale-105 hover:shadow-lg">Create Questionnaire</button>

        </div>

        <!-- start storyset hidden on small screens -->
        <div class="w-60 h-60 bg-rose-400 rounded-full hidden select-none md:block">
            <img :src="storyImg" class="w-full h-full">
        </div>
        <!-- end storyset hidden on small screens -->

        
    </div>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
    name: "AppStaffDashBoardHeader",
    data() {
        return {
            storyImg: require("@/assets/images/Teaching-pana.svg").default,
        }
    },
    computed: {
        ...mapState({
            questionnaireForm: state => state.questionnaireForm,
        })
    },
    methods: {
        ...mapActions([
            "actionUpdateQuestionnaireForm",
        ])
    }
}
</script>