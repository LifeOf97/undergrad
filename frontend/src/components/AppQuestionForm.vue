<template>
    <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-slate-500/50 backdrop-blur-sm z-40">

        <div class="w-11/12 h-[90%] rounded-md shadow-lg bg-white p-10 overflow-auto lg:w-9/12">

            <div class="flex items-center justify-between">
                <span>
                    <h1 class="text-2xl text-slate-900 font-bold">Questionnaire</h1>
                    <p class="text-xs text-slate-500 font-medium">Create questions to ask your students.</p>
                </span>
                <AppCloseButton data-test="close-btn" @click.prevent="actionUpdateQuestionnaireForm({open: false, saving: false, error: null}), actionUpdateQuestionnaireEdit({open: false, saving: false, error: null})" />
            </div>

            <!-- forms fields -->
            <form @submit.prevent="questionnaireForm.open ? createQuestionnaire():updateQuestionnaire(questionnaireView.data.id)" class="grid grid-cols-1 gap-8 mt-10 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-0">

                <div class="space-y-8 col-span-2">
                    <AppInputField v-model="title" :label="'Title'" :type="'text'" :color="'rose'" :placeholder="'Title of the questionnaire'" :required="true" />
                    <!-- textfield-->
                    <div class="relative flex flex-col space-y-2">
                        <label for="question" class="text-xs text-slate-900 font-medium md:text-base">Question(s)</label>
                        <textarea required name="question" id="question" rows="10" cols="30" v-model="question" placeholder="Qeustions you want to ask " class="w-full resize-none text-slate-600 text-sm font-medium p-2 bg-slate-50 placeholder-slate-300 rounded-md shadow border-2 border-transparent hover:border-rose-500 focus-within:border-rose-500 focus:outline-none md:text-base"></textarea>
                    </div>
                    
                    <!-- question completed toggle button -->
                    <AppToggle data-test="toggle-btn" v-if="questionnaireEdit.open" v-model="completed" :text="'Completed by all students?'" :textPos="'top'" />

                    <!-- if errors -->
                    <span data-test="error" v-if="questionnaireForm.error != null || questionnaireEdit.error != null" class="text-right col-span-2 text-sm text-rose-500 font-medium">{{questionnaireForm.error||questionnaireEdit.error}}</span>
                </div>


                <!-- filter students -->
                <div>
                    <span>
                        <h3 class="text-xl text-slate-900 font-medium">Students</h3>
                        <p class="text-xs text-slate-500 font-medium">Select the category of students this questionnaire is ment for.</p>
                    </span>

                    <div class="flex flex-wrap gap-7 mt-6">
                        <!-- gender -->
                        <span class="space-y-2">
                            <p class="text-xs text-slate-500 font-medium capitalize">Gender</p>
                            
                            <div class="flex flex-wrap gap-4">
                                <span v-for="opt in gender" :key="opt.name" class="flex">
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

                        <!-- class -->
                        <span class="space-y-2">
                            <p class="text-xs text-slate-500 font-medium capitalize">Class</p>

                            <div class="flex flex-wrap gap-4">
                                <span v-for="opt in level" :key="opt.name" class="flex">
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
                        
                        <!-- department -->
                        <span class="space-y-2">
                            <p class="text-xs text-slate-500 font-medium capitalize">Department</p>

                            <div class="flex flex-wrap gap-4">
                                <span v-for="opt in department" :key="opt.name" class="flex">
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
                    <AppButton data-test="cancle-btn" @click.prevent="actionUpdateQuestionnaireForm({open: false, saving: false, error: null}), actionUpdateQuestionnaireEdit({open: false, saving: false, error: null})" :name="'Cancle'" :type="'plain'" />
                    <!-- available when creating a new questionnaire -->
                    <AppButton data-test="create-btn" v-if="questionnaireForm.open" :name="'Create'" :color="'rose'" :loading="questionnaireForm.saving" :loadingText="'Creating'" />
                    <!-- available when editing a new questionnaire -->
                    <AppButton data-test="save-btn" v-else :name="'Save changes'" :color="'rose'" :loading="questionnaireEdit.saving" :loadingText="'Saving changes'" />
                </div>

            </form>


        </div>
        
    </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import AppButton from "./AppButton.vue";
import AppToggle from "./AppToggle.vue";
import AppInputField from "./AppInputField.vue";
import AppCloseButton from "./AppCloseButton.vue";

export default {
    name: "AppQuestionForm",
    components: {AppCloseButton, AppInputField, AppButton, AppToggle},
    emits: ["checked"],
    data() {
        return {
            title: "",
            question: "",
            completed: false,
            filter: [],
            gender: [
                {name: "male", selected: false},
                {name: "female", selected: false},
            ],
            level: [
                {name: "jss1", selected: false},
                {name: "jss2", selected: false},
                {name: "jss3", selected: false},
                {name: "sss1", selected: false},
                {name: "sss2", selected: false},
                {name: "sss3", selected: false},
            ],
            department: [
                {name: "art", selected: false},
                {name: "commercial", selected: false},
                {name: "science", selected: false},
                {name: "social science", selected: false},
            ],
        }
    },
    mounted() {
        this.$nextTick(function() {
            this.updateDataValue();
        });
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
            "actionUpdateQuestionnaire",
            "actionFetchQuestionnaires",
        ]),
        updateDataValue() {
            // method to update the questionnaire intial values when the edit button
            // is clicked.
            if (this.questionnaireEdit.open) {
                this.title = this.questionnaireView.data.title;
                this.question = this.questionnaireView.data.question;
                this.completed = this.questionnaireView.data.completed;
                this.filter = this.questionnaireView.data.categories.split(",");
                
                // yet to find a more concise way to update default values for categories
                // gender update
                this.gender[0].selected = this.filter.includes(this.gender[0].name) ? true:false
                this.gender[1].selected = this.filter.includes(this.gender[1].name) ? true:false
                // level update
                this.level[0].selected = this.filter.includes(this.level[0].name) ? true:false
                this.level[1].selected = this.filter.includes(this.level[1].name) ? true:false
                this.level[2].selected = this.filter.includes(this.level[2].name) ? true:false
                this.level[3].selected = this.filter.includes(this.level[3].name) ? true:false
                this.level[4].selected = this.filter.includes(this.level[4].name) ? true:false
                this.level[5].selected = this.filter.includes(this.level[5].name) ? true:false
                // department update
                this.department[0].selected = this.filter.includes(this.department[0].name) ? true:false
                this.department[1].selected = this.filter.includes(this.department[1].name) ? true:false
                this.department[2].selected = this.filter.includes(this.department[2].name) ? true:false
                this.department[3].selected = this.filter.includes(this.department[3].name) ? true:false
            }
            else {
                this.title = "";
                this.question = "";
                this.completed = "";
                this.filter = [];
            };
        },
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
        },
        async updateQuestionnaire(id) {
            // method to update a particular questionnaire instance
            const data = {
                title: this.title,
                question: this.question,
                completed: this.completed,
                categories: this.filter,
            }
            // dispatch the action to create the questionnaire
            this.actionUpdateQuestionnaire({data: data, id: id});
        },
    },
}
</script>