<template>
    <div class="w-screen h-screen flex bg-rose-500 selection:text-slate-50 selection:bg-rose-500">

        <div class="relative w-full h-full flex flex-col items-center justify-center bg-white lg:w-1/2">

            <router-link :to="{name: 'home'}" class="absolute top-3 right-5 group flex items-center text-blue-500 font-light gap-1 hover:text-blue-600 md:gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current group-hover:animate-bounce-h" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                <p class="text-xs md:text-base">Home</p>
            </router-link>

            <div class="w-9/12 mx-auto flex flex-col gap-7 md:w-7/12">

                <span class="flex flex-col items-center justify-center gap-3">
                    <AppTextLogo :color="'rose'" />
                    <span>
                        <p class="text-slate-800 text-2xl font-black tracking-wide">Sign in to your account </p>
                    </span>
                </span>

                <form class="w-full flex flex-col gap-5">
                    <AppInputField :type="'text'" :label="'Staff ID'" :color="'rose'" :labelColor="'black'" />
                    <AppInputField v-model="pass" :type="'password'" :label="'password'" :color="'rose'" :labelColor="'black'" />

                    <span class="flex justify-between items-center">
                        <span class="flex gap-1">
                            <input type="checkbox" name="remember" id="remember" class="cursor-pointer accent-rose-500">
                            <label for="remember" class="text-slate-500 text-xs font-normal cursor-pointer">Remember me</label>
                        </span>

                        <button @click.prevent class="text-sm font-medium text-blue-500 hover:text-blue-600">
                            Forgot your password?
                        </button>
                    </span>

                    <AppButton :name="'Sign in'" :color="'rose'" />

                </form>
                
            </div>

        </div>


        <div class="w-1/2 h-full bg-transparent hidden lg:block">
            <img :src="story" class="w-full h-full object-cover" />
        </div>
    
    </div>
</template>

<script>
import AppTextLogo from "@/components/AppTextLogo.vue";
import AppInputField from "@/components/AppInputField.vue";
import AppButton from "@/components/AppButton.vue";

export default {
    name: "Signin",
    components: {AppTextLogo, AppInputField, AppButton},
    data() {
        return {
            pass: "",
            story: require("@/assets/images/amol-tyagi-0juktkOTkpU-unsplash.jpg").default,
        }
    }
}
</script>