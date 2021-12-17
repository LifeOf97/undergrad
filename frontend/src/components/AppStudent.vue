<template>
    <div class="w-full h-full bg-white selection:bg-rose-500 selection:text-slate-50">

        <div class="flex flex-col gap-4 mt-10 md:mt-16">
            <h1 class="text-slate-900 text-2xl font-bold md:text-4xl">My Students</h1>

            <div class="grid grid-cols-2 gap-x-4 gap-y-8 my-5 md:grid-cols-3 xl:grid-cols-4">
                <AppStudentCard v-for="n in [1,2,3,4,5,6,7,8,9,10]" :key="n" />
            </div>

        </div>


    </div>
</template>

<script>
import AppStudentCard from "./AppStudentCard";

export default {
    name: "AppStudent",
    components: {AppStudentCard,},
}
</script>