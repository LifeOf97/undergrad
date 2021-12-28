<template>
    <div>

        <details class="flex flex-col gap-4 bg-slate-100 rounded-md p-4 shadow open:shadow-lg hover:shadow-lg">
            <summary class="flex items-center gap-4 cursor-pointer">
                <svg :class="completed ? 'text-green-500':'text-rose-500'" class="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.66 4.3C13.5649 3.83433 13.1553 3.5 12.68 3.5H5.5C4.94772 3.5 4.5 3.94772 4.5 4.5V19.5C4.5 20.0523 4.94772 20.5 5.5 20.5C6.05228 20.5 6.5 20.0523 6.5 19.5V13.5H12.1L12.34 14.7C12.4307 15.1683 12.8431 15.5048 13.32 15.5H18.5C19.0523 15.5 19.5 15.0523 19.5 14.5V6.5C19.5 5.94772 19.0523 5.5 18.5 5.5H13.9L13.66 4.3Z"></path>
                </svg>

                <span class="flex flex-col max-w-[80%]">
                    <p class="text-sm text-slate-700 font-medium truncate md:text-base">{{schedule.title}}</p>
                    <p class="text-xs text-slate-500 font-light md:text-sm">created: {{displayDate(schedule.created)}} </p>
                </span>
            </summary>

            <span class="flex flex-col gap-8 mt-4 ml-10">
                <p class="text-slate-500 text-sm font-normal">{{schedule.detail}}</p>

                <!-- buttons -->
                <div class="flex items-center justify-between border-t pt-2">
                    <AppToggle v-model="completed" :label="schedule.title" :text="'Completed'" />
                    <div class="flex gap-3">
                        <AppButton @click.prevent="actionUpdateSchedule({id: schedule.id, completed: completed})" :name="'Update'" :type="'plain'" />
                        <AppButton @click.prevent="actionUpdateScheduleDelete({open: true, id: schedule.id})" :name="'Delete'" :loading="scheduleDelete.open" :loadingText="'Deleting'" :disabled="scheduleDelete.open" />
                    </div>
                </div>
            </span>

        </details>
        
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import {DateTime} from "luxon";
import AppButton from "./AppButton.vue";
import AppToggle from "./AppToggle.vue";

export default {
    name: "AppScheduleCard",
    props: {
        schedule: {type: Object, required: false},
    },
    components: {AppButton, AppToggle},
    data() {
        return {
            completed: this.$props.schedule.completed,
        }
    },
    computed: {
        ...mapState({
            scheduleDelete: state => state.scheduleDelete,
        })
    },
    methods: {
        ...mapActions([
            "actionUpdateSchedule",
            "actionUpdateScheduleDelete"
        ]),
        displayDate(value) {
            return DateTime.fromISO(value).setLocale("en-US").toLocaleString(DateTime.DATETIME_MED);
        },
    }
}
</script>