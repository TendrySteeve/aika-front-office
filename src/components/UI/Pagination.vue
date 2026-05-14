<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const props = withDefaults(
  defineProps<{
    currentPage: number
    totalPages: number
    totalItems: number
    visibleStart: number
    visibleEnd: number
    itemLabel?: string
  }>(),
  {
    itemLabel: 'élément',
  },
)

const emit = defineEmits<{
  'update:page': [page: number]
}>()

const pages = computed<(number | 'ellipsis-left' | 'ellipsis-right')[]>(() => {
  const total = Math.max(1, props.totalPages)
  const current = Math.min(Math.max(1, props.currentPage), total)

  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }

  const middleStart = Math.max(2, current - 1)
  const middleEnd = Math.min(total - 1, current + 1)
  const result: (number | 'ellipsis-left' | 'ellipsis-right')[] = [1]

  if (middleStart > 2) {
    result.push('ellipsis-left')
  }

  for (let page = middleStart; page <= middleEnd; page++) {
    result.push(page)
  }

  if (middleEnd < total - 1) {
    result.push('ellipsis-right')
  }

  result.push(total)
  return result
})

const itemLabelText = computed(() => `${props.itemLabel}${props.totalItems > 1 ? 's' : ''}`)

const goToPage = (page: number) => {
  if (page === props.currentPage || page < 1 || page > props.totalPages) return
  emit('update:page', page)
}
</script>

<template>
  <div
    class="flex flex-col gap-4 border-t border-slate-100 px-4 py-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between"
  >
    <p class="font-medium">
      Affichage {{ visibleStart }} - {{ visibleEnd }} sur {{ totalItems }} {{ itemLabelText }}
    </p>

    <div class="flex items-center justify-between gap-2 md:justify-end">
      <button
        type="button"
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage <= 1"
        class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Page précédente"
      >
        <ChevronLeftIcon class="h-4 w-4" />
      </button>

      <div class="flex max-w-[52vw] items-center gap-1 overflow-x-auto md:max-w-none">
        <template v-for="page in pages" :key="page">
          <span
            v-if="typeof page === 'string'"
            class="flex h-10 min-w-8 items-center justify-center px-1 text-slate-300"
          >
            ...
          </span>
          <button
            v-else
            type="button"
            @click="goToPage(page)"
            class="h-10 min-w-10 rounded-lg px-3 text-sm font-black transition-colors"
            :class="
              page === currentPage ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-50'
            "
          >
            {{ page }}
          </button>
        </template>
      </div>

      <button
        type="button"
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage >= totalPages"
        class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Page suivante"
      >
        <ChevronRightIcon class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>
