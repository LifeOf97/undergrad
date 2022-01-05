<template>
    <div class="w-full h-full">
        <Calendar
            :masks="calendarMask"
            :first-day-of-week="1"
            :attributes="attributes"
            is-expanded />
    </div>
</template>

<script>
import { Calendar } from "v-calendar";

export default {
    name: "AppCalendar",
    components: {Calendar,},
    props: {
        todos: {type: Array, requires: false},
    },
    data() {
        return {
            myTodos: this.$props.todos,
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
    computed: {
        attributes() {
            return [...this.calendarAttrs]
        }
    },
}
</script>