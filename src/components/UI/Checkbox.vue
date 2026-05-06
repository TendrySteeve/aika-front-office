<script setup lang="ts">
withDefaults(
    defineProps<{
        inputId: string
        label?: string
        modelValue?: boolean
        error?: string
        required?: boolean
        disabled?: boolean
        divClass?: string
        inputClass?: string
    }>(),
    {
        label: '',
        modelValue: false,
        error: '',
        required: false,
        disabled: false,
        divClass: '',
        inputClass: '',
    }
)

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
}>()

const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement | null
    emit('update:modelValue', target?.checked ?? false)
}
</script>

<template>
    <div :class="['flex flex-col gap-0.5', divClass]">
        <label class="text-gray-500 font-medium text-sm">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>

        <label class="flex items-center gap-3 text-sm text-gray-700">
            <input :id="inputId" type="checkbox" :checked="modelValue" :disabled="disabled" :required="required" :class="[
                'h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500',
                disabled ? 'opacity-60 cursor-not-allowed' : '',
                inputClass
            ]" @change="handleChange" />
            <span>
                <slot />
            </span>
        </label>

        <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
    </div>
</template>
