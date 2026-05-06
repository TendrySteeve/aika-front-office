<script setup lang="ts">
type InputType = 'text' | 'email' | 'password' | 'number' | 'phone' | 'date' | 'datetime-local' | 'time'

withDefaults(
    defineProps<{
        inputType?: InputType
        inputId: string
        label?: string
        placeholder?: string
        inputClass?: string
        modelValue?: string | number | Date
        error?: string
        required?: boolean
        disabled?: boolean
        divClass?: string
    }>(),
    {
        inputType: 'text',
        label: '',
        placeholder: '',
        inputClass: '',
        modelValue: undefined,
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
    const target = event.target as HTMLInputElement | null
    emit('update:modelValue', target?.value ?? '')
}
</script>

<template>
    <div :class="['flex flex-col gap-0.5', divClass]">
        <label :for="inputId" class="text-gray-500 font-medium text-sm">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>

        <input :id="inputId" :type="inputType" :placeholder="placeholder" :value="modelValue" :disabled="disabled"
            :required="required" :class="[
                'px-3 py-2 border rounded focus:outline-0 transition text-sm focus:bg-white',
                error ? 'border-red-500' : 'border-black/25',
                disabled ? 'bg-gray-100 cursor-not-allowed' : '',
                inputClass
            ]" @input="handleInput">

        <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
    </div>
</template>
