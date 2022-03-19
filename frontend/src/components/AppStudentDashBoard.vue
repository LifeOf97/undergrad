<template>
    <div class="w-full h-full min-h-[40rem]">

        <div class="flex items-center justify-center">
            <p class="text-4xl font-black text-slate-900">{{ studentData.sid }}</p>
        </div>
        
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "AppStudentDashBoard",
    computed: {
        ...mapState({
            studentData: state => state.studentData,
        }),
    }
}
</script>