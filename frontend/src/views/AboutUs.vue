<template>
    <div class="w-full h-full border">


        <div class="w-full h-full flex flex-col gap-10">

            <!-- start of top nav -->
            <AppTopNav />
            <!-- end of top nav -->

            <div class="w-10/12 mx-auto h-full flex flex-col gap-10 pb-20">

                <div class="border-b-2 border-rose-500">
                    <h1 class="text-3xl font-black text-rose-500 md:text-5xl">About Us</h1>
                </div>

                <div class="flex flex-col gap-7 justify-between lg:flex-row">
                    <div class="w-full flex flex-col gap-1 lg:w-1/3">
                        <h3 class="text-lg text-slate-800 font-bold md:text-3xl">Mission</h3>
                        <p class="text-sm text-slate-600 font-light md:text-lg">
                            The mission of this group is to research and come up with a web-based system where secondary school counsellors
                            can make use of the new system and give accurate and effective guidance to pupils of the school. Also this new sytem
                            will facilitate the storing, retrieving, and manipulation of data required to give effective career guidance to the student. 
                        </p>
                    </div>
                    <div class="w-full flex flex-col gap-1 lg:w-2/3">
                        <h3 class="text-lg text-slate-800 font-bold md:text-3xl">Web-CGIMS</h3>
                        <p class="text-sm text-slate-600 font-light md:text-lg">
                            The presence of counsellors in school is not just for the sake of it, they are there to direct student on areas they psychologically
                            find them fit. The job of counselling towards a future career is not an easy one, the student has to be followed regularly within
                            attitude and academic performance so that he/she will be directed towards his/her gift career. This project work researched into 
                            the procedure involved  in  guiding and counselling student in secondary schools with a view to come up with the modernized
                            system that would help in carrying out these activities effectively. The problems associated with the existing system were detected
                            and possible solutions to the problem were provided in the new system. The new system is a web-based one, which works automatically;
                            it is very easy to use, it is also interactive, and cost effective. The new system is comprehensive enough, timely and accurate in report generation.
                        </p>
                    </div>
                </div>

                <div class="flex flex-col gap-5">

                    <div>
                        <h3 class="text-2xl font-black underline underline-offset-2 italic text-rose-500 md:text-2xl">Meet The Team</h3>
                    </div>

                    <div class="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">

                        <div class="flex flex-col gap-5">
                            <div class="w-full h-72 border bg-rose-500 rounded-lg overflow-hidden">
                                <!-- <img :src="mayo" class="w-full h-full"> -->
                            </div>
                            <div class="flex flex-col gap-1">
                                <p class="text-base text-slate-700"><code class="font-bold text-slate-900">Name:</code> Kelvin Mayowa Ayeni</p>
                                <p class="text-base text-slate-700"><code class="font-bold text-slate-900">Matric Number:</code> FPN/S05/2019/2020/CMP/1336</p>
                                <p class="text-base text-slate-700"><code class="font-bold text-slate-900">School Of:</code> Information Technology</p>
                                <p class="text-base text-slate-700"><code class="font-bold text-slate-900">Department Of:</code> Computer Science</p>
                                <p class="text-base text-slate-700"><code class="font-bold text-slate-900">Year:</code> HND II</p>
                            </div>
                        </div>

                        <div class="flex flex-col gap-5">
                            <div class="w-full h-72 border bg-rose-500 rounded-lg overflow-hidden">
                            </div>
                            <div class="flex flex-col gap-1">
                                <p class="text-base text-slate-700"><code class="font-bold text-slate-900">Name:</code> Jeremiah Ode</p>
                                <p class="text-base text-slate-700"><code class="font-bold text-slate-900">Matric Number:</code> FPN/S05/2019/2020/CMP/1341</p>
                                <p class="text-base text-slate-700"><code class="font-bold text-slate-900">School Of:</code> Information Technology</p>
                                <p class="text-base text-slate-700"><code class="font-bold text-slate-900">Department Of:</code> Computer Science</p>
                                <p class="text-base text-slate-700"><code class="font-bold text-slate-900">Year:</code> HND II</p>
                            </div>
                        </div>

                        <div class="flex flex-col gap-5">
                            <div class="w-full h-72 border bg-rose-500 rounded-lg overflow-hidden">
                            </div>
                            <div class="flex flex-col gap-1">
                                <p class="text-base text-slate-700"><code class="font-bold text-slate-900">Name:</code> Judith Omojo Ikah</p>
                                <p class="text-base text-slate-700"><code class="font-bold text-slate-900">Matric Number:</code> FPN/S05/2019/2020/CMP/1358</p>
                                <p class="text-base text-slate-700"><code class="font-bold text-slate-900">School Of:</code> Information Technology</p>
                                <p class="text-base text-slate-700"><code class="font-bold text-slate-900">Department Of:</code> Computer Science</p>
                                <p class="text-base text-slate-700"><code class="font-bold text-slate-900">Year:</code> HND II</p>
                            </div>
                        </div>                        
                    </div>

                </div>

            </div>

            <div class="w-10/12 mx-auto flex flex-col items-center justify-center p-4 gap-2 md:flex-row md:justify-between">
                <p class="text-sm text-slate-500 md:text-base">&copy; 2022 | Providence | In GOD we Trust</p>
                <div class="flex gap-5 items-center text-sm">
                    <p>API Docs:</p>
                    <a class="text-blue-400 cursor-pointer" href="https://web-cgims.herokuapp.com/api/schema/redoc/" target="_blank">Redoc</a>
                    <a class="text-blue-400 cursor-pointer" href="https://web-cgims.herokuapp.com/api/schema/swagger/" target="_blank">Swagger</a>
                </div>
            </div>


        </div>
        
    </div>
</template>

<script>
import AppTopNav from "@/components/AppTopNav.vue";

export default {
    name: "AbouUs",
    components: {AppTopNav},
    data() {
        return {
            mayo: require("@/assets/images/mayo.jpg").default,
        }
    },
}
</script>