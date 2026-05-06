<script setup lang="ts">
defineProps(['modelValue', 'options', 'getLabel'])
const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
}
</script>

<template>
  <select
    :value="modelValue"
    @change="emit('update:modelValue', handleInput)"
    class="input"
  >
    <option v-for="opt in options" :key="opt" :value="opt">
      {{ getLabel ? getLabel(opt) : opt }}
    </option>
  </select>
</template>

<style scoped lang="postcss">
.input {
  @apply w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl px-6 py-4 text-sm font-bold;
}
</style>