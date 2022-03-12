<template>
    <div>

        <div class="flex flex-col bg-slate-50 rounded-md overflow-hidden shadow-md group transition-all duration-300 hover:shadow-xl">
            
            <div class="overflow-hidden">
                <img v-if="student.profile.image" :src="student.profile.image" class="w-full aspect-[1/1] object-center object-cover transition-all duration-1000 group-hover:scale-125">
                <div v-else class="w-full aspect-[1/1] flex items-center justify-center bg-rose-500 transition-all duration-1000 group-hover:scale-125">
                    <span class="text-xl text-slate-50 font-bold capitalize">{{student.sid}}</span>
                </div>
            </div>

            <div class="flex flex-col gap-2 p-2 md:p-4">
                <!-- student name -->
                <span>
                    <router-link @click.prevent="actionUpdateStudentView({data: student})" :to="{name: 'details', params: {regNo: student.reg_no}}" class="text-sm text-slate-800 font-bold hover:text-blue-500 md:text-base">
                        {{student.profile.first_name}} {{student.profile.other_name}} {{student.profile.last_name}}
                    </router-link>
                </span>

                <div class="flex flex-col gap-2 text-xs text-slate-500 font-medium">
                    <!-- department -->
                    <span class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-rose-500 stroke-current" viewBox="0 0 24 24" fill="none">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                        <p class="capitalize">{{student.department}}</p>
                    </span>

                    <!-- class/level -->
                    <span class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-rose-500 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p class="capitalize">{{student.level}}</p>
                    </span>

                    <!-- reg number -->
                    <span class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-rose-500 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                        <p>{{student.reg_no}}</p>
                    </span>
                </div>

                <!-- student view link -->
                <span class="flex items-center justify-end">
                    <router-link @click.prevent="actionUpdateStudentView({data: student})" :to="{name: 'details', params: {regNo: student.reg_no}}" class="flex items-center text-xs text-blue-500 font-normal gap-1 hover:text-blue-600 md:text-sm md:gap-2">
                        View
                    </router-link>
                </span>

            </div>


        </div>
        
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: "AppStudentCard",
    props: {
        student: {type: Object, required: false},
    },
    methods: {
        ...mapActions([
            "actionUpdateStudentView",
        ]),
    },
}
</script>