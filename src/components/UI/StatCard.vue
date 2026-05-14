<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    value: string | number
    valueClass?: string
  }>(),
  {
    valueClass: 'text-slate-900',
  },
)
</script>

<template>
  <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">{{ label }}</p>
    <p class="mt-3 text-3xl font-black" :class="valueClass">{{ value }}</p>
  </div>
</template>
