<template>
    <div class="w-full h-full">
        <Calendar
            :masks="calendarMask"
            :first-day-of-week="1"
            :attributes="calendarAttrs"
            is-expanded />
    </div>
</template>

<script>
import { Calendar } from "v-calendar";

export default {
    name: "AppCalendar",
    components: {Calendar,},
    data() {
        return {
            calendarMask: {weekdays: 'WWW',},
            calendarAttrs: [
                {
                    key: "today",
                    highlight: {class: "bg-rose-500", contentClass: "text-slate-50",},
                    dates: new Date(),
                },
            ],
        };
    },
}
</script>