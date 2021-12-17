<template>
    <div class="flex flex-col gap-4">

        <!-- students data -->
        <div class="grid grid-cols-3 gap-x-2 gap-y-6 p-4">

            <span>
                <span class="text-slate-500 text-xs font-light md:text-sm">First Name</span>
                <p class="text-slate-900 text-sm font-normal md:text-lg">Kelvin</p>
            </span>

            <span>
                <span class="text-slate-500 text-xs font-light md:text-sm">Last Name</span>
                <p class="text-slate-900 text-sm font-normal md:text-lg">Mayowa</p>
            </span>

            <span>
                <span class="text-slate-500 text-xs font-light md:text-sm">Other Name</span>
                <p class="text-slate-900 text-sm font-normal md:text-lg">Ayeni</p>
            </span>

            <span>
                <span class="text-slate-500 text-xs font-light md:text-sm">Department</span>
                <p class="text-slate-900 text-sm font-normal md:text-lg">Science</p>
            </span>

            <span>
                <span class="text-slate-500 text-xs font-light md:text-sm">Class</span>
                <p class="text-slate-900 text-sm font-normal md:text-lg">SS3 - A</p>
            </span>

            <span>
                <span class="text-slate-500 text-xs font-light md:text-sm">Reg No</span>
                <p class="text-slate-900 text-sm font-normal md:text-lg">1234</p>
            </span>                

            <span>
                <span class="text-slate-500 text-xs font-light md:text-sm">Address</span>
                <p class="text-slate-900 text-sm font-normal md:text-lg">Shagari, overhead tank</p>
            </span>

            <span>
                <span class="text-slate-500 text-xs font-light md:text-sm">Parent/Guardian</span>
                <p class="text-slate-900 text-sm font-normal md:text-lg">Mrs Felicai Ayeni</p>
            </span>

            <span>
                <span class="text-slate-500 text-xs font-light md:text-sm">Phone(s)</span>
                <p class="text-slate-900 text-sm font-normal md:text-lg">+234 8065035596</p>
            </span>

            <span class=" col-span-full">
                <span class="text-slate-500 text-xs font-light md:text-sm">About Me</span>
                <p class="text-slate-900 text-sm font-normal md:text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
                    purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor
                    rhoncus dolor purus non enim praesent elementum facilisis leo, vel
                    fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis
                    enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra
                </p>
            </span>

        </div>

        <!-- students observation link -->
        <span class="flex items-center justify-end">
            <router-link :to="{name: 'studentobservation'}" class="group flex items-center text-blue-500 font-light gap-1 hover:text-blue-600 md:gap-2">
                <p class="text-xs md:text-base">Observations</p>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current group-hover:animate-bounce-h" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </router-link>
        </span>

    </div>
    
</template>

<script>
export default {
    name: "AppStudentData",
}
</script>