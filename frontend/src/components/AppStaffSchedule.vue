<template>
    <div class="w-full h-full selection:bg-rose-500 selection:text-slate-50">

        <div class="flex flex-col pt-3 mt-10 xl:p-0">
            
            <div class="w-full flex flex-col xl:flex-row xl:space-x-4">

                <div class="w-full flex flex-col xl:w-8/12">

                    <!-- schedule form -->
                    <form class="relative w-full flex flex-col gap-4">
                        <h2 class="text-slate-600 text-xl font-medium tracking-wide">Create a schedule</h2>
                        <AppInputField :label="'Title'" :color="'rose'" :placeholder="'Title of the schedule...'" />
                        <AppTextField :label="'Detail'" :color="'rose'" :placeholder="'Detail of the schedule...'" />
                        
                        <AppButton @click.prevent="creating = !creating" class="self-end absolute bottom-3 right-3" :name="'Create'" :color="'rose'" :loading="creating" :loadingText="'Creating'" :disabled="creating" />
                    </form>
                    <!-- schedule form -->

                    <div class="flex flex-col gap-4 my-10">

                        <h2 class="text-2xl text-slate-900 font-bold md:text-3xl">Schedules</h2>

                        <div class="flex flex-col gap-4">
                            <details v-for="(name, index) in [1,2,3]" :key="index" class="flex flex-col gap-4 bg-slate-100 rounded-md p-4 shadow open:shadow-lg hover:shadow-lg">
                                <summary class="flex items-center gap-4 cursor-pointer">
                                    <svg :class="completed ? 'text-green-500':'text-rose-500'" class="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.66 4.3C13.5649 3.83433 13.1553 3.5 12.68 3.5H5.5C4.94772 3.5 4.5 3.94772 4.5 4.5V19.5C4.5 20.0523 4.94772 20.5 5.5 20.5C6.05228 20.5 6.5 20.0523 6.5 19.5V13.5H12.1L12.34 14.7C12.4307 15.1683 12.8431 15.5048 13.32 15.5H18.5C19.0523 15.5 19.5 15.0523 19.5 14.5V6.5C19.5 5.94772 19.0523 5.5 18.5 5.5H13.9L13.66 4.3Z"></path>
                                    </svg>

                                    <span class="flex flex-col max-w-[80%]">
                                        <p class="text-sm text-slate-700 font-medium truncate md:text-base">Create questionnaire for SSS2 students</p>
                                        <p class="text-xs text-slate-500 font-light md:text-sm">created: {{today.time}} </p>
                                    </span>
                                </summary>

                                <span class="flex flex-col gap-8 mt-4 ml-10">
                                    <p class="text-slate-500 text-sm font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus
                                        venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent
                                        elementum facilisis leo, vel  Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                                        aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus
                                        dolor purus non enim praesent elementum facilisis leo, vel  Lorem ipsum dolor sit amet,
                                        consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna
                                        fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo,
                                        vel  Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet
                                    </p>

                                    <!-- buttons -->
                                    <div class="flex items-center justify-between border-t pt-2">
                                        <AppToggle v-model="completed" :text="'Completed'" />
                                        <div class="flex gap-3">
                                            <AppButton @click.prevent :name="'Save'" :type="'plain'" :disabled="!completed" />
                                            <AppButton @click.prevent="toDelete = true" :name="'Delete'" :loading="toDelete" :loadingText="'Deleting'" :disabled="toDelete" />
                                        </div>
                                    </div>
                                    <!-- buttons -->

                                </span>

                            </details>
                        </div>

                    </div>

                </div>


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

        <teleport to='body'>
            <div v-if="toDelete" class="w-screen h-screen absolute top-0 left-0 flex justify-center items-center bg-slate-500/50 backdrop-blur z-50">
                <AppNotificationModal :type="'delete'" :title="'Delete schedule'" :text="'Are you sure you want to delete this schedule?'">
                        <AppButton @click.prevent="toDelete = false" :name="'Cancle'" :type="'plain'" />
                        <AppButton @click.prevent="toDelete = false" :name="'Delete'" />
                </AppNotificationModal>
            </div>
        </teleport>

    </div>
</template>

<script>
import {DateTime} from "luxon";
import AppButton from "./AppButton.vue";
import AppToggle from "./AppToggle.vue";
import AppCalendar from "./AppCalendar.vue";
import AppTextField from "./AppTextField.vue"
import AppInputField from "./AppInputField.vue";
import AppNotificationModal from "./AppNotificationModal.vue";

export default {
    name: "AppStaffSchedule",
    components: {AppCalendar, AppTextField, AppInputField, AppButton, AppToggle, AppNotificationModal},
    data() {
        return {
            today: {
                weekday: DateTime.now().setLocale("en-US").toLocaleString({weekday: 'long'}),
                full: DateTime.now().setLocale("en-US").toLocaleString(DateTime.DATE_FULL),
                time: DateTime.now().setLocale("en-US").toLocaleString(DateTime.TIME_SIMPLE),
            },
            completed: false,
            toDelete: false,
            creating: false,
        }
    },
}
</script>