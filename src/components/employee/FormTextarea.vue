<script setup lang="ts">
withDefaults(
    defineProps<{
        modelValue?: string
        label: string
        placeholder?: string
        rows?: number
        bgColor?: string
    }>(),
    {
        modelValue: '',
        placeholder: '',
        rows: 6,
        bgColor: 'bg-white',
    }
)

defineEmits<{
    'update:modelValue': [value: string]
}>()
</script>

<template>
    <div class="space-y-2">
        <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-2">
            {{ label }}
        </label>
        <textarea :value="modelValue" :rows="rows" :placeholder="placeholder"
            @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)" :class="[
                'w-full border-2 border-transparent focus:border-blue-500 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 transition-all outline-none resize-none',
                bgColor
            ]" />
    </div>
</template>
