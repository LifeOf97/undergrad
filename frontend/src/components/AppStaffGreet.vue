<template>
    <div class="flex flex-col">
        <p class="text-slate-500 text-xs lg:text-lg">Good morning</p>
        <h3 class="text-slate-900 text-xl font-black lg:text-4xl">{{staffData.profile.first_name}} {{staffData.profile.other_name[0]}}. {{staffData.profile.last_name}}</h3>
    </div>
</template>

<script>
export default {
    name: "AppStaffGreet",
    props: {
        staffData: {type: Object, required: false},
    }
}
</script>