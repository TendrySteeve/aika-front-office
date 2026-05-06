<script setup lang="ts">
import type SelectOption from '@/types/SelectOption';


withDefaults(
    defineProps<{
        selectId: string
        label?: string
        placeholder?: string
        options?: SelectOption[]
        modelValue?: string | number | null
        error?: string
        required?: boolean
        disabled?: boolean
        divClass?: string
        selectClass?: string
    }>(),
    {
        label: '',
        placeholder: 'Sélectionner',
        options: () => [],
        modelValue: '',
        error: '',
        required: false,
        disabled: false,
        divClass: '',
        selectClass: '',
    }
)

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

const handleChange = (event: Event) => {
    const target = event.target as HTMLSelectElement | null
    emit('update:modelValue', target?.value ?? '')
}
</script>

<template>
    <div :class="['flex flex-col gap-0.5', divClass]">
        <label :for="selectId" class="text-gray-500 font-medium text-sm">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>

        <select :id="selectId" :value="modelValue" :disabled="disabled" :required="required" :class="[
            'px-3 py-2 border rounded focus:outline-0 transition bg-white text-sm',
            error ? 'border-red-500' : 'border-black/25',
            disabled ? 'bg-gray-100 cursor-not-allowed' : '',
            selectClass
        ]" @change="handleChange">
            <option value="">
                {{ placeholder }}
            </option>
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.label }}
            </option>
        </select>

        <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
    </div>
</template>
