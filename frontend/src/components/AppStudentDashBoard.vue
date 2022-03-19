<template>
    <div class="w-full h-full mt-12">

        <div class="flex flex-col gap-4">

            <div class="flex flex-col items-center space-y-2 md:items-start">
                <div class="flex items-start justify-center md:justify-start">
                    <img v-if="studentData.profile.image" :src="studentData.profile.image" class="w-60 aspect-[1/1] object-cover rounded-lg shadow">
                    <div v-else class="w-60 aspect-[1/1] flex flex-wrap items-center justify-center bg-rose-500 rounded-lg transition-all duration-1000 group-hover:scale-125">
                        <span class="text-base text-slate-50 font-bold capitalize">{{studentData.profile.first_name}} {{studentData.profile.other_name}} {{studentData.profile.last_name}}</span>
                    </div>
                </div>
                <span class="text-sm text-slate-900 font-black md:text-base">{{studentData.sid}}</span>
            </div>
               
            <!-- start of students data -->
            <div class="grid grid-cols-3 gap-x-2 gap-y-6 p-4">

                <span class="txt">
                    <span class="text-slate-500 text-xs font-light md:text-sm">First Name</span>
                    <p class="text-slate-900 text-sm font-normal md:text-lg">{{studentData.profile.first_name}}</p>
                </span>

                <span class="txt">
                    <span class="text-slate-500 text-xs font-light md:text-sm">Last Name</span>
                    <p class="text-slate-900 text-sm font-normal md:text-lg">{{studentData.profile.last_name}}</p>
                </span>

                <span class="txt">
                    <span class="text-slate-500 text-xs font-light md:text-sm">Other Name</span>
                    <p class="text-slate-900 text-sm font-normal md:text-lg">{{studentData.profile.other_name}}</p>
                </span>

                <span class="txt">
                    <span class="text-slate-500 text-xs font-light md:text-sm">Department</span>
                    <p class="text-slate-900 text-sm font-normal md:text-lg">{{studentData.department}}</p>
                </span>

                <span class="txt">
                    <span class="text-slate-500 text-xs font-light md:text-sm">Class</span>
                    <p class="text-slate-900 text-sm font-normal md:text-lg">{{studentData.level}}</p>
                </span>

                <span class="txt">
                    <span class="text-slate-500 text-xs font-light md:text-sm">Reg No</span>
                    <p class="text-slate-900 text-sm font-normal md:text-lg">{{studentData.reg_no}}</p>
                </span>                

                <span class="txt">
                    <span class="text-slate-500 text-xs font-light md:text-sm">Address</span>
                    <p class="text-slate-900 text-sm font-normal md:text-lg">{{studentData.profile.state}}, {{studentData.profile.country}}</p>
                </span>

                <span class="txt">
                    <span class="text-slate-500 text-xs font-light md:text-sm">Parent/Guardian</span>
                    <p class="text-slate-900 text-sm font-normal md:text-lg">{{studentData.parent}}</p>
                </span>

                <span class="txt">
                    <span class="text-slate-500 text-xs font-light md:text-sm">Phone(s)</span>
                    <p class="text-slate-900 text-sm font-normal md:text-lg">{{studentData.profile.phone_1}}, {{studentData.profile.phone_2}}</p>
                </span>

                <span class="txt col-span-full">
                    <span class="text-slate-500 text-xs font-light md:text-sm">About Me</span>
                    <p class="text-slate-900 text-sm font-normal md:text-lg">
                        {{studentData.profile.about}}
                    </p>
                </span>

            </div>
            <!-- start of students data -->
        
        </div>
        
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    name: "AppStudentDashBoard",
    computed: {
        ...mapState({
            studentData: state => state.studentData,
        }),
    },
    methods: {
        ...mapActions([
            "actionFetchStudentCounsel",
        ])
    },
    mounted() {
        this.$nextTick(function() {
            this.actionFetchStudentCounsel();
        })
    }
}
</script>