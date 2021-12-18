<template>
    <div class="flex flex-col font-black text-lg leading-4">
        <p :class="color == 'rose' ? 'text-rose-500':'text-white'">CAREER</p>
        <p class="text-slate-700">GUIDANCE</p>
    </div>
</template>

<script>
export default {
    name: "AppTextLogo",
    props: {
        color: {type: String, requireds: false, default: "rose"},
    }
}
</script>