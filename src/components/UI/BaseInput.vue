<script setup lang="ts">
defineProps(['modelValue', 'type'])
const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
}
</script>

<template>
    <input :type="type || 'text'" :value="modelValue" @input="emit('update:modelValue', handleInput)"
        class="input" />
</template>

<style scoped lang="postcss">
.input {
    @apply w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 outline-none;
}
</style>