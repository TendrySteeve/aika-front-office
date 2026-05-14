import { computed, ref, type Ref } from 'vue'

export const usePagination = <T>(
  totalItems: Ref<number>,
  currentItems: Ref<T[]>,
  pageSize = 10,
) => {
  const itemsPerPage = ref(pageSize)
  const currentPage = ref(1)

  const apiOffset = computed(() => (currentPage.value - 1) * itemsPerPage.value)
  const totalPage = computed(() => Math.max(1, Math.ceil(totalItems.value / itemsPerPage.value)))

  const visibleStart = computed(() => {
    if (totalItems.value === 0) return 0
    return apiOffset.value + 1
  })

  const visibleEnd = computed(() =>
    Math.min(apiOffset.value + currentItems.value.length, totalItems.value),
  )

  const goToPage = async (page: number, fetchPage: () => Promise<void>) => {
    if (page === currentPage.value) return
    currentPage.value = page
    await fetchPage()
  }

  return {
    itemsPerPage,
    currentPage,
    apiOffset,
    totalPage,
    visibleStart,
    visibleEnd,
    goToPage,
  }
}
