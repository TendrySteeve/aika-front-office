<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

defineProps<{
  to: RouteLocationRaw
}>()
</script>

<template>
  <RouterLink
    :to="to"
    class="group flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-400 transition-all duration-300 hover:border-blue-100 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-50"
    aria-label="Retour"
  >
    <ArrowLeftIcon class="h-5 w-5 transition-transform group-hover:-translate-x-1" />
  </RouterLink>
</template>
