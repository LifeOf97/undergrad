<template>
    <div class="">

        <!-- start of staff name/id -->
        <div class="flex items-center space-x-2">
            <img :src="img" alt="Staff avatar" class="w-10 h-10 rounded-full object-cover object-top border border-red-50">

            <div class="flex flex-col">
                <h3 class="max-w-[10rem] text-slate-900 text-sm font-semibold capitalize truncate">{{staffData.profile.first_name}} {{staffData.profile.other_name[0]}}. {{staffData.profile.last_name}}</h3>
                <p class="text-slate-500 text-xs">STAFF ID: {{staffData.staff_id}}</p>
            </div>
        </div>
        <!-- start of staff name/id -->

    </div>
</template>

<script>
export default {
    name: "AppStaffId",
    props: {
        staffData: {type: Object, required: false},
    },
    data() {
        return {
            img: require("@/assets/images/staffimg.jpeg").default,
        }
    }
}
</script>