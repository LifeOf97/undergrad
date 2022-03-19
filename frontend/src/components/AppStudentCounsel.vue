<template>
    <div class="w-full h-full mt-14">

        <div class="w-full flex flex-col gap-4 lg:w-1/2">
            <div class="w-full p-2 bg-rose-500">
                <p class="text-2xl text-white text-center font-bold md:text-4xl">My Counsel</p>
            </div>

            <div class="flex flex-col gap-10 p-10">
                <span class="flex gap-5">
                    <p class="text-sm text-slate-900 font-medium md:text-lg">My Interest:</p>
                    <p class="text-base text-slate-700">{{ studentCounsel.interest }}</p>
                </span>

                <span class="flex gap-5">
                    <p class="text-sm text-slate-900 font-medium md:text-lg">Performs better in:</p>
                    <p class="text-base text-slate-700">{{ studentCounsel.better_perf }}</p>
                </span>

                <span class="flex gap-5">
                    <p class="text-sm text-slate-900 font-medium md:text-lg">Best subject:</p>
                    <p class="text-base text-slate-700">{{ studentCounsel.best_sub }}</p>
                </span>

                <span class="flex gap-5">
                    <p class="text-sm text-slate-900 font-medium md:text-lg">Desired profession:</p>
                    <p class="text-base text-slate-700">{{ studentCounsel.desired_prof }}</p>
                </span>

                <span class="flex gap-5">
                    <p class="text-sm text-slate-900 font-medium md:text-lg">Counsel:</p>
                    <p class="text-base text-slate-700">{{ studentCounsel.counselling }}</p>
                </span>

            </div>
        </div>

    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "AppStudentCounsel",
    computed: {
        ...mapState({
            studentCounsel: state => state.studentCounsel,
        })
    }
}
</script>