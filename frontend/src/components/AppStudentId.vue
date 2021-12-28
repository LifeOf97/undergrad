<template>
    <div class="">

        <!-- start of student name/id -->
        <div class="flex items-center">
            <div class="">
                <!-- <img :src="" alt="Staff avatar" class="w-10 h-10 rounded-full object-cover object-top mr-2 border border-red-50"> -->
                <div class="w-8 h-8 flex items-center justify-center rounded-full bg-rose-500 ring-2 ring-rose-500 ring-offset-4 ring-offset-rose-200 mr-3">
                    <p class="capitalize font-black text-2xl text-slate-50">K</p>
                </div>
            </div>

            <div class="flex flex-col">
                <h3 class="max-w-[10rem] text-slate-900 text-sm font-semibold truncate">Kelvin A. Mayowa</h3>
                <p class="text-slate-500 text-xs">REG NO: 1234</p>
            </div>
        </div>
        <!-- start of staff name/id -->

    </div>
</template>

<script>
export default {
    name: "AppStudentId",
    data() {
        return {
            src: require("@/assets/images/ben-white-83tkHLPgg2Q-unsplash.jpg").default,
        }
    }
}
</script>