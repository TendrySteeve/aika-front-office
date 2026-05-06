<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { PencilSquareIcon, TrashIcon, PrinterIcon } from '@heroicons/vue/24/outline'

defineProps<{
  editTo?: RouteLocationRaw
  editLabel?: string
  printTo?: RouteLocationRaw
  printLabel?: string
  deleteLabel?: string
}>()

const emit = defineEmits<{
  edit: []
  print: []
  delete: []
}>()
</script>

<template>
  <div class="flex items-center justify-center gap-2">
    <RouterLink
      v-if="editTo"
      :to="editTo"
      class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100"
      :title="editLabel || 'Modifier'"
      :aria-label="editLabel || 'Modifier'"
    >
      <PencilSquareIcon class="h-4.5 w-4.5" />
    </RouterLink>
    <button
      v-else
      type="button"
      @click="emit('edit')"
      class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100"
      :title="editLabel || 'Modifier'"
      :aria-label="editLabel || 'Modifier'"
    >
      <PencilSquareIcon class="h-4.5 w-4.5" />
    </button>

    <RouterLink
      v-if="printTo"
      :to="printTo"
      class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600 transition-colors hover:bg-green-100"
      :title="printLabel || 'Imprimer'"
      :aria-label="printLabel || 'Imprimer'"
    >
      <PrinterIcon class="h-4.5 w-4.5" />
    </RouterLink>

    <button
      type="button"
      @click="emit('delete')"
      class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition-colors hover:bg-red-100"
      :title="deleteLabel || 'Supprimer'"
      :aria-label="deleteLabel || 'Supprimer'"
    >
      <TrashIcon class="h-4.5 w-4.5" />
    </button>
  </div>
</template>
