<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import BackLink from '@/components/UI/BackLink.vue'

withDefaults(
  defineProps<{
    backTo: RouteLocationRaw
    title: string
    subtitle?: string
    maxWidthClass?: string
  }>(),
  {
    subtitle: '',
    maxWidthClass: 'max-w-4xl',
  },
)
</script>

<template>
  <div :class="['mx-auto space-y-8 py-10', maxWidthClass]">
    <div class="flex items-center gap-6">
      <BackLink :to="backTo" />
      <div>
        <h1 class="text-3xl font-black uppercase tracking-tight text-slate-800">{{ title }}</h1>
        <p v-if="subtitle" class="mt-2 text-sm text-slate-500">{{ subtitle }}</p>
      </div>
    </div>

    <div class="rounded-[3rem] border border-slate-100 bg-white p-10 shadow-xl shadow-slate-200/40">
      <slot />
    </div>
  </div>
</template>
