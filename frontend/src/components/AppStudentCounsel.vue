<template>
    <div class="w-full h-full">

        <div class="w-full flex flex-col gap-6 mt-5 md:w-8/12">

            <form @submit.prevent class="flex flex-col gap-5">

                <span class="bg-rose-500 p-2 text-white col-span-full text-center text-2xl font-black mb-10 md:text-4xl">Career Counselling</span>

                <span class="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <label class="text-slate-900 text-xs font-medium md:text-base" for="name">Name of Student</label>
                    <input type="text" disabled v-model="name" title="Cannot edit this field" class="bg-slate-100 text-slate-600 text-sm font-medium bg-transparent p-2 placeholder-slate-300 rounded-md disa border-2 border-transparent hover:border-rose-500 focus:border-rose-500 focus:outline-none disabled:border-0 disabled:text-slate-400 disabled:cursor-not-allowed">
                </span>

                <span class="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <label class="text-slate-900 text-xs font-medium md:text-base" for="interest">Area of Interest</label>
                    <input type="text" v-model="interest" class="bg-slate-100 text-slate-600 text-sm font-medium bg-transparent p-2 placeholder-slate-300 rounded-md border-2 border-transparent hover:border-rose-500 focus:border-rose-500 focus:outline-none">
                </span>

                <span class="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <label class="text-slate-900 text-xs font-medium md:text-base" for="performance">Area of Better Performance</label>
                    <input type="text" v-model="betterPerf" class="bg-slate-100 text-slate-600 text-sm font-medium bg-transparent p-2 placeholder-slate-300 rounded-md border-2 border-transparent hover:border-rose-500 focus:border-rose-500 focus:outline-none">
                </span>

                <span class="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <label class="text-slate-900 text-xs font-medium md:text-base" for="profession">Desired Profession</label>
                    <input type="text" v-model="desiredProf" class="bg-slate-100 text-slate-600 text-sm font-medium bg-transparent p-2 placeholder-slate-300 rounded-md border-2 border-transparent hover:border-rose-500 focus:border-rose-500 focus:outline-none">
                </span>

                <span class="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <label class="text-slate-900 text-xs font-medium md:text-base" for="subject">Best Subject</label>
                    <input type="text" v-model="bestSub" class="bg-slate-100 text-slate-600 text-sm font-medium bg-transparent p-2 placeholder-slate-300 rounded-md border-2 border-transparent hover:border-rose-500 focus:border-rose-500 focus:outline-none">
                </span>

                <span class="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <label class="text-slate-900 text-xs font-medium md:text-base" for="counselling">Counselling</label>
                    <textarea v-model="counselling" name="counselling" id="counselling" cols="30" rows="10" class=" resize-none bg-slate-100 text-slate-600 text-sm font-medium bg-transparent p-2 placeholder-slate-300 rounded-md border-2 border-transparent hover:border-rose-500 focus:border-rose-500 focus:outline-none">

                    </textarea>
                </span>

                <!-- buttons -->
                <span class="flex justify-end mt-10">
                    <AppButton @click="submitCounsel(counsel.action)" :name="counsel.action == 'create' ? 'Create':'Update'" :loading="counsel.saving" :loadingText="counsel.action == 'create' ? 'Creating':'Updating'" />
                </span>

            </form>


            <span class="flex items-center justify-start">
                <!-- students observation -->
                <router-link :to="{name: 'studentobservation'}" class="group flex items-center text-blue-500 font-light gap-1 hover:text-blue-600 md:gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current group-hover:animate-bounce-h" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    <p class="text-base font-bold">Observation</p>
                </router-link>

            </span>


        </div>
        
    </div>
</template>

<script>
import AppButton from "@/components/AppButton.vue";
import { mapActions, mapState } from "vuex";

export default {
    name: "AppStudentResult",
    components: {AppButton,},
    data() {
        return {
            interest: "",
            betterPerf: "",
            desiredProf: "",
            bestSub: "",
            counselling: "",
        }
    },
    computed: {
        ...mapState({
            student: state => state.studentView,
            staff: state => state.staffData,
            counsel: state => state.counsel,
        }),
        name() {
            return `${this.student.profile.first_name} ${this.student.profile.last_name} ${this.student.profile.other_name}`
        }
    },
    methods: {
        ...mapActions([
            "actionCreateCounsel",
            "actionUpdateCounsel",
            "actionFetchCounsel",
        ]),
        submitCounsel(action) {
            const data = {
                staff: this.staff.staff_id,
                student: this.student.sid,
                interest: this.interest,
                better_perf: this.betterPerf,
                desired_prof: this.desiredProf,
                best_sub: this.bestSub,
                counselling: this.counselling,
            }

            // dispatch the create or update state action
            if (action == "create") this.actionCreateCounsel({data: data})
            else this.actionUpdateCounsel({data: data})
        },
        updateCounselData() {
            this.interest = this.counsel.interest;
            this.betterPerf = this.counsel.betterPerf;
            this.desiredProf = this.counsel.desiredProf;
            this.bestSub = this.counsel.bestSub;
            this.counselling = this.counsel.counselling;
        },
    },
    mounted() {
        this.$nextTick(function() {
            this.actionFetchCounsel()
            this.updateCounselData()
        })
    }
}
</script>