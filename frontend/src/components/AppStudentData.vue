<template>
    <div class="flex flex-col gap-4">

        <!-- students data -->
        <div class="grid grid-cols-3 gap-x-2 gap-y-6 p-4">

            <span class="txt">
                <span class="text-slate-500 text-xs font-light md:text-sm">First Name</span>
                <p class="text-slate-900 text-sm font-normal md:text-lg">{{studentView.profile.first_name}}</p>
            </span>

            <span class="txt">
                <span class="text-slate-500 text-xs font-light md:text-sm">Last Name</span>
                <p class="text-slate-900 text-sm font-normal md:text-lg">{{studentView.profile.last_name}}</p>
            </span>

            <span class="txt">
                <span class="text-slate-500 text-xs font-light md:text-sm">Other Name</span>
                <p class="text-slate-900 text-sm font-normal md:text-lg">{{studentView.profile.other_name}}</p>
            </span>

            <span class="txt">
                <span class="text-slate-500 text-xs font-light md:text-sm">Department</span>
                <p class="text-slate-900 text-sm font-normal md:text-lg">{{studentView.department}}</p>
            </span>

            <span class="txt">
                <span class="text-slate-500 text-xs font-light md:text-sm">Class</span>
                <p class="text-slate-900 text-sm font-normal md:text-lg">{{studentView.level}}</p>
            </span>

            <span class="txt">
                <span class="text-slate-500 text-xs font-light md:text-sm">Reg No</span>
                <p class="text-slate-900 text-sm font-normal md:text-lg">{{studentView.reg_no}}</p>
            </span>                

            <span class="txt">
                <span class="text-slate-500 text-xs font-light md:text-sm">Address</span>
                <p class="text-slate-900 text-sm font-normal md:text-lg">{{studentView.profile.state}}, {{studentView.profile.country}}</p>
            </span>

            <span class="txt">
                <span class="text-slate-500 text-xs font-light md:text-sm">Parent/Guardian</span>
                <p class="text-slate-900 text-sm font-normal md:text-lg">{{studentView.parent}}</p>
            </span>

            <span class="txt">
                <span class="text-slate-500 text-xs font-light md:text-sm">Phone(s)</span>
                <p class="text-slate-900 text-sm font-normal md:text-lg">{{studentView.profile.phone_1}}, {{studentView.profile.phone_2}}</p>
            </span>

            <span class="txt col-span-full">
                <span class="text-slate-500 text-xs font-light md:text-sm">About Me</span>
                <p class="text-slate-900 text-sm font-normal md:text-lg">
                    {{studentView.profile.about}}
                </p>
            </span>

        </div>

        <!-- students observation link -->
        <span class="flex items-center">
            <router-link :to="{name: 'studentobservation'}" class="group flex items-center text-blue-500 font-light gap-1 hover:text-blue-600 md:gap-2">
                <p class="text-base font-bold">Observations</p>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current group-hover:animate-bounce-h" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </router-link>
        </span>

    </div>
    
</template>

<script>
import { mapState } from 'vuex';
import gsap from "gsap";

export default {
    name: "AppStudentData",
    computed: {
        ...mapState({
            studentView: state => state.studentView,
        })
    },
    methods: {
        animStudent() {
            const txt = document.getElementsByClassName("txt");
            gsap.from(txt, {duration: 0.3, x: 10, opacity: 0, stagger: 0.1})
        }
    },
    mounted() {
        this.$nextTick(function() {
            this.animStudent();
        })
    }
}
</script>