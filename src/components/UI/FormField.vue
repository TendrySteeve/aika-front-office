<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <div class="space-y-2">
    <label class="label">{{ label }}</label>
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.label {
  @apply text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-2;
}
</style>