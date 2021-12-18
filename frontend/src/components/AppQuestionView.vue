<template>
    <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-slate-500/50 backdrop-blur-sm z-40 selection:bg-rose-500 selection:text-slate-50">

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
                <div class="flex justify-between items-center gap-3 mt-10 border-t border-slate-200 pt-4">

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
                <AppDeleteModal :title="'questionnaire'">
                    <AppButton @click.prevent :name="'Cancle'" :type="'plain'" />
                    <AppButton @click.prevent="commitUpdateQview({state: false})" :name="'Delete'" />
                </AppDeleteModal>
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
import AppDeleteModal from "./AppDeleteModal.vue";

export default {
    name: "AppQuestionView",
    components: {AppCloseButton, AppStaffId, AppButton, AppToggle, AppDeleteModal},
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