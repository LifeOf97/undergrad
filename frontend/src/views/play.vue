<template>
    <div class="w-screen h-screen border-8 border-slate-500 flex justify-center items-center">

        <div>

            <label for="male" :class="checked ? 'bg-green-500 text-white':'bg-slate-100 text-slate-500'" class="flex items-center justify-center space-x-2 rounded-lg border border-transparent p-2 cursor-pointer transition-all duration-200 hover:border-green-500">
                <p>Male</p>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 stroke-current" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
            </label>

            <input type="checkbox" name="male" id="male" v-model="checked" class="hidden">

        </div>
        
    </div>
</template>

<script>
export default {
    name: "play",
    data() {
        return {
            checked: false,
        }
    }
}
</script>