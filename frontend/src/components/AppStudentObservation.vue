<template>
    <div class="flex flex-col gap-4">

        <div class="w-full flex flex-col gap-6 mt-5 md:w-8/12">

            <div class="flex justify-between items-center">
                <h2 class="text-2xl text-slate-900 font-bold">Observations</h2>

                <button @click.prevent="actionUpdateOform({state: true})" class="flex items-center justify-between gap-2 border border-slate-500 rounded-md p-2 group hover:border-slate-900">
                    <span class="text-xs text-slate-500 font-medium group-hover:text-slate-900">New</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 fill-current group-hover:text-green-600" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>

            <!-- observations -->
            <div class="flex flex-col gap-4">
                <details v-for="n in [1,2,3,4,5]" :key="n" class="flex flex-col gap-4 bg-slate-50 rounded-md p-4 shadow open:shadow-lg hover:shadow-lg">
                    <summary class="flex items-center gap-4 cursor-pointer">
                        <span class="shrink-0 text-xs text-slate-900 font-semibold">Nov 12, 2021</span>
                        <span class="max-w-[80%] text-sm text-slate-500 font-normal truncate">This is an example of an observation made on a student by a staff</span>
                    </summary>

                    <span class="flex flex-col gap-8 mt-4 ml-5">
                        <p class="text-slate-500 text-sm font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus
                            venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent
                            elementum facilisis leo, vel  Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                            aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus
                            dolor purus non enim praesent elementum facilisis leo, vel  Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna
                            fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo,
                            vel  Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet
                        </p>
                    </span>

                </details>
            </div>

            <span class="flex items-center justify-start">
                <router-link :to="{name: 'studentdata'}" class="group flex items-center text-blue-500 font-light gap-1 hover:text-blue-600 md:gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current group-hover:animate-bounce-h" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    <p class="text-xs md:text-base">Details</p>
                </router-link>
            </span>
        
        </div>

        <teleport to='body'>
            <div v-if="oform" class="w-screen h-screen absolute top-0 left-0 flex justify-center items-center bg-slate-500/50 backdrop-blur z-50">
                <AppObservationForm />
            </div>
        </teleport>

    </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import AppObservationForm from "./AppObservationForm.vue";

export default {
    name: "AppStudentsDataObservation",
    components: {AppObservationForm,},
    computed: {
        ...mapState({
            oform: state => state.oform,
        }),
    },
    methods: {
        ...mapActions([
            "actionUpdateOform",
        ]),
    },
}
</script>