<template>
    <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-slate-500/50 backdrop-blur-sm z-40">

        <div class="w-11/12 h-[90%] rounded-md shadow-lg bg-white p-10 overflow-auto lg:w-9/12">

            <div class="flex items-center justify-between">
                <span>
                    <h1 class="text-2xl text-slate-900 font-bold">Questionnaire</h1>
                    <p class="text-xs text-slate-500 font-medium">Create questions to ask your students.</p>
                </span>
                <AppCloseButton @click.prevent="actionUpdateQuestionnaireForm({open: false, saving: false, error: null}), actionUpdateQuestionnaireEdit({open: false, saving: false, error: null})" />
            </div>

            <!-- forms fields -->
            <form @submit.prevent="createQuestionnaire()" class="grid grid-cols-1 gap-8 mt-10 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-0">

                <div class="space-y-8 col-span-2">
                    <AppInputField v-model="title" :label="'Title'" :type="'text'" :color="'rose'" :placeholder="'Title of the questionnaire'" :required="true" />
                    <AppTextField v-model="question" :label="'Question(s)'" :color="'rose'" :placeholder="'Details of the questionnaire'" :required="true" />
                   
                    <!-- if errors -->
                    <span v-if="questionnaireForm.error != null" class="text-right col-span-2 text-sm text-rose-500 font-medium">{{questionnaireForm.error}}</span>
                </div>


                <!-- filter students -->
                <div>
                    <span>
                        <h3 class="text-xl text-slate-900 font-medium">Students</h3>
                        <p class="text-xs text-slate-500 font-medium">Select the category of students this questionnaire is ment for.</p>
                    </span>

                    <div class="flex flex-wrap gap-7 mt-6">
                        <span v-for="filter in categories" :key="filter.title" class="space-y-2">
                            <p class="text-xs text-slate-500 font-medium capitalize">{{filter.title}}</p>

                            <div class="flex flex-wrap gap-4">
                                <span v-for="opt in filter.options" :key="opt.name" class="flex">
                                    <label :for="opt.name" :class="opt.selected ? 'bg-rose-500 text-white':'bg-slate-50 text-slate-500'" class="flex text-xs items-center justify-center space-x-2 rounded-lg border border-transparent p-2 cursor-pointer transition-all duration-100 capitalize outline-none hover:border-rose-500">
                                        <p>{{opt.name}}</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 fill-current" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                                        </svg>
                                    </label>
                                    <input @click="updateFilter(opt.selected, opt.name)" type="checkbox" :name="opt.name" :id="opt.name" v-model="opt.selected" class="hidden">
                                </span>
                            </div>
                        </span>
                    </div>
                </div>
                <!-- filter students -->

                <div class="col-span-2 flex justify-end gap-3 mt-10 border-t border-slate-200 pt-4">
                    <AppButton @click.prevent="actionUpdateQuestionnaireForm({open: false, saving: false, error: null}), actionUpdateQuestionnaireEdit({open: false, saving: false, error: null})" :name="'Cancle'" :type="'plain'" />
                    <AppButton :name="questionnaireEdit.open ? 'Save changes':'Create'" :color="'rose'" :loading="questionnaireEdit.open ? questionnaireEdit.saving:questionnaireForm.saving" :loadingText="questionnaireEdit.open ? 'Saving changes':'Creating'" />
                </div>

            </form>


        </div>
        
    </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import AppButton from "./AppButton.vue";
import AppTextField from "./AppTextField.vue";
import AppInputField from "./AppInputField.vue";
import AppCloseButton from "./AppCloseButton.vue";

export default {
    name: "AppQuestionForm",
    components: {AppCloseButton, AppInputField, AppTextField, AppButton,},
    emits: ["checked"],
    data() {
        return {
            title: "",
            question: "",
            filter: [],
            categories: [
                {
                    title: "Gender",
                    options: [
                        {name: "male", selected: false},
                        {name: "female", selected: false}
                    ]
                },
                {
                    title: "Class",
                    options: [
                        {name: "jss1", selected: false},
                        {name: "jss2", selected: false},
                        {name: "jss3", selected: false},
                        {name: "sss1", selected: false},
                        {name: "sss2", selected: false},
                        {name: "sss3", selected: false}
                    ]
                },
                {
                    title: "Department",
                    options: [
                        {name: "art", selected: false},
                        {name: "commercial", selected: false},
                        {name: "science", selected: false},
                        {name: "social science", selected: false}
                    ]
                },
            ]
        }
    },
    computed: {
        ...mapState({
            questionnaireForm: state => state.questionnaireForm,
            questionnaireEdit: state => state.questionnaireEdit,
            questionnaireView: state => state.questionnaireView,
        })
    },
    methods: {
        ...mapActions([
            "actionUpdateQuestionnaireForm",
            "actionUpdateQuestionnaireView",
            "actionUpdateQuestionnaireEdit",
            "actionCreateQuestionnaire",
            "actionRetrieveQuestionnaires",
        ]),
        updateFilter(state, value) {
            // for some reasons the checkbox state is passed as false when active and
            // true when inactive soo....
            if (!state) this.filter.push(value);
            else this.filter.splice(this.filter.indexOf(value), 1);
        },
        async createQuestionnaire() {
            // method to get questionnaire data an pass it to store action
            // that will make a post request to create/edit a questionnaire
            const data = {
                title: this.title,
                question: this.question,
                categories: this.filter,
            }
            // dispatch the action to create the questionnaire
            await this.actionCreateQuestionnaire(data);
        }
    }
}
</script>