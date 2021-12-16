<template>
    <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-slate-500/50 backdrop-blur-sm selection:bg-rose-500 selection:text-slate-50">

        <div class="relative w-11/12 h-[90%] rounded-md shadow-lg bg-white overflow-y-auto p-7 lg:p-0 lg:w-9/12">

            <!-- close button -->
            <AppCloseButton @click.prevent="commitUpdateQview({state: false})" class="absolute top-7 right-7" />
            <!-- close button -->

            <div class="w-full flex flex-col gap-4 mt-16 mx-auto lg:w-10/12 xl:w-8/12">
                <div class="mb-5">
                    <h1 class="text-xl text-center text-slate-900 font-bold tracking-wide underline underline-offset-4 md:text-3xl">Topic of the question comes here</h1>
                </div>

                <span class="flex justify-between items-center">
                    <AppStaffId />
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
                <div class="flex justify-between items-center gap-3 mt-10 border-t border-slate-100 pt-4">

                    <!-- toggle -->
                    <div>
                        <AppToggle v-model="completed" :text="'Completed by all students?'" :textPos="'top'" />
                    </div>
                    <!-- toggle -->

                    <div class="flex gap-3 ">
                        <AppButton @click.prevent="toDelete = true" :name="'Delete'" :type="'plain'" />
                        <AppButton @click.prevent="editQuestion" :name="'Edit'" :color="'green'" />
                    </div>
                </div>
                <!-- question buttons -->

            </div>

        </div>

        <teleport to="body">
            <div v-if="toDelete" class="w-screen h-screen absolute top-0 left-0 flex justify-center items-center bg-slate-500/50 backdrop-blur z-50">

                <div class="w-96 h-auto flex flex-col items-center rounded-lg overflow-hidden shadow-lg shadow-red-500/20 bg-slate-50">
                    <span class="w-full flex flex-col items-center justify-center gap-4 py-5 px-10 bg-white md:flex-row md:items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-rose-500 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span class="flex flex-col items-center gap-2 md:items-start">
                            <h4 class="text-slate-900 text-lg font-semibold">Delete questionnaire</h4>
                            <p class="text-slate-500 text-xs font-normal leading-3 md:text-sm">Are you sure you want to delete this questionnaire?</p>
                        </span>
                    </span>

                    <div class="w-full flex flex-col gap-4 p-2 md:flex-row md:w-auto md:self-end">
                        <AppButton @click.prevent :name="'Cancle'" :type="'plain'" />
                        <AppButton @click.prevent="commitUpdateQview({state: false})" :name="'Delete'" />
                    </div>

                </div>

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

export default {
    name: "AppQuestionView",
    components: {AppCloseButton, AppStaffId, AppButton, AppToggle},
    data() {
        return {
            published: DateTime.now().setLocale("en-US").toLocaleString(DateTime.DATE_MED),
            filters: ["sss1", "science", "art", "commercial"],
            completed: false,
            toDelete: false,
        }
    },
    computed: {
        ...mapState({
            qview: state => state.qview,
        }),
    },
    methods: {
        ...mapActions([
            "commitUpdateQform",
            "commitUpdateQview",
        ]),
        editQuestion() {
            this.commitUpdateQview({state: false});
            this.commitUpdateQform({state: true});
        }
    },
}
</script>