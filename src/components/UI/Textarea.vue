<script setup lang="ts">
withDefaults(
    defineProps<{
        textareaId: string
        label?: string
        placeholder?: string
        rows?: number
        textareaClass?: string
        modelValue?: string | number
        error?: string
        required?: boolean
        disabled?: boolean
        divClass?: string
    }>(),
    {
        label: '',
        placeholder: '',
        rows: 4,
        textareaClass: '',
        modelValue: '',
        error: '',
        required: false,
        disabled: false,
        divClass: '',
    }
)

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

const handleInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement | null
    emit('update:modelValue', target?.value ?? '')
}
</script>

<template>
    <div :class="['flex flex-col gap-0.5', divClass]">
        <label :for="textareaId" class="text-gray-500 font-medium text-sm">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>

        <textarea :id="textareaId" :placeholder="placeholder" :rows="rows" :value="modelValue" :disabled="disabled"
            :required="required" :class="[
                'px-3 py-2 border rounded focus:outline-0 transition resize-y min-h-27.5 text-sm',
                error ? 'border-red-500' : 'border-black/25',
                disabled ? 'bg-gray-100 cursor-not-allowed' : '',
                textareaClass
            ]" @input="handleInput"></textarea>

        <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
    </div>
</template>
