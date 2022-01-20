<template>
    <div class="">

        <!-- start of student name/reg no -->
        <div class="flex items-center">
            <div class="">
                <img v-if="studentView.profile.image" :src="studentView.profile.image" alt="Staff avatar" class="w-10 h-10 rounded-full object-cover object-top mr-2 border border-red-50">
                <div v-else class="w-6 h-6 flex items-center justify-center rounded-full bg-rose-500 ring-2 ring-rose-500 ring-offset-2 ring-offset-rose-200 mr-3 md:w-8 md:h-8 md:ring-offset-4">
                    <p class="capitalize font-black text-xl text-slate-50">{{studentView.profile.first_name[0]}}</p>
                </div>
            </div>

            <div class="flex flex-col">
                <h3 class="max-w-[10rem] text-slate-900 text-sm font-semibold capitalize truncate">{{studentView.profile.first_name}} {{studentView.profile.other_name[0]}}. {{studentView.profile.last_name}}</h3>
                <p class="text-slate-500 text-xs">REG NO: {{studentView.reg_no}}</p>
            </div>
        </div>
        <!-- start of student name/reg no-->

    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "AppStudentId",
    computed: {
        ...mapState({
            studentView: state => state.studentView,
        })
    }
}
</script>