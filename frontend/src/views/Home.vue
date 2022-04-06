<template>
  <div class="relative h-screen w-screen min-h-[44rem] flex flex-col bg-no-repeat bg-cover bg-center selection:bg-rose-500 selection:text-slate-50 md:bg-left" :style="{backgroundImage: `url(${require(`@/assets/images/ben-white-83tkHLPgg2Q-unsplash.jpg`).default})`}">

    <!-- absolute div background gradiant color -->
    <div class="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-slate-100 via-slate-100/70 to-slate-100/0"></div>

    <!-- start of top nav -->
    <AppTopNav ref="topnav" />
    <!-- end of top nav -->

    <!-- hero text -->
    <div class="w-11/12 h-full flex items-center mx-auto z-10 md:w-10/12">
      <div class="flex flex-col gap-1">
        <span ref="txt1" class="text-xs text-slate-400 font-black uppercase md:text-sm">Career Guidance</span>
        <span ref="hero" class="text-3xl text-slate-700 font-black capitalize lg:text-6xl">Help the younger one's<br>decide their <code class="text-rose-500">career</code> path</span>

        <p ref="txt2" class="text-sm text-slate-500 font-normal">
          As teachers, parents and guardians, children look up to us<br>for direction. We should not outrightly decide their path,<br>but help them in deciding their career path.
        </p>

        <span class="mt-7">
          <span class="flex" ref="btn">
            <router-link v-if="getAuthToken" :to="getAuthUser == 'staff' ? {name: 'staff', params: {staffId: staffData.staff_id}}:{name: 'student', params: {department: studentData.department, level: studentData.level, regNo: studentData.reg_no}}" class="text-base text-slate-50 font-bold rounded-md py-3 px-16 tracking-wide transition-all duration-200 bg-rose-500 hover:scale-105 hover:bg-rose-600 hover:shadow-lg">Dashboard</router-link>
            <router-link v-else :to="{name: 'signin'}" class="text-base text-slate-50 font-bold rounded-md py-3 px-16 tracking-wide transition-all duration-200 bg-rose-500 hover:scale-105 hover:bg-rose-600 hover:shadow-lg">Sign in</router-link>
          </span>
        </span>

      </div>
    </div>



    <!-- credits -->
    <span class="absolute bottom-3 right-10 text-slate-50 text-xs font-medium flex gap-1 z-10">
      <p>Photo by</p>
      <a class="underline decoration-2 decoration-blue-600 cursor-pointer" target="_blank" href="https://unsplash.com/@benwhitephotography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ben White</a>
      <p>on</p>
      <a class="underline decoration-2 decoration-blue-600 cursor-pointer" target="_blank" href="https://unsplash.com/s/photos/haiti-students?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
    </span>
  
  </div>
</template>

<script>
import AppTopNav from "@/components/AppTopNav.vue";
import { mapActions, mapState } from 'vuex';
import Cookies from "js-cookie";
import gsap from "gsap";

export default {
  name: 'Home',
  components: {AppTopNav},
  data() {
    return {
      src: require("@/assets/images/ben-white-83tkHLPgg2Q-unsplash.jpg").default,
    }
  },
  computed: {
    ...mapState({
      staffData: state => state.staffData,
      studentData: state => state.studentData,
    }),
    getAuthToken() {
      return Cookies.get("authToken")
    },
    getAuthUser() {
      if (Cookies.get("authUser").startsWith("STF")) return "staff"
      else return "student" 
    },
  },
  methods: {
    ...mapActions([
      "actionFetchStaffData",
      "actionFetchStudentData"
    ]),
    animHome() {
      // method to apply gsap animation to contents
      // txt1,txt2,hero,btn
      const {topnav, hero, txt2, txt1, btn} = this.$refs;
      const tl = gsap.timeline()
      tl.from([hero, txt2], {duration: 0.5, y: 50, opacity: 0, stagger: 0.5, delay: 0.5})
        .from(txt1, {duration: 0.5, y: -50, opacity: 0})
        .from(btn, {duration: 0.5, y: 50, opacity: 0}, "-=0.5")
        .from(topnav.$el, {duration: 0.5, y: -50, opacity: 0})
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.animHome();

      if (Cookies.get("authToken")) {
        if (Cookies.get("authUser").startsWith("STF")) this.actionFetchStaffData({username: Cookies.get("authUser")})
        else this.actionFetchStudentData()
      }
    })
  },
}
</script>