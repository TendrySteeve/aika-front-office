<script setup lang="ts">
interface RadioOption {
    value: string | number
    label: string
}

withDefaults(
    defineProps<{
        groupId: string
        label?: string
        options?: RadioOption[]
        modelValue?: string | number | null
        error?: string
        required?: boolean
        disabled?: boolean
        divClass?: string
        optionClass?: string
    }>(),
    {
        label: '',
        options: () => [],
        modelValue: '',
        error: '',
        required: false,
        disabled: false,
        divClass: '',
        optionClass: '',
    }
)

const emit = defineEmits<{
    'update:modelValue': [value: string | number]
}>()

const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement | null
    emit('update:modelValue', target?.value ?? '')
}
</script>

<template>
    <div :class="['flex flex-col gap-0.5', divClass]">
        <label class="text-gray-500 font-medium text-sm">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>

        <div class="flex flex-col gap-2">
            <label v-for="option in options" :key="option.value" class="flex items-center gap-3 text-sm text-gray-700"
                :class="optionClass">
                <input type="radio" :name="groupId" :value="option.value" :checked="option.value === modelValue"
                    :disabled="disabled" :required="required"
                    class="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-500" @change="handleChange" />
                <span>{{ option.label }}</span>
            </label>
        </div>

        <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
    </div>
</template>
