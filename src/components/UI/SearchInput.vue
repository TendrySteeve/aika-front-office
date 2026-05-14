<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const model = defineModel<string>({ required: true })

withDefaults(
  defineProps<{
    placeholder?: string
  }>(),
  {
    placeholder: 'Rechercher...',
  },
)
</script>

<template>
  <div class="relative flex-1">
    <MagnifyingGlassIcon class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
    <input
      v-model="model"
      type="text"
      :placeholder="placeholder"
      class="w-full rounded-xl border-none bg-slate-50 py-3 pl-12 pr-4 text-sm font-bold text-slate-700 outline-none transition-all focus:ring-2 focus:ring-blue-500/20"
    />
  </div>
</template>
