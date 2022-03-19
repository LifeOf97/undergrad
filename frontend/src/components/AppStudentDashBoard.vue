<template>
    <div class="w-full h-screen min-h-[40rem]">

        <div class="flex items-center justify-center">
            <p class="text-4xl font-black text-slate-900">{{ studentData.sid }}</p>
        </div>
        
    </div>
</template>

<script>
import { mapState } from "vuex";
import Cookies from "js-cookie";

export default {
    name: "AppStudentDashBoard",
    computed: {
        ...mapState({
            students: state => state.students.data,
        }),
        studentData() {
            const regNo = Cookies.get("authUser")
            return this.students.find((student) => student.sid == regNo)
        }
    }
}
</script>