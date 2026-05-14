<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div>
      <h1 class="text-3xl font-black uppercase tracking-tight text-slate-900 md:text-4xl">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="mt-2 text-sm text-slate-500">{{ subtitle }}</p>
    </div>

    <slot name="action" />
  </div>
</template>
