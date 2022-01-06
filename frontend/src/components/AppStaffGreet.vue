<template>
    <div class="flex flex-col">
        <p class="text-slate-500 text-xs lg:text-lg">Good {{greet}}</p>
        <h3 class="text-slate-900 text-xl font-black lg:text-4xl">{{staffData.profile.first_name}} {{staffData.profile.other_name[0]}}. {{staffData.profile.last_name}}</h3>
    </div>
</template>

<script>
import {DateTime} from "luxon";

export default {
    name: "AppStaffGreet",
    props: {
        staffData: {type: Object, required: false},
    },
    computed: {
        greet() {
            const time = DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE).slice(0,2)
            if (time < 12) return "morning"
            else if ((time >= 12) && (time < 18)) return "afternoon"
            else return "evening"
        }
    }
}
</script>