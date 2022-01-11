<template>
    <div class="w-full h-full bg-white selection:bg-rose-500 selection:text-slate-50">

        <div class="flex flex-col gap-4 mt-10 md:mt-16">
            <h1 class="text-slate-900 text-2xl font-bold md:text-4xl">My Students</h1>

            <div class="grid grid-cols-2 gap-x-4 gap-y-8 my-5 md:grid-cols-3 xl:grid-cols-4">
                <transition-group
                    name="slide"
                    enter-from-class="-translate-x-20 opacity-0"
                    enter-active-class="transition-all duration-500"
                    leave-to-class="-translate-x-20 opacity-0"
                    leave-active-class="transition-all duration-500">
                    <AppStudentCard v-for="student in students.data" :key="student.id" :student="student" />
                </transition-group>
            </div>

        </div>


    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppStudentCard from "./AppStudentCard";

export default {
    name: "AppStudent",
    components: {AppStudentCard,},
    computed: {
        ...mapState({
            students: state => state.students,
        }),
    },
    methods: {
        ...mapActions([
            "actionFetchStudents",
        ]),
    },
    mounted() {
        this.$nextTick(function() {
            this.actionFetchStudents();
        })
    },
}
</script>