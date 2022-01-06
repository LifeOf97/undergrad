<template>
  <div class="relative w-full h-full font-Roboto overflow-hidden">

    <router-view v-slot="{Component, route}">
      <transition :name="route.meta.transitionName" mode="out-in">
        <component :is='Component'></component>
      </transition>
    </router-view>

    <!-- authentication notice -->
    <transition
      name="slide-down"
      enter-from-class="-translate-y-10 opacity-100"
      enter-active-class="transition-all duration-1000"
      leave-to-class="-translate-y-10 opacity-0"
      leave-active-class="transition-all duration-1000">
        <span v-if="auth" class="absolute top-7 right-7 bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-md shadow-lg z-50">{{staffData.staff_id}} authenticated successfuly</span>
    </transition>

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "App",
  data() {
    return {
      auth: false,
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated,
      staffData: state => state.staffData,
    }),
  },
  watch: {
    isAuthenticated(newValue) {
      if (newValue == true) {
        this.auth = true
        setTimeout(() => {this.auth = false}, 3000);
      }
      else this.auth = false
    }
  }
}
</script>

<style>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  @apply transition-all duration-300

}
.slide-right-enter-from {
  @apply -translate-x-full
}
.slide-left-enter-from {
  @apply translate-x-full opacity-0
}
</style>