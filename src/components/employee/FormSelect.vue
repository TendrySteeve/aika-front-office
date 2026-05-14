<script setup lang="ts">
withDefaults(
    defineProps<{
        modelValue?: string | number
        label: string
        options: {}
        getLabel: (option: any) => string
        required?: boolean
        bgColor?: string
    }>(),
    {
        modelValue: '',
        required: false,
        bgColor: 'bg-slate-50',
    }
)

defineEmits<{
    'update:modelValue': [value: string | number]
}>()
</script>

<template>
    <div class="space-y-2">
        <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-2">
            {{ label }}
        </label>
        <select :value="modelValue" :required="required"
            @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)" :class="[
                'w-full border-2 border-transparent focus:border-blue-500 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 transition-all outline-none',
                bgColor
            ]">
            <option v-for="option in options" :key="option" :value="option">
                {{ getLabel(option) }}
            </option>
        </select>
    </div>
</template>
