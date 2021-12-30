<template>
    <div class="selection:bg-rose-500 selection:text-slate-50">

        <div class="flex flex-col gap-4 mt-16">

            <div class="flex flex-col items-center space-y-2 md:items-start">
                <div class="flex items-start justify-center md:justify-start">
                    <img v-if="studentView.profile.image" :src="studentView.profile.image" class="w-60 aspect-[1/1] object-cover rounded-lg shadow">
                    <div v-else class="w-60 aspect-[1/1] flex flex-wrap items-center justify-center bg-rose-500 rounded-lg transition-all duration-1000 group-hover:scale-125">
                        <span class="text-base text-slate-50 font-bold capitalize">{{studentView.sid}}</span>
                    </div>
                </div>
                <span class="text-sm text-slate-900 font-black md:text-base">{{studentView.profile.first_name}} {{studentView.profile.other_name}} {{studentView.profile.last_name}}</span>
            </div>

            <router-view v-slot="{Component}">
                <component :is='Component'></component>
            </router-view>
            
        </div>
        
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "AppStudentsData",
    props: {
        regNo: {type: String, required: false},
    },
    computed: {
        ...mapState({
            studentView: state => state.studentView,
        })
    }
}
</script>