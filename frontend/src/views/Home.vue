<template>
  <div class="h-screen w-screen flex flex-col justify-center items-center border-8 border-blue-500">
    <p class="text-4xl text-black mb-2">Welcome</p>
    <router-link :to="{name: 'staff'}" class="text-blue-400 font-bold">Staff</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
}
</script>
