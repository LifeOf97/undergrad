<template>
    <!-- <div :class="[position == 'start' ? 'items-start':'items-center', text == 'base' ? 'text-base leading-4':'text-xs leading-3']" class="flex flex-col font-black bg-clip-text text-transparent bg-gradient-to-br from-purple-800 to-rose-500"> -->
    <div :class="[position == 'start' ? 'items-start':'items-center', text == 'base' ? 'text-base leading-4':'text-xs leading-3']" class="flex flex-col font-black">
        <p class="text-rose-500">WEB-BASED CAREER</p>
        <p class="text-slate-900">GUIDANCE INFORMATION</p>
        <p class="text-slate-900">MANAGEMENT SYSTEM</p>
    </div>
</template>

<script>
export default {
    name: "AppTextLogo",
    props: {
        position: {type: String, required: false, default: "start"},
        text: {type: String, required: false, default: "base"},
    }
}
</script>