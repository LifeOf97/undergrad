<template>
  <div class="relative h-screen w-screen flex flex-col bg-no-repeat bg-cover bg-center selection:bg-rose-500 selection:text-slate-50 md:bg-left" :style="{backgroundImage: `url(${require(`@/assets/images/ben-white-83tkHLPgg2Q-unsplash.jpg`).default})`}">

    <!-- absolute div background gradiant color -->
    <div class="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-slate-100 via-slate-100/70 to-slate-100/0"></div>

    <div class="w-11/12 mx-auto flex items-center justify-between bg-transparent py-6 z-10 md:py-8 md:w-10/12">
      <AppTextLogo :color="'rose'" />
      <router-link :to="{name: 'signin'}" class="text-sm text-slate-50 font-bold rounded-md py-2 px-4 tracking-wide transition-all duration-200 bg-rose-500 hover:scale-105 hover:bg-rose-600 hover:shadow-lg">Sign in</router-link>
    </div>

    <!-- hero text -->
    <div class="w-11/12 h-full flex items-center mx-auto z-10 md:w-10/12">
      <div class="flex flex-col gap-1">
        <span class="text-xs text-slate-400 font-bold lg:text-base">Career Guidance</span>
        <span class="text-3xl text-slate-900 font-black capitalize lg:text-6xl">Help the younger one's<br>decide their <code class="text-rose-500">career</code> path</span>

        <p class="text-sm text-slate-500 font-normal">
          As teachers, parents and guardians, children look up to us<br>for direction. We should not outrightly decide their path,<br>but help them in deciding their career path.
        </p>

        <span class="mt-7">
          <span class="flex">
            <router-link :to="{name: 'signin'}" class="text-base text-slate-50 font-bold rounded-md py-3 px-16 tracking-wide transition-all duration-200 bg-rose-500 hover:scale-105 hover:bg-rose-600 hover:shadow-lg">Sign in</router-link>
          </span>
        </span>

      </div>
    </div>


    <!-- <router-link :to="{name: 'staff'}" class="text-blue-400 font-bold">Staff</router-link> -->

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
import AppTextLogo from "@/components/AppTextLogo.vue";

export default {
  name: 'Home',
  components: {AppTextLogo},
  data() {
    return {
      date: "",
      src: require("@/assets/images/ben-white-83tkHLPgg2Q-unsplash.jpg").default,
    }
  },
  methods: {
    getDate(value) {
      console.log(value);
    }
  }
}
</script>
