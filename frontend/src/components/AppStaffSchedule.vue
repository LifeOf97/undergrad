<template>
    <div class="w-full h-full selection:bg-rose-500 selection:text-slate-50">

        <div class="flex flex-col pt-3 mt-10 xl:p-0">
            
            <div class="w-full flex flex-col xl:flex-row xl:space-x-4">

                <div class="w-full flex flex-col xl:w-8/12">

                    <!-- schedule form -->
                    <form @submit.prevent="createSchedule()" class="relative w-full flex flex-col gap-4">
                        <h2 class="text-slate-600 text-xl font-medium tracking-wide">Create a schedule</h2>
                        <AppInputField v-model="title" :label="'Title'" :color="'rose'" :placeholder="'Title of the schedule...'" :required="true" />
                        <!-- textfield-->
                        <div class="relative flex flex-col space-y-2">
                            <label for="question" class="text-xs text-slate-900 font-medium md:text-base">Detail</label>
                            <textarea required name="question" id="question" rows="10" cols="30" v-model="detail" placeholder="Detail of this schedule" class="w-full resize-none text-slate-600 text-sm font-medium p-2 bg-slate-50 placeholder-slate-300 rounded-md shadow border-2 border-transparent hover:border-rose-500 focus-within:border-rose-500 focus:outline-none md:text-base"></textarea>
                        </div>
                        
                        <div class="self-end absolute bottom-3 right-3 flex items-end gap-4">
                            <p :class="displayBefore() ? 'p-2 bg-slate-300 rounded-md':''" class="self-center text-xs font-bold">{{displayBefore()}}</p>
                            <!-- datepicker -->
                            <DatePicker mode="date" v-model="before">
                                <template v-slot="{togglePopover}">
                                    <button @click.prevent="togglePopover()" class="group">
                                        <svg class="w-6 h-6 fill-current text-slate-500 group-hover:text-rose-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4H7V2H9V4H15V2H17V4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22ZM5 10V20H19V10H5ZM5 6V8H19V6H5ZM9.8 19H8V17.2L12.2 13.01L14 14.81L9.8 19ZM14.625 14.182L12.825 12.382L14.2 11.013L16 12.813L14.63 14.183L14.625 14.182Z"></path>
                                        </svg>
                                    </button>
                                </template>
                            </DatePicker>
                            <!-- create button -->
                            <AppButton :name="'Create'" :color="'rose'" :loading="scheduleForm.saving" :loadingText="'Creating'" :disabled="scheduleForm.saving" />
                        </div>
                    </form>
                    <!-- schedule form -->

                    <div class="flex flex-col gap-4 my-10">

                        <h2 class="text-2xl text-slate-900 font-bold md:text-3xl">Schedules</h2>

                        <!-- if fetching schedules -->
                        <span v-if="schedules.loading" class="flex items-center justify-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 animate-spin stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p class="text-base text-slate-600 font-normal">Loading</p>
                        </span>

                        <!-- if fetching schedules returns an error -->
                        <span v-if="schedules.error != null" class="flex flex-col items-center justify-center">
                            <p class="text-sm text-rose-500 font-medium">{{schedules.error}}</p>
                            <span>
                                <AppButton @click.prevent="actionFetchSchedule()" :type="'plain'" :name="'Try again'" :loading="schedules.loading" :loadingText="'Loading'" />
                            </span>
                        </span>

                        <!-- if no schedules yet -->
                        <span v-if="noSchedules()" class="flex item-center justify-center">
                            <p class="text-base text-slate-500 font-light">You do not have any schedule</p>
                        </span>

                        <!-- if schedules are available -->
                        <div class="flex flex-col gap-4">
                            <AppScheduleCard v-for="schedule in schedules.data" :key="schedule.id" :schedule="schedule" />
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
            <div v-if="scheduleDelete.open" class="w-screen h-screen absolute top-0 left-0 flex justify-center items-center bg-slate-500/50 backdrop-blur z-50">
                <AppNotificationModal :type="'delete'" :title="'Delete schedule'" :text="'Are you sure you want to delete this schedule?'">
                        <AppButton @click.prevent="actionUpdateScheduleDelete({open: false, id: ''})" :name="'Cancle'" :type="'plain'" />
                        <AppButton @click.prevent="actionDeleteSchedule()" :name="'Delete'" />
                </AppNotificationModal>
            </div>
        </teleport>

    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import {DateTime} from "luxon";
import {DatePicker} from "v-calendar";
import AppButton from "./AppButton.vue";
import AppCalendar from "./AppCalendar.vue";
import AppInputField from "./AppInputField.vue";
import AppScheduleCard from "./AppScheduleCard.vue";
import AppNotificationModal from "./AppNotificationModal.vue";

export default {
    name: "AppStaffSchedule",
    components: {
        AppCalendar, AppInputField, AppButton,
        AppNotificationModal, AppScheduleCard, DatePicker,
    },
    data() {
        return {
            title: "",
            detail: "",
            before: "",
            today: {
                weekday: DateTime.now().setLocale("en-US").toLocaleString({weekday: 'long'}),
                full: DateTime.now().setLocale("en-US").toLocaleString(DateTime.DATE_FULL),
                time: DateTime.now().setLocale("en-US").toLocaleString(DateTime.TIME_SIMPLE),
            },
        }
    },
    computed: {
        ...mapState({
            scheduleDelete: state => state.scheduleDelete,
            scheduleForm: state => state.scheduleForm,
            schedules: state => state.schedules,
        }),
    },
    methods: {
        ...mapActions([
            "actionCreateSchedule",
            "actionUpdateSchedule",
            "actionFetchSchedule",
            "actionDeleteSchedule",
            "actionUpdateScheduleDelete",
        ]),
        createSchedule() {
            // method to create a new schedule
            const before = new Date(this.before)
            const data = {
                title: this.title,
                detail: this.detail,
                before: `${before.getFullYear()}-${before.getMonth()}-${before.getDay()}`
            }
            // then pass the data to the actionCreateSchedule
            this.actionCreateSchedule({data: data});

            // make sure to reset data state
            this.title = "";
            this.detail = "";
            this.before = "";
        },
        noSchedules() {
            if (this.schedules.data.length < 1) return true
            else return false;
        },
        displayBefore() {
            const date = DateTime.fromJSDate(this.before)

            if (this.before) return date.setLocale("en-US").toLocaleString(DateTime.DATE_FULL)
            else return "";
        }
    },
    created() {
        this.actionFetchSchedule();
    },
}
</script>