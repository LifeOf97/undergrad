<template>
    <div class="w-full h-full">

        <!-- start of staff id -->
        <div class="flex flex-col pt-3 xl:p-0">
            <AppStaffId class="xl:fixed top-10 right-16" />
            <AppStaffGreet class="mt-10 mb-4 xl:mt-14" />
            
            <div class="w-full flex flex-col xl:flex-row xl:space-x-4">

                <!-- main left -->
                <div class="w-full flex flex-col xl:w-8/12">
                    <AppStaffDashBoardHeader />

                    <div class="flex flex-col space-y-5 my-10">
                        <h1 class="text-xl text-blueGray-900 font-medium">Questionnaires</h1>

                        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <AppStaffQuestion v-for="n in [1,2,3,4]" :key="n" />
                        </div>
                    </div>
                </div>
                <!-- main left -->

                <!-- start of main right. static -->
                <div class="w-full flex flex-col text-2xl font-black p-2 xl:fixed xl:top-44 xl:right-8 xl:w-3/12">

                    <div class="flex flex-col space-y-6">
                        <span class="flex flex-col items-start leading-3">
                            <p class="text-sm text-blueGray-900 font-normal">Sunday</p>
                            <p class="text-lg text-blueGray-900 font-medium">December 5, 2021</p>
                        </span>

                        <AppCalendar />

                    </div>
                </div>
                <!-- end of main right. static -->

            </div>

        </div>
        <!-- end of staff id -->
        
    </div>
</template>

<script>
import AppCalendar from "./AppCalendar.vue";
import AppStaffId from "./AppStaffId.vue";
import AppStaffGreet from "./AppStaffGreet.vue";
import AppStaffQuestion from "./AppStaffQuestion.vue";
import AppStaffDashBoardHeader from "./AppStaffDashBoardHeader.vue";

export default {
    name: "AppStaffDashBoard",
    components: {
        AppStaffId, AppStaffGreet, AppStaffDashBoardHeader, AppStaffQuestion,
        AppCalendar,
    },
}
</script>