<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        inputId: string
        label?: string
        modelValue?: boolean
        disabled?: boolean
        error?: string
        required?: boolean
        divClass?: string
    }>(),
    {
        label: '',
        modelValue: false,
        disabled: false,
        error: '',
        required: false,
        divClass: '',
    }
)

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
}>()

const toggle = () => {
    emit('update:modelValue', !props.modelValue)
}
</script>

<template>
    <div :class="['flex flex-col gap-1', divClass]">
        <label class="text-gray-500 font-medium text-sm">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>

        <button type="button" :disabled="disabled" :class="[
            'inline-flex items-center w-10 h-5 rounded-full transition px-1',
            modelValue ? 'bg-sky-600' : 'bg-gray-200',
            disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
        ]" @click="toggle">
            <span :class="[
                'w-3 h-3 bg-white rounded-full shadow transition',
                modelValue ? 'translate-x-5' : 'translate-x-0'
            ]"></span>
        </button>

        <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
    </div>
</template>
