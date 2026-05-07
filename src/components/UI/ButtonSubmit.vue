<script setup lang="ts">
withDefaults(
    defineProps<{
        loading?: boolean
        submitLabel: string
    }>(),
    {
        loading: false,
    },
)
</script>
<template>
    <button type="submit" :disabled="loading"
        class="w-full flex justify-center px-6 py-3 rounded-2xl bg-blue-600 text-white border border-blue-500 hover:bg-blue-700 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-100 transition-all duration-300">
        <span v-if="!loading">{{ submitLabel }}</span>
        <div v-else class="w-4 h-4 rounded-full border-s-white border-s-2 animate-spin"></div>
    </button>
</template>