<script setup lang="ts">
withDefaults(
    defineProps<{
        inputId: string
        label?: string
        accept?: string
        inputClass?: string
        modelValue?: File | string |null
        error?: string
        required?: boolean
        disabled?: boolean
        divClass?: string
    }>(),
    {
        label: '',
        accept: 'image/*',
        inputClass: '',
        modelValue: null,
        error: '',
        required: false,
        disabled: false,
        divClass: '',
    }
)

const emit = defineEmits<{
    'update:modelValue': [value?: File | string]
}>()

const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target?.files?.[0] ?? undefined
    emit('update:modelValue', file)
}
</script>

<template>
    <div :class="['flex flex-col gap-0.5', divClass]">
        <label :for="inputId" class="text-gray-500 font-medium text-sm">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>

        <input :id="inputId" type="file" :accept="accept" :disabled="disabled" :class="[
            'px-3 py-2 border rounded focus:outline-0 transition text-sm',
            error ? 'border-red-500' : 'border-black/25',
            disabled ? 'bg-gray-100 cursor-not-allowed' : '',
            inputClass
        ]" @change="handleChange">

        <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
    </div>
</template>
